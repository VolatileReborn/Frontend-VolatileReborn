<template>
  <div v-if="isSub" class="container">
    <div class="input_container">
      <el-form
        ref="basicInfo"
        :model="task_form"
        label-width="120px"
        label-position="right"
        :rules="rules"
        class="basicInfo"
      >
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="task_form.taskName"></el-input>
        </el-form-item>
        <el-form-item label="任务简介" prop="taskIntroduction">
          <el-input
            v-model="task_form.taskIntroduction"
            :rows="3"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <div>
    <ul>
      <li class="li" v-for="index in taskCount" :key="index">
        <task-component
          ref="ref"
          :isSub="isSub"
          :taskIndex="index"
          :useTimingRel="useTimeRel == '0'"
          :taskCount="taskCount"
        ></task-component>
      </li>
    </ul>
  </div>
  <div v-if="isSub">
    <div>
      <span>是否启用时序：</span>
      <el-radio v-model="useTimeRel" label="0">是 </el-radio>
      <el-radio v-model="useTimeRel" label="1">否 </el-radio>
    </div>
    <!-- <div v-if="useTimeRel == 0" class="button_div">
      <el-button type="primary" @click="addTimeRel()">添加时序</el-button>
      <el-button @click="deleteLastTimeRel()">删除最后一个时序</el-button>
    </div>
    <div v-if="useTimeRel == 0" class="container">
      <el-form v-for="item in timeRel" :key="item" inline="2">
        <el-form-item label="前置任务" prop="item.preTaskIndexS">
          <el-input-number
            v-model="item.preTaskIndex"
            :min="1"
            :max="taskCount"
            :step="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="后置任务" prop="item.postTaskIndexS">
          <el-input-number
            v-model="item.postTaskIndex"
            :min="1"
            :max="taskCount"
            :step="1"
          ></el-input-number>
        </el-form-item>
      </el-form>
    </div> -->
  </div>
  <div class="button_div">
    <el-button type="primary" v-on:click="addSubTask()">添加子任务</el-button>
    <el-button v-on:click="deleteLastSubTask()">删除最后一个子任务</el-button>
  </div>
  <div class="button_div" v-if="isSub">
    <el-button type="primary" @click="handleSubmit()">提交任务</el-button>
    <el-button @click="goBack()">取消</el-button>
  </div>
</template>

<script>
const haveRing = function (timeRel) {
  for (var i = 0; i < timeRel.length; ++i) {
    var start = timeRel[i].postTaskIndex;
    var mid = timeRel[i].preTaskIndex;
    while (mid != -1 && mid != start) {
      for (var j = 0; j < timeRel.length; ++j) {
        if (timeRel[j].postTaskIndex == mid) {
          mid = timeRel[j].preTaskIndex;
          break;
        }
      }
    }
    if (mid == start) {
      return true;
    }
  }
  return false;
};

import TaskComponent from "@/components/TaskComponent.vue";
import { ElMessage } from "element-plus";
import { publishComposeTask } from "@/api/task";
export default {
  name: "TaskRes",
  components: { TaskComponent },
  data() {
    return {
      taskCount: 1,
      maxTaskCount: 10,
      task_form: {
        taskName: "",
        taskIntroduction: "",
      },
      isSub: false,
      useTimeRel: "1",
      timeRel: [
        {
          preTaskIndex: 1,
          postTaskIndex: 1,
        },
      ],
      rules: {
        taskName: [
          {
            required: true,
            message: "请输入任务名称",
            trigger: "blur",
          },
          {
            min: 3,
            max: 15,
            message: "任务名称不少于3个字符，不多于15个字符",
            trigger: "blur",
          },
        ],
        taskIntroduction: [
          {
            required: true,
            message: "请输入任务简介",
            trigger: "blur",
          },
          {
            min: 5,
            max: 40,
            massage: "任务简介不少于5个字符，不多于40个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    taskCount: "changeIsSub",
  },
  methods: {
    changeIsSub() {
      if (this.taskCount == 1) {
        this.isSub = false;
      } else {
        this.isSub = true;
      }
    },
    addSubTask() {
      if (this.taskCount == 1) {
        this.task_form.taskName = this.$refs.ref[0].task_form.taskName;
        this.task_form.taskIntroduction =
          this.$refs.ref[0].task_form.taskIntroduction;
      }
      if (this.taskCount < this.maxTaskCount) {
        this.taskCount = this.taskCount + 1;
      }
    },
    deleteLastSubTask() {
      if (this.taskCount <= 1) {
        ElMessage.error("不可删除最后一个子任务");
      } else {
        this.taskCount = this.taskCount - 1;
        for (var i = 0; i < this.timeRel.length; ++i) {
          if (this.timeRel[i].preTaskIndex > this.taskCount) {
            this.timeRel[i].preTaskIndex = 1;
          }
          if (this.timeRel[i].postTaskIndex > this.taskCount) {
            this.timeRel[i].postTaskIndex = 1;
          }
        }
      }
    },
    addTimeRel() {
      this.timeRel.push({
        preTaskIndex: 1,
        postTaskIndex: 1,
      });
    },
    deleteLastTimeRel() {
      if (this.timeRel.length <= 1) {
        ElMessage.error("不可删除最后一个时序关系");
      } else {
        this.timeRel.pop();
      }
    },
    goBack() {
      this.$router.back(-1);
    },
    handleSubmit() {
      var subTaskList = [];
      var isValid = true;
      var realTimingRel = [];
      for (var i = 0; i < this.taskCount; ++i) {
        const subTask = this.$refs.ref[i].handleSubmit("basicInfo");
        if (subTask != null) {
          subTaskList.push(subTask);
        } else {
          isValid = false;
        }
        console.log(subTask);
      }
      if (this.isSub) {
        if (
          this.task_form.taskIntroduction.length < 5 ||
          this.task_form.taskIntroduction.length > 40
        ) {
          isValid = false;
        }
      }
      if (!isValid) {
        alert("必填项不能为空");
        return;
      }

      if (this.useTimeRel == 0) {
        for (i = 0; i < this.taskCount; ++i) {
          const preTask = this.$refs.ref[i].task_form.preTask;
          realTimingRel.push({ preTaskIndex: preTask - 1, postTaskIndex: i });
        }
        isValid = !haveRing(realTimingRel);
      }

      if (!isValid) {
        alert("任务存在循坏的依赖，请检查");
        return;
      }

      const task = {
        taskName: this.task_form.taskName,
        taskIntroduction: this.task_form.taskIntroduction,
        subTasks: subTaskList,
        timingRel: realTimingRel,
      };
      console.log(task);
      publishComposeTask({ task: task }).then((res) => {
        if (res.response.code % 100 === 0) {
          // console.log(res.response.message)
          // console.log(res.task)
          // this.$router.push("/taskReleaseSucceed")
          ElMessage({
            message: "任务发布成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.$router.push("/userCenterofEmployer");
            },
          });
        } else {
          ElMessage.error(res.response.message);
        }
      });
    },
  },
  mounted() {
    this.taskCount = 1;
  },
};
</script>

<style scoped>
div {
  text-align: center;
}
.li {
  list-style-type: none;
}
.button_div {
  padding-top: 20px;
  text-align: center;
}
.container {
  padding-top: 20px;
  margin-left: 10%;
  margin-right: 10%;
}
.input_container {
  text-align: center;
  display: flex;
  flex-direction: column;
}
</style>