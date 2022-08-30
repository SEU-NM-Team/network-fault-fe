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
      drawTiming: null,
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
    setData() {
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
    },
  },
};
</script>

<style lang="scss" scoped>
</style>