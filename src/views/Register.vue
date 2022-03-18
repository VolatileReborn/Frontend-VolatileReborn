<template>
	<div class="login-register">
		<div class="contain">
			<div class="big-box" :class="{active:isLogin}">
				<div class="big-contain" v-if="isLogin">
					<div class="btitle">账户登录</div>
					<div class="bform">
						<input type="phonenumber" placeholder="手机号" v-model="form.phonenumber">
						<span class="errTips" v-if="phonenumberError">* 手机号填写错误 *</span>
						<input type="password" placeholder="密码" v-model="form.userpwd">
						<span class="errTips" v-if="emailError">* 密码填写错误 *</span>
					</div>
					<button class="bbutton" @click="handleLogin">登录</button>
				</div>
				<div class="big-contain" v-else>
					<div class="btitle">创建账户</div>
					<div class="bform">
						<input type="text" placeholder="用户名" v-model="form.username">
						<span class="errTips" v-if="existed">* 用户名已经存在！ *</span>
						<input type="phonenumber" placeholder="手机号" v-model="form.phonenumber" style="margin-top: 5px">
						<input type="password" placeholder="密码" v-model="form.userpwd" style="margin-top: 5px">
            <input type="password" placeholder="确认密码" v-model="form.seconduserpwd" style="margin-top: 5px">
            <div class="role_select_container">
              <div>
                <el-button type="text" class="role_select_text" >身份选择</el-button>
              </div>
              <div>
                <el-select v-model="form.role" placeholder="选择你的身份"  >
                  <el-option
                      v-for="item in roles"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
					</div>
					<button class="bbutton" @click="handleRegister">注册</button>
				</div>
			</div>
			<div class="small-box" :class="{active:isLogin}">
				<div class="small-contain" v-if="isLogin">
					<div class="stitle">你好，朋友!</div>
					<p class="scontent">开始注册，加入众包世界</p>
					<button class="sbutton" @click="changeType">注册</button>
				</div>
				<div class="small-contain" v-else>
					<div class="stitle">欢迎回来!</div>
					<p class="scontent">进入众包世界, 请登录你的账户</p>
					<button class="sbutton" @click="changeType">登录</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {register} from "@/api/user";
import {login} from "@/api/user";
import {ElMessage} from "element-plus";
import {ref} from "vue";
import {Encrypt} from "@/utils/utils"

	export default{
		name:'login-register',
    inject:['reload'],
		data(){
			return {
				isLogin:false,
				phonenumberError: false,
				passwordError: false,
				existed: false,
				form:{
					username:'',
					phonenumber:'',
					userpwd:'',
          seconduserpwd: '',
          role:ref(0)
				},
        roles:[
          {
            value:0,
            label:'发包方',
          },
          {
            value:1,
            label:'众包工人'
          },
          {
            value:2,
            label:'管理员'
          }
        ]
			}
		},
		methods:{
			changeType() {
				this.isLogin = !this.isLogin
				this.form.username = ''
				this.form.phonenumber = ''
				this.form.userpwd = ''
			},
      handleRegister(){
        if(this.form.username !== "" && this.form.phonenumber !== "" && this.form.userpwd !== "" && this.form.seconduserpwd !== "") {
          if (this.form.userpwd !== this.form.seconduserpwd) {
            ElMessage.error('两次输入密码不一致！')
          } 
			// else if(this.form.phonenumber.length!=11){
			// 	ElMessage.error('手机号必须为11位！')
			// }
			else if(!(/^([\d]{11})$/.test(this.form.phonenumber))){
				ElMessage.error('手机号必须为11位数字！')
			}   
			else{
            register({
              phone_number: this.form.phonenumber,
              password: Encrypt(this.form.userpwd),
              role: this.form.role,
              nickname: this.form.username
            })
                .then(res => {
                  if (res.response.code%100 === 0) {
                    // console.log(res.msg)
                    // console.log(res.data)
                    console.log(res.response)
                    this.$router.push("/registerSucceed")
                  } else {
                    ElMessage.error(res.response.message)
                  }
                });
          }
        }
        else
        {
          alert("填写不能为空！");
        }
      },
      handleLogin(){
        if (this.form.phonenumber !== "" && this.form.userpwd !== "") {
          login({
            phone_number: this.form.phonenumber,
            password: Encrypt(this.form.userpwd)
          }).then(res =>{
            if(res.response.code%100 === 0){
              // console.log(res.msg)
              // console.log(res.data)
              window.localStorage.setItem("token",res.token)
              window.localStorage.setItem("nickname",res.nickname)
              window.localStorage.setItem("role",res.role)
              ElMessage({
                message: "登录成功",
                type: 'success',
                onClose: () =>{this.$router.push("/taskSquare")
                  this.reload()},
              })
              // setTimeout(()=>{
              //   this.$router.go(0)
              // },4000)
            }
            else {
              ElMessage.error(res.response.message)
            }
          })
        }else {
          alert("填写不能为空！");
        }
      }
		}
	}
</script>

<style scoped="scoped">
	.login-register{
		width: 100vw;
		height: 90vh;
		box-sizing: border-box;
	}
	.contain{
		width: 60%;
		height: 60%;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: #fff;
		border-radius: 20px;
		box-shadow: 0 0 3px #f0f0f0,
					0 0 6px #f0f0f0;
	}
	.big-box{
		width: 70%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 30%;
		transform: translateX(0%);
		transition: all 1s;
	}
	.big-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.btitle{
		font-size: 1.5em;
		font-weight: bold;
		color: cadetblue;
	}
	.bform{
		width: 100%;
		height: 40%;
		padding: 2em 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.bform .errTips{
		display: block;
		width: 50%;
		text-align: left;
		color: red;
		font-size: 0.7em;
		margin-left: 1em;
	}
	.bform input{
		width: 50%;
		height: 30px;
		border: none;
		outline: none;
		border-radius: 10px;
		padding-left: 2em;
		background-color: #f0f0f0;
	}
	.bbutton{
		width: 20%;
		height: 40px;
		border-radius: 24px;
		border: none;
		outline: none;
		background-color: cadetblue;
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}
	.small-box{
		width: 30%;
		height: 100%;
		background: linear-gradient(135deg,cadetblue,rgb(186, 231, 235));
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(0%);
		transition: all 1s;
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
	}
	.small-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.stitle{
		font-size: 1.5em;
		font-weight: bold;
		color: #fff;
	}
	.scontent{
		font-size: 0.8em;
		color: #fff;
		text-align: center;
		padding: 2em 4em;
		line-height: 1.7em;
	}
	.sbutton{
		width: 60%;
		height: 40px;
		border-radius: 24px;
		border: 1px solid #fff;
		outline: none;
		background-color: transparent;
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}
	
	.big-box.active{
		left: 0;
		transition: all 0.5s;
	}
	.small-box.active{
		left: 100%;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-top-right-radius: inherit;
		border-bottom-right-radius: inherit;
		transform: translateX(-100%);
		transition: all 1s;
	}
  .role_select_container{
    display: flex;
    flex-direction: row;
    width: 310px;
    margin-top: 5px
  }
  .role_select_text{
    color: cadetblue;
    margin-right: 15px;
    margin-left: 15px;
  }
</style>