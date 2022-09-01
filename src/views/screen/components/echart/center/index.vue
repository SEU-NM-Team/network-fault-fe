<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from "./chart.vue";
import { reportDataSetList } from "@/api/reportDataSet";
export default {
  data() {
    return {
      cdata: {
        category: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
        ],
        guangdong: [2000, 4400, 3400, 2700, 3700, 5700, 4500, 6000],
        guangxi: [3700, 5700, 4500, 6000, 6300, 4500, 4800, 2900],
        xinjiang: [6300, 4500, 4800, 2900, 5400, 3400, 3200, 5000],
        gansu: [5400, 3400, 3200, 5000, 2400, 5300, 6500, 4500],
        yunnan: [2400, 5300, 6500, 4500, 2000, 4400, 3400, 2700],
      },
    };
  },
  components: {
    Chart,
  },
  mounted() {
    // this.setCdata()
  },
  methods: {
    async setCdata() {},
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
</style>