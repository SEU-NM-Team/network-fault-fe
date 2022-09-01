<template>
  <div>
    <div class="left">
      <Chart :cdata="cdata1" />
    </div>
    <div class="right">
      <Chart :cdata="cdata2" />
    </div>
  </div>
</template>

<script>
import Chart from "./chart.vue";
import { reportDataSetList } from "@/api/reportDataSet";
export default {
  data() {
    return {
      cdata1: {
        fault: [],
        title: "故障类型",
        titleLeft: "40%",
        faultCenter: ["50%", "60%"],
      },
      cdata2: {
        fault: [],
        title: "故障信息",
        titleLeft: "45%",
        faultCenter: ["55%", "60%"],
      },
    };
  },
  components: {
    Chart,
  },
  mounted() {
    this.setCdata();
  },
  methods: {
    async setCdata() {
      this.cdata1["fault"] = await this.getCData1();
      this.cdata2["fault"] = await this.getCData2();
    },
    async getCData1() {
      let queryParams = {};
      let a = [];
      queryParams["setName"] = "fault_type";
      let params = this.urlEncodeObject(queryParams);
      const { data, code } = await reportDataSetList(params);
      if (code != "200") return;
      let temp = JSON.parse(data.records[0].caseResult);
      for (var i = 0; i < temp.length; i++) {
        var obj = new Object();
        obj.name = temp[i].fault_type;
        obj.value = temp[i].sum;
        a.push(obj);
      }
      return a;
    },
    async getCData2() {
      let queryParams = {};
      let a = [];
      queryParams["setName"] = "info_fault";
      let params = this.urlEncodeObject(queryParams);
      const { data, code } = await reportDataSetList(params);
      if (code != "200") return;
      let temp = JSON.parse(data.records[0].caseResult);
      for (var i = 0; i < temp.length; i++) {
        var obj = new Object();
        obj.name = temp[i].fault;
        obj.value = temp[i].sum;
        a.push(obj);
      }
      return a;
    },
  },
};
</script>

<style lang="scss" scoped>
.left {
  float: left;
  width: 50%;
}
.right {
  float: right;
  width: 50%;
}
</style>