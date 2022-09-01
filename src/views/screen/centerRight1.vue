<template>
  <div id="centerRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <div class="d-flex">
          <span class="fs-xl text mx-2">各省市故障数量排行</span>
        </div>
      </div>
      <el-carousel :interval="5000" arrow="never" ref="carousel" height="450px">
        <el-carousel-item v-for="item in 4" :key="item">
          <dv-scroll-board class="dv-scr-board" :config="config[item - 1]" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { reportDataSetList } from "@/api/reportDataSet";
export default {
  data() {
    return {
      config: [
        {
          header: ["省", "市", "故障量"],
          data: [],
          rowNum: 7, //表格行数
          headerHeight: 35,
          headerBGC: "#0f1325", //表头
          oddRowBGC: "#0f1325", //奇数行
          evenRowBGC: "#171c33", //偶数行
          index: true,
          columnWidth: [50],
          align: ["center"],
        },
        {
          header: ["省", "市", "故障量"],
          data: [],
          rowNum: 7, //表格行数
          headerHeight: 35,
          headerBGC: "#0f1325", //表头
          oddRowBGC: "#0f1325", //奇数行
          evenRowBGC: "#171c33", //偶数行
          index: true,
          columnWidth: [50],
          align: ["center"],
        },
        {
          header: ["省", "市", "故障量"],
          data: [],
          rowNum: 7, //表格行数
          headerHeight: 35,
          headerBGC: "#0f1325", //表头
          oddRowBGC: "#0f1325", //奇数行
          evenRowBGC: "#171c33", //偶数行
          index: true,
          columnWidth: [50],
          align: ["center"],
        },
        {
          header: ["省", "市", "故障量"],
          data: [],
          rowNum: 7, //表格行数
          headerHeight: 35,
          headerBGC: "#0f1325", //表头
          oddRowBGC: "#0f1325", //奇数行
          evenRowBGC: "#171c33", //偶数行
          index: true,
          columnWidth: [50],
          align: ["center"],
        },
      ],
    };
  },
  mounted() {
    this.setCdata();
  },
  methods: {
    async setCdata() {
      this.config[0].data = await this.getCData("sum_guangdong");
      this.config[1].data = await this.getCData("sum_guangxi");
      this.config[2].data = await this.getCData("sum_xinjiang");
      this.config[3].data = await this.getCData("sum_gansu");
    },
    async getCData(setName) {
      let queryParams = {};
      let a = [];
      queryParams["setName"] = setName;
      let params = this.urlEncodeObject(queryParams);
      const { data, code } = await reportDataSetList(params);
      if (code != "200") return;
      let temp = JSON.parse(data.records[0].caseResult);
      for (var i = 0; i < temp.length; i++) {
        var j = [];
        j[0] = temp[i].province;
        j[1] = temp[i].city;
        j[2] = temp[i].fault_sum;
        a.push(j);
      }
      return a;
    },
  },
};
</script>

<style lang="scss" scoped>
$box-height: 500px;
$box-width: 400px;
#centerRight1 {
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
      width: 340px;
      height: 440px;
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
