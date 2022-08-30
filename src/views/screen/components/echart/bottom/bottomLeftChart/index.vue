<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from "./chart.vue";
import { reportDataSetList } from "@/api/reportDataSet";
export default {
  data() {
    return {
      cdata: {
        category: ["广东省", "新疆省", "甘肃省", "广西省"],
        // faultNum: [18092, 20728, 24045, 28348],
        // againNum: [4600, 5000, 5500, 6500],
        // faultAddress: [4600, 5000, 5500, 6500],
        // againAddress: [2330, 4000, 3400, 4500],
        faultNum: [],
        againNum: [],
        faultAddress: [],
        againAddress: []
      },
    };
  },
  components: {
    Chart,
  },
  mounted() {
    // this.setData();
    this.setCdata()
  },
  methods: {
    // 根据自己的业务情况修改
    // setData() {
    //   for (let i = 0; i < this.cdata.barData.length - 1; i++) {
    //     let rate = this.cdata.barData[i] / this.cdata.lineData[i];
    //     this.cdata.rateData.push(rate.toFixed(2));
    //   }
    // },
    async setCdata() {
      this.cdata['faultNum'] = await this.getCData('fault_num')
      this.cdata['againNum'] = await this.getCData('again_num')
      this.cdata['faultAddress'] = await this.getCData('fault_address')
      this.cdata['againAddress'] = await this.getCData('again_address')
      // console.log(temp)

    },
    async getCData(setName) {
      let queryParams = {}
      let a = []
      queryParams['setName'] = setName
      let params = this.urlEncodeObject(queryParams)
      const {data, code} = await reportDataSetList(params)
      if (code != "200") return;
      let temp = JSON.parse(data.records[0].caseResult)
      temp.map(k => {
        k = k.sum
        a.push(k)
      })
      return a
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
