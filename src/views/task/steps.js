//guide.js
const steps = [
    {
      element: "#tab-list",
      popover: {
        title: "报告列表",
        description: "查看所有报告",
        position: "right"
      }
    },
    {
      element: "#tab-graph",
      popover: {
        title: "报告相似度关系图",
        description: "查看报告相似关系",
        position: "bottom"
      },
      padding: 5
    },
    {
      element: "#tab-tree",
      popover: {
        title: "报告协作树状图",
        description: "用于显示该任务报告协作的状态",
        position: "bottom"
      }
    },
    {
      element: "#tab-scatter",
      popover: {
        title: "报告聚合散点图",
        description: "报告聚合操作",
        position: "left"
      }
    }
  ]
   
  export default steps