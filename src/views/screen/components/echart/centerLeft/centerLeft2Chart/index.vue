<template>
  <div>
    <el-carousel :interval="5000" arrow="always" :height="isFullScreen?'790px':'450px'">
      <el-carousel-item v-for="item in 4" :key="item" >
        <Chart
        style="margin-left:15%"
          :cdata="cdatas[item - 1].cities"
          :province="provinces[item - 1]"
        ></Chart>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import Chart from "./chart.vue";
//import guangxiChart from "./guangxiChart.vue";
export default {
  props:{    
    isFullScreen:{
      type:Boolean,
      //default:true,
    }
  },
  data() {
    return {
      mapheight:0,
      provinces: ["广东", "广西", "新疆", "甘肃"],
      cdatas: [
        // {
        // // 名字需要与 “common/map/fujian.js” 地图数据文件里面定义的一一对应，不能是 “福州” 或者 “闽” 之类的缩写
        //   name: "广州市",
        //   value: 10,
        //   elseData: {
        //     // 这里放置地图 tooltip 里想显示的数据
        //   },
        // },
        {
          cities: [
            { name: "广州市", value: 711409 },
            { name: "深圳市", value: 627510 },
            { name: "东莞市", value: 198241 },
            { name: "佛山市", value: 90502 },
            { name: "珠海市", value: 52840 },
            { name: "江门市", value: 52129 },
            { name: "惠州市", value: 43824 },
            { name: "汕头市", value: 39276 },
            { name: "肇庆市", value: 36373 },
            { name: "湛江市", value: 34669 },
            { name: "茂名市", value: 26375 },
            { name: "韶关市", value: 22249 },
            { name: "梅州市", value: 19801 },
            { name: "揭阳市", value: 18916 },
            { name: "清远市", value: 16743 },
            { name: "云浮市", value: 14596 },
            { name: "潮州市", value: 14086 },
            { name: "阳江市", value: 13082 },
            { name: "汕尾市", value: 8718 },
            { name: "河源市", value: 7826 },
          ],
        },
        {
          cities: [
            { name: "南宁市", value: 43069 },
            { name: "梧州市", value: 11678 },
            { name: "桂林市", value: 11436 },
            { name: "贵港市", value: 11237 },
            { name: "百色市", value: 10372 },
            { name: "来宾市", value: 7253 },
          ],
        },
        {
          cities: [
            { name: "乌鲁木齐", value: 288161 },
            { name: "伊犁", value: 66310 },
            { name: "昌吉", value: 55779 },
            { name: "喀什", value: 36663 },
            { name: "克拉玛依", value: 22643 },
            { name: "阿勒泰", value: 18882 },
            { name: "塔城", value: 18627 },
            { name: "阿克苏", value: 17996 },
            { name: "石河子", value: 17961 },
            { name: "和田", value: 15010 },
            { name: "博州", value: 13730 },
            { name: "哈密", value: 13142 },
            { name: "吐鲁番", value: 11265 },
            { name: "克州", value: 4064 },
          ],
        },
        {
          cities: [
            { name: "兰州市", value: 158273 },
            { name: "武威市", value: 60261 },
            { name: "天水市", value: 56134 },
            { name: "定西市", value: 49840 },
            { name: "陇南市", value: 49337 },
            { name: "平凉市", value: 43573 },
            { name: "庆阳市", value: 40640 },
            { name: "张掖市", value: 35418 },
            { name: "白银市", value: 33258 },
            { name: "酒泉市", value: 28445 },
            { name: "临夏回族自治州", value: 22029 },
            { name: "金昌市", value: 15276 },
            { name: "嘉峪关市", value: 8920 },
            { name: "甘南藏族自治州", value: 6755 },
          ],
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