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
          "2021-01",
          "2021-02",
          "2021-03",
          "2021-04",
          "2021-05",
          "2021-06",
          "2021-07",
          "2021-08",
        ],
        guangdong: [],
        guangxi: [],
        xinjiang: [],
        gansu: [],
        yunnan: [],
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
      this.cdata["guangdong"] = await this.getCData("stream_guangdong");
      this.cdata["guangxi"] = await this.getCData("stream_guangxi");
      this.cdata["xinjiang"] = await this.getCData("stream_xinjiang");
      this.cdata["gansu"] = await this.getCData("stream_gansu");
      this.cdata["yunnan"] = await this.getCData("stream_yunnan");
    },
    async getCData(setName) {
      let queryParams = {};
      let a = [];
      queryParams["setName"] = setName;
      let params = this.urlEncodeObject(queryParams);
      const { data, code } = await reportDataSetList(params);
      if (code != "200") return;
      let temp = JSON.parse(data.records[0].caseResult);
      if (setName == "guangxi") {
        for (var i = 0; i < 5; i++) {
          a.push("");
        }
        for (var i = 0; i < temp.length; i++) {
          a.push(temp[i].count);
        }
      } else
        for (var i = 0; i < temp.length; i++) {
          a.push(temp[i].count);
        }
      console.log(a);
      return a;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>