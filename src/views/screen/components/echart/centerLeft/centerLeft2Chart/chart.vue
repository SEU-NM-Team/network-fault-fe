<template>
  <div>
    <Echart
      id="centreLeft2Chart"
      ref="centreLeft2ChartRef"
      :options="options"
      height="360px"
      width="330px"
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
      type: Array,
      default: () => [],
    },
  },
  watch: {
    cdata: {
      handler(newData) {
        // 设置点的位置(经纬度)
        const geoCoordMap = {
          广州市: [113.2614288, 23.11891174, 20],
          韶关市: [113.6053925, 24.80877686, 20],
          深圳市: [114.110672, 22.55639648, 20],
          珠海市: [113.5682602, 22.27258873, 20],
          汕头市: [116.6837997, 23.36269188, 20],
          佛山市: [113.1145172, 23.03487778, 20],
          江门市: [113.0847473, 22.59119034, 20],
          湛江市: [110.3992233, 21.19499779, 20],
          茂名市: [110.8888474, 21.67071724, 20],
          肇庆市: [112.4514084, 23.05788231, 20],
          惠州市: [114.3924027, 23.08795738, 20],
          梅州市: [116.1079407, 24.31450081, 20],
          汕尾市: [115.3640137, 22.77868652, 20],
          河源市: [114.6938171, 23.73484039, 20],
          阳江市: [111.9578934, 21.84523392, 20],
          清远市: [113.0212631, 23.71959686, 20],
          东莞市: [113.7487717, 23.0485363, 20],
          中山市: [113.3714523, 22.52685356, 20],
          潮州市: [116.63666, 23.667706, 20],
          揭阳市: [116.34977, 23.542976, 20],
          云浮市: [112.03999, 22.933193, 20],
        };
        let seriesData = [
          {
            name: "广州市",
          },
          {
            name: "韶关市",
          },
          {
            name: "深圳市",
          },
          {
            name: "珠海市",
          },
          {
            name: "汕头市",
          },
          {
            name: "佛山市",
          },
          {
            name: "江门市",
          },
          {
            name: "湛江市",
          },
          {
            name: "茂名市",
          },
          {
            name: "肇庆市",
          },
          {
            name: "惠州市",
          },
          {
            name: "梅州市",
          },
          {
            name: "汕尾市",
          },
          {
            name: "河源市",
          },
          {
            name: "阳江市",
          },
          {
            name: "清远市",
          },
          {
            name: "东莞市",
          },
          {
            name: "中山市",
          },
          {
            name: "潮州市",
          },
          {
            name: "揭阳市",
          },
          {
            name: "云浮市",
          },
        ];
        let convertData = function (data) {
          let scatterData = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              scatterData.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
              });
            }
          }
          return scatterData;
        };
        this.options = {
          showLegendSymbol: true,
          tooltip: {
            trigger: "item",
            textStyle: {
              fontSize: 14,
              lineHeight: 22,
            },
            position: (point) => {
              // 固定在顶部
              return [point[0] + 50, point[1] - 20];
            },
            // 如果需要自定义 tooltip样式，需要使用formatter
            /*
              formatter: params => {
                return `<div style=""> ... </div>`
              }
            */
          },
          visualMap: {
            min: 0,
            max: 10,
            show: false,
            seriesIndex: 0,
            // 颜色
            inRange: {
              color: ["rgba(41,166,206, .5)", "rgba(69,117,245, .9)"],
            },
          },
          // 底部背景
          geo: {
            show: true,
            aspectScale: 0.85, //长宽比
            zoom: 1.2,
            top: "10%",
            left: "16%",
            map: "广东",
            roam: false,
            itemStyle: {
              normal: {
                areaColor: "rgba(0,0,0,0)",
                shadowColor: "rgba(7,114,204, .8)",
                shadowOffsetX: 5,
                shadowOffsetY: 5,
              },
              emphasis: {
                areaColor: "#00aeef",
              },
            },
          },
          series: [
            {
              name: "相关指数",
              type: "map",
              aspectScale: 0.85, //长宽比
              zoom: 1.2,
              mapType: "广东", // 自定义扩展图表类型
              top: "10%",
              left: "16%",
              itemStyle: {
                normal: {
                  color: "red",
                  areaColor: "rgba(19,54,162, .5)",
                  borderColor: "rgba(0,242,252,.3)",
                  borderWidth: 1,
                  shadowBlur: 7,
                  shadowColor: "#00f2fc",
                },
                emphasis: {
                  areaColor: "#4f7fff",
                  borderColor: "rgba(0,242,252,.6)",
                  borderWidth: 2,
                  shadowBlur: 10,
                  shadowColor: "#00f2fc",
                },
              },
              label: {
                formatter: (params) => `${params.name}`,
                show: true,
                position: "insideRight",
                textStyle: {
                  fontSize: 14,
                  color: "#efefef",
                },
                emphasis: {
                  textStyle: {
                    color: "#fff",
                  },
                },
              },
              data: newData,
            },
            {
              type: "effectScatter",
              coordinateSystem: "geo",
              symbolSize: 7,
              effectType: "ripple",
              legendHoverLink: false,
              showEffectOn: "render",
              rippleEffect: {
                period: 4,
                scale: 2.5,
                brushType: "stroke",
              },
              zlevel: 1,
              itemStyle: {
                normal: {
                  color: "#99FBFE",
                  shadowBlur: 5,
                  shadowColor: "#fff",
                },
              },
              data: convertData(seriesData),
            },
          ],
        };
        // 重新选择区域
        this.handleMapRandomSelect();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // 开启定时器
    startInterval() {
      const _self = this;
      // 应通过接口获取配置时间，暂时写死5s
      const time = 2000;
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
      }
      this.intervalId = setInterval(() => {
        _self.reSelectMapRandomArea();
      }, time);
    },
    // 重新随机选中地图区域
    reSelectMapRandomArea() {
      const length = 9;
      this.$nextTick(() => {
        try {
          const map = this.$refs.centreLeft2ChartRef.chart;
          let index = Math.floor(Math.random() * length);
          while (index === this.preSelectMapIndex || index >= length) {
            index = Math.floor(Math.random() * length);
          }
          map.dispatchAction({
            type: "mapUnSelect",
            seriesIndex: 0,
            dataIndex: this.preSelectMapIndex,
          });
          map.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: index,
          });
          map.dispatchAction({
            type: "mapSelect",
            seriesIndex: 0,
            dataIndex: index,
          });
          this.preSelectMapIndex = index;
        } catch (error) {
          console.log(error);
        }
      });
    },
    handleMapRandomSelect() {
      this.$nextTick(() => {
        try {
          const map = this.$refs.centreLeft2ChartRef.chart;
          const _self = this;
          setTimeout(() => {
            _self.reSelectMapRandomArea();
          }, 0);
          // 移入区域，清除定时器、取消之前选中并选中当前
          map.on("mouseover", function (params) {
            clearInterval(_self.intervalId);
            map.dispatchAction({
              type: "mapUnSelect",
              seriesIndex: 0,
              dataIndex: _self.preSelectMapIndex,
            });
            map.dispatchAction({
              type: "mapSelect",
              seriesIndex: 0,
              dataIndex: params.dataIndex,
            });
            _self.preSelectMapIndex = params.dataIndex;
          });
          // 移出区域重新随机选中地图区域，并开启定时器
          map.on("globalout", function () {
            _self.reSelectMapRandomArea();
            _self.startInterval();
          });
          this.startInterval();
        } catch (error) {
          console.log(error);
        }
      });
    },
  },
};
</script>
