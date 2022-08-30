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
        category: ["广东省", "广西省", "新疆省", "甘肃省"],
        faultNum: [18092, 20728, 24045, 28348],
        againNum: [4600, 5000, 5500, 6500],
        faultAddress: [4600, 5000, 5500, 6500],
        againAddress: [2330, 4000, 3400, 4500],
      },
    };
  },
  components: {
    Chart,
  },
  mounted() {
    // this.setData();
  },
  methods: {
    // 根据自己的业务情况修改
    // setData() {
    //   for (let i = 0; i < this.cdata.barData.length - 1; i++) {
    //     let rate = this.cdata.barData[i] / this.cdata.lineData[i];
    //     this.cdata.rateData.push(rate.toFixed(2));
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
</style>