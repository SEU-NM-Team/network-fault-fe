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
export default {
  data() {
    return {
      cdata1: {
        xData: ["data1", "data2", "data3", "data4", "data5", "data6"],
        fault: [
          { value: 10, name: "data1" },
          { value: 5, name: "data2" },
          { value: 15, name: "data3" },
          { value: 25, name: "data4" },
          { value: 20, name: "data5" },
          { value: 35, name: "data6" },
        ],
        title: "一类故障",
        titleLeft: "40%",
        faultCenter: ["50%", "60%"],
      },
      cdata2: {
        xData: ["a1", "a2", "a3", "a4", "a5", "a6"],
        fault: [
          { value: 10, name: "data1" },
          { value: 5, name: "data2" },
          { value: 15, name: "data3" },
          { value: 25, name: "data4" },
          { value: 20, name: "data5" },
          { value: 35, name: "data6" },
        ],
        title: "二类故障",
        titleLeft: "45%",
        faultCenter: ["55%", "60%"],
      },
    };
  },
  components: {
    Chart,
  },
  mounted() {},
  methods: {
    async setCdata() {
      this.cdata1["fault"] = await this.getCData("fault_1");
      this.cdata2["fault"] = await this.getCData("fault_2");
    },
    async getCData(setName) {
      let queryParams = {};
      let a = [];
      queryParams["setName"] = setName;
      let params = this.urlEncodeObject(queryParams);
      const { data, code } = await reportDataSetList(params);
      if (code != "200") return;
      let temp = JSON.parse(data.records[0].caseResult);
      temp.map((k) => {
        k = k.sum;
        a.push(k);
      });
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