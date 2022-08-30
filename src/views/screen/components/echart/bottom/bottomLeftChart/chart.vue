<template>
  <div>
    <Echart
      :options="options"
      id="bottomLeftChart"
      height="480px"
      width="100%"
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
            data: ["重障量", "故障量", "故障街道数", "重障街道数"],
            // textStyle: {
            //   color: "#B4B4B4",
            // },
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
              name: "故障数",
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: "#62E4A9",
                },
              },

              axisLabel: {
                formatter: "{value} ",
              },
            },
            {
              name: "街道数",
              position: "right",
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: "#F9E96F",
                },
              },
              axisLabel: {
                formatter: "{value} ",
              },
            },
          ],
          series: [
            {
              name: "重障量",
              type: "bar",
              barWidth: "20%",
              stack: "fault",
              itemStyle: {
                normal: {
                  barBorderRadius: 5,
                  // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  //   { offset: 0, color: "#956FD4" },
                  //   { offset: 1, color: "#3EACE5" },
                  // ]),
                  color: "#71BEE5",
                },
              },
              data: newData.againNum,
            },
            {
              name: "故障量",
              type: "bar",
              barWidth: "20%",
              stack: "fault",
              itemStyle: {
                normal: {
                  barBorderRadius: 5,
                  // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  //   { offset: 0, color: "rgba(156,107,211,0.8)" },
                  //   { offset: 0.2, color: "rgba(156,107,211,0.5)" },
                  //   { offset: 1, color: "rgba(156,107,211,0.2)" },
                  // ]),
                  color: "#62E4A9",
                },
              },
              z: -12,
              data: newData.faultNum,
            },
            {
              name: "重障街道数",
              type: "line",
              type: "bar",
              barWidth: "20%",
              stack: "address",
              yAxisIndex: 1,
              barGap: "50%",
              itemStyle: {
                normal: {
                  barBorderRadius: 5,
                  // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  //   { offset: 0, color: "#956FD4" },
                  //   { offset: 1, color: "#3EACE5" },
                  // ]),
                  color: "#FCC27C",
                },
              },
              data: newData.againAddress,
            },
            {
              name: "故障街道数",
              type: "bar",
              barWidth: "20%",
              stack: "address",
              yAxisIndex: 1,
              barGap: "50%",
              itemStyle: {
                normal: {
                  barBorderRadius: 5,
                  // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  //   { offset: 0, color: "#956FD4" },
                  //   { offset: 1, color: "#3EACE5" },
                  // ]),
                  color: "#F9E96F",
                },
              },
              data: newData.faultAddress,
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