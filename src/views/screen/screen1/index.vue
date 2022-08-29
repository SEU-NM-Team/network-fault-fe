<template>
  <div class="verify-line">
    <v-chart :options="lineOption" autoresize />
  </div>
</template>
<script>
import "echarts/lib/chart/line";
import "echarts/lib/component/axis";
import "echarts/lib/component/tooltip";
export default {
  props: {
    info: {
      //这里是传进来的折线图数据
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    const splitLineStyle = {
      show: true,
      lineStyle: {
        color: ["rgb(241, 241, 241)"],
        width: 1,
        type: "solid",
      },
    };
    // 坐标轴线样式
    const axisLine = {
      show: true,
      lineStyle: {
        color: "rgb(241, 241, 241, .5)",
      },
    };
    // 坐标文字样式
    const axisLabel = {
      interval: 0,
      textStyle: {
        color: "#50576A", // 坐标值得具体的颜色
      },
    };
    return {
      lineOption: {
        // 调整边距(上下左右)
        grid: {
          left: "1%",
          right: "1%",
          bottom: "2%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false, // 坐标轴两边留白
          data: [],
          axisLine: axisLine,
          axisLabel: {
            // 坐标轴刻度标签的相关设置
            interval: 0, // 如果设置为 1，表示『隔一个标签显示一个标签』
            textStyle: {
              color: "#50576A", // 坐标值得具体的颜色
            },
            // 坐标轴文字的显示格式
            formatter: function (params) {
              return params + "月";
            },
          },
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "30%"],
          axisLine: axisLine,
          axisLabel: axisLabel,
          splitLine: splitLineStyle,
          // 不显示坐标轴刻度
          axisTick: {
            show: false,
          },
        },
        // 高亮提示设置
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#3AD4A7",
                  },
                  {
                    offset: 1,
                    color: "#3AD4A7",
                  },
                ],
                global: false,
              },
            },
          },
        },
        series: [
          {
            type: "line",
            smooth: true,
            showSymbol: true, // 显示转折点变大
            symbol: "circle", // 设定为实心点
            symbolSize: 1, // 设定实心点的大小
            lineStyle: {
              // 数据线的样式
              color: "#4669F5",
              width: 3,
            },
            itemStyle: {
              normal: {
                // 配置转折点的样式
                color: "#3AD4A7",
              },
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(70, 105, 245, .8)", // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: "rgba(255, 255, 255, 0.5)", // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(255, 255, 255, 0.5)", // 100% 处的颜色
                  },
                ],
              },
            },
            data: [],
          },
        ],
      },
    };
  },
  watch: {
    //深度监听传过来的折线图数据
    info: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val && val.length) {
          let xAxis = [];
          let yAxis = [];
          val.forEach((item, index) => {
            xAxis.push(item.month);
            yAxis.push(item.total);
          });
          this.lineOption.series[0].data = yAxis;
          this.lineOption.xAxis.data = xAxis;
        } else {
          const lineLen = 12;
          let xAxis = [];
          for (let i = 1; i <= lineLen; i++) {
            xAxis.push(i);
          }
          this.lineOption.series[0].data = [];
          this.lineOption.xAxis.data = xAxis;
        }
      },
    },
  },
};
</script>
