<template>
  <div>
    <Echart
      :options="options"
      id="centreLeft1Chart"
      height="500px"
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
      // 定义颜色
      colorList: {
        linearYtoG: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#f5b44d",
            },
            {
              offset: 1,
              color: "#28f8de",
            },
          ],
        },
        linearGtoB: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#43dfa2",
            },
            {
              offset: 1,
              color: "#28f8de",
            },
          ],
        },
        linearBtoG: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#1c98e8",
            },
            {
              offset: 1,
              color: "#28f8de",
            },
          ],
        },
        areaBtoG: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(35,184,210,.2)",
            },
            {
              offset: 1,
              color: "rgba(35,184,210,0)",
            },
          ],
        },
      },
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
            text: "",
            textStyle: {
              color: "#D3D6DD",
              fontSize: 24,
              fontWeight: "normal",
            },
            subtext: newData.year + "/" + newData.weekCategory[6],
            subtextStyle: {
              color: "#fff",
              fontSize: 16,
            },
            top: 50,
            left: 50,
          },
          legend: {
            top: 120,
            left: 50,
            orient: "vertical",
            itemGap: 15,
            itemWidth: 12,
            itemHeight: 12,
          },
          tooltip: {
            trigger: "item",
          },
          radar: {
            center: ["50%", "50%"],
            radius: "70%",
            name: {
              color: "#fff",
            },
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                color: this.colorList.linearYtoG,
                opacity: 0.6,
              },
            },
            splitLine: {
              lineStyle: {
                color: this.colorList.linearYtoG,
                opacity: 0.6,
              },
            },
            splitArea: {
              areaStyle: {
                color: "#fff",
                opacity: 0.1,
                shadowBlur: 25,
                shadowColor: "#000",
                shadowOffsetX: 0,
                shadowOffsetY: 5,
              },
            },
            indicator: [
              {
                name: "未标注",
                max: 1100,
              },
              {
                name: "FTTH光纤接入方式",
                max: 1100,
              },
              {
                name: "铜缆接入方式",
                max: 1100,
              },
              {
                name: "FTTB+LAN",
                max: 1100,
              },
            ],
          },
          // grid: {
          //   left: 90,
          //   right: 80,
          //   bottom: 40,
          //   top: "60%",
          // },
          series: [
            {
              name: "",
              type: "radar",
              symbolSize: 0,
              data: [
                {
                  value: newData.radarData,
                  name: "数量",
                  itemStyle: {
                    normal: {
                      color: "#f8d351",
                    },
                  },
                  lineStyle: {
                    normal: {
                      opacity: 0,
                    },
                  },
                  areaStyle: {
                    normal: {
                      color: "#f8d351",
                      shadowBlur: 25,
                      shadowColor: "rgba(248,211,81,.3)",
                      shadowOffsetX: 0,
                      shadowOffsetY: -10,
                      opacity: 1,
                    },
                  },
                },
              ],
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
