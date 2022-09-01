<template>
  <div id="bottomCenter">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-bar" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">风险用户</span>
        </div>
      </div>
      <div>
        <dv-active-ring-chart
          :config="config"
          style="width: 350px; height: 350px"
        />
        <!-- <dv-scroll-board class="dv-scr-board" :config="riskTable" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { reportDataSetList } from "@/api/reportDataSet";
export default {
  data() {
    return {
      config: {
        data: [
          {
            name: "高危用户",
            value: 20274,
          },
          {
            name: "低危用户",
            value: 59487,
          },
          {
            name: "中危用户",
            value: 327490,
          },
          {
            name: "普通用户",
            value: 2976060,
          }
        ],
      },
      //  riskTable: {
      //    header: ["风险等级", "数量"],
      //    data: [
      //      ["高危用户", 20274],
      //      ["中危用户", 59487],
      //      ["低危用户", 327490],
      //      ["普通用户", 2976060],
      //    ],
      //  },
    }
  },
  mounted(){
    this.setCData();
  },
  methods:{
    async setCData() {
      var tmp = await this.getCData('risk_num');
      for(var i=0;i<4;i++){
        //console.log(tmp[i].value);
        this.config.data[i].value=tmp[i].value;
        //console.log(this.config.data[i].value);
      }
    },
    async getCData(setName) {
      let queryParams = {}
      queryParams['setName'] = setName
      let params = this.urlEncodeObject(queryParams)
      const {data, code} = await reportDataSetList(params)
      if (code != "200") return;
      let temp = JSON.parse(data.records[0].caseResult)
      let a=[];
      temp.map(k => {
        k = {
          value:k.count,
          name:k.type
        }
        a.push(k)
      })
      return a;
    }
  }
};
</script>

<style lang="scss" scoped>
$box-height: 400px;
$box-width: 400px;
#bottomCenter {
  padding: 16px;
  padding-top: 20px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 10px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 10px;
    overflow: hidden;
    .dv-scr-board {
      width: 290px;
      height: 600px;
    }
  }
}
/deep/ .el-carousel__indicator--horizontal .el-carousel__button {
  width: 10px;
  height: 10px;
  background: transparent;
  border: 1px solid #ffffff;
  border-radius: 50%;
  opacity: 0.5;
}
/deep/ .el-carousel__indicator--horizontal.is-active .el-carousel__button {
  width: 10px;
  height: 10px;
  background: #ffffff;
  border-radius: 50%;
  opacity: 1;
}
</style>