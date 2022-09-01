<template>
  <el-carousel
    :interval="5000"
    arrow="always"
    :height="lightHeight+'px'"
  >
    <el-carousel-item v-for="item in 5" :key="item">
      <Chart
        :cdata="cdatas[item - 1].cities"
        :province="provinces[item - 1]"
        :nheight="newHeight"
        :nwidth="newWidth"
        style="margin-left: 25%"
      ></Chart>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import Chart from "./chart.vue";
import { reportDataSetList } from "@/api/reportDataSet";
export default {
  props: {
    isFullScreen: {
      type: Boolean,
      //default:true,
    },
  },
  data() {
    return {
      provinces: ["广东", "广西", "新疆", "甘肃","云南"],
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
          ],
        },
        {
          cities: [
          ],
        },
        {
          cities: [
          ],
        },
        {
          cities: [
          ],
        },
        {
          cities: [
          ],
        },
      ],
    };
  },
  components: {
    Chart,
  },
  computed:{
    lightHeight(){
      return this.isFullScreen?790 :450;
    },
    newHeight(){
      return this.isFullScreen? 1080:450;
    },
    newWidth(){
      return this.isFullScreen? 960:390;
    }
  },
  mounted() {
    this.setCdatas();
  },
  methods: {
    async setCdatas() {
      this.cdatas[0].cities = await this.getCdatas('guangdong_sum')
     // console.log(this.cdatas[0].cities);
      this.cdatas[1].cities = await this.getCdatas('guangxi_sum')
      this.cdatas[2].cities = await this.getCdatas('xinjiang_sum')
      this.cdatas[3].cities = await this.getCdatas('gansu_sum')
      this.cdatas[4].cities = await this.getCdatas('yunnan_sum')

    },
    async getCdatas(setName) {
      let queryParams = {}
      let a = []
      queryParams['setName'] = setName
      let params = this.urlEncodeObject(queryParams)
      const {data, code} = await reportDataSetList(params)
      if (code != "200") return;
      let temp = JSON.parse(data.records[0].caseResult)
      temp.map(k => {
        k = {
          name:k.city,
          value:k.address_sum
        }
        a.push(k)
      })
      return a
    }
  },
};
</script>

<style lang="scss" scoped>
</style>