<template>
  <div>
    <Echart
      :options="options"
      id="centreLeft1Chart"
      height="320px"
      width="400px"
    ></Echart>
  </div>
</template>

<script>
import Echart from "@/views/screen/common/echart";
export default {
  data() {
    return {
      options: {},
    };
  },
  components: {
    Echart,
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          title: {
            text: newData.title,
            left: newData.titleLeft,
          },
          color: [
            "#37a2da",
            "#32c5e9",
            "#9fe6b8",
            "#ffdb5c",
            "#ff9f7f",
            "#fb7293",
            "#e7bcf3",
            "#8378ea",
          ],
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          toolbox: {
            show: false,
          },
          calculable: true,
          legend: {
            show: false,
            orient: "horizontal",
            icon: "circle",
            bottom: 0,
            x: "center",
            data: newData.xData,
            textStyle: {
              color: "#fff",
            },
          },
          series: [
            {
              name: "故障",
              type: "pie",
              radius: [10, 65],
              roseType: "area",
              center: newData.faultCenter,
              data: newData.fault,
            },
          ],
        };
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>