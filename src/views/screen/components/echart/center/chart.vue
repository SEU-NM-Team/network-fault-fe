<template>
  <div>
    <Echart :options="options" id="center" height="810px" width="100%"></Echart>
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
          textStyle: {
            fontSize: 17,
          },
          tooltip: {
            trigger: "axis",
            backgroundColor: "rgba(255,255,255,0.1)",
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
                backgroundColor: "#7B7DDC",
              },
            },
          },
          legend: {
            data: ["广东省", "广西省", "新疆省", "甘肃省", "云南省"],
            top: "0%",
          },
          grid: {
            x: "8%",
            width: "88%",
            y: "4%",
          },
          xAxis: {
            data: newData.category,
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: [
            {
              name: "其他",
              splitLine: { show: false },
              axisLabel: {
                formatter: "{value} ",
              },
            },
            // {
            //   name: "广东",
            //   splitLine: { show: false },
            //   axisLine: {
            //     lineStyle: {
            //       color: "#5470c6",
            //     },
            //   },
            //   axisLabel: {
            //     formatter: "{value} ",
            //   },
            // },
          ],
          series: [
            {
              name: "广东省",
              type: "line",
              // stack: "fault",
              // yAxisIndex: 1,
              smooth: false,
              data: newData.guangdong,
            },
            {
              name: "广西省",
              type: "line",
              // stack: "fault",
              smooth: false,
              data: newData.guangxi,
            },
            {
              name: "新疆省",
              type: "line",
              // stack: "fault",
              smooth: false,
              data: newData.xinjiang,
            },
            {
              name: "甘肃省",
              type: "line",
              // stack: "fault",
              smooth: false,
              data: newData.gansu,
            },
            {
              name: "云南省",
              type: "line",
              // stack: "fault",
              smooth: false,
              data: newData.yunnan,
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