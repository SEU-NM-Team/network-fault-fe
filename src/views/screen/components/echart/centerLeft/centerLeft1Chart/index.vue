<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from "./chart.vue";
export default {
  data() {
    return {
      cdata: {
        year: null,
        weekCategory: [],
        radarData: [],
        maxData: 12000,
      },
    };
  },
  components: {
    Chart,
  },
  mounted() {
    this.setData();
  },
  methods: {
    async setData() {
      let dateBase = new Date();
      this.cdata.year = dateBase.getFullYear();
      // 周数据
      for (let i = 0; i < 7; i++) {
        // 日期
        let date = new Date();
        this.cdata.weekCategory.unshift(
          [date.getMonth() + 1, date.getDate() - i].join("/")
        );
      }
      this.cdata1["radarData"] = await this.getCData("acs_way_sum");
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
</style>