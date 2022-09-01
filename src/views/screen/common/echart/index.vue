<template>
  <div :id="id" v-if="renderComponent" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import tdTheme from "./theme.json"; // 引入默认主题
import "echarts/map/js/province/guangdong.js";
import "echarts/map/js/province/guangxi.js";
import "echarts/map/js/province/xinjiang.js";
import "echarts/map/js/province/gansu.js";
import "echarts/map/js/province/yunnan.js"
export default {
  name: "echart",
  props: {
    className: {
      type: String,
      default: "chart",
    },
    mapPosition: {
      type: String,
      default: "center",
    },
    id: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "2.5rem",
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      renderComponent:true,
      chart: null,
    };
  },
  watch: {
    height: {
      handler(newdata) {
        this.renderComponent = false;
        this.$nextTick(() => {
          this.renderComponent = true;
        });
        this.renderComponent=true;
      },
    },
    options: {
      handler(options) {
        // 设置true清空echart缓存
        this.chart.setOption(options, true);
      },
      deep: true,
    },
  },
  mounted() {
    this.$echarts.registerTheme("tdTheme", tdTheme); // 覆盖默认主题
    this.initChart();
  },
  beforeDestroy() {
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      // 初始化echart
      this.chart = this.$echarts.init(this.$el, "tdTheme");
      this.chart.setOption(this.options, true);
    },
  },
};
</script>

<style>
</style>
