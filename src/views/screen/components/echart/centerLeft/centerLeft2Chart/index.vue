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
      cdata: [
        {
          // 名字需要与 “common/map/fujian.js” 地图数据文件里面定义的一一对应，不能是 “福州” 或者 “闽” 之类的缩写
          name: "广州市",
          value: 10,
          elseData: {
            // 这里放置地图 tooltip 里想显示的数据
          },
        },
        {
          name: "韶关市",
          value: 10,
        },
        {
          name: "深圳市",
          value: 10,
        },
        {
          name: "珠海市",
          value: 10,
        },
        {
          name: "汕头市",
          value: 10,
        },
        {
          name: "佛山市",
          value: 10,
        },
        {
          name: "江门市",
          value: 10,
        },
        {
          name: "湛江市",
          value: 10,
        },
        {
          name: "茂名市",
          value: 10,
        },
        {
          name: "肇庆市",
          value: 10,
        },
        {
          name: "惠州市",
          value: 10,
        },
        {
          name: "梅州市",
          value: 10,
        },
        {
          name: "汕尾市",
          value: 10,
        },
        {
          name: "河源市",
          value: 10,
        },
        {
          name: "阳江市",
          value: 10,
        },
        {
          name: "清远市",
          value: 10,
        },
        {
          name: "东莞市",
          value: 10,
        },
        {
          name: "中山市",
          value: 10,
        },
        {
          name: "潮州市",
          value: 10,
        },
        {
          name: "揭阳市",
          value: 10,
        },
        {
          name: "云浮市",
          value: 10,
        },
      ],
    };
  },
  components: {
    Chart,
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>