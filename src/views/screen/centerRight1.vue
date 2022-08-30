<template>
  <div id="centerRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <div class="d-flex">
          <span class="fs-xl text mx-2">各省市故障数量排行</span>
        </div>
      </div>
      <el-carousel :interval="5000" arrow="never" ref="carousel" height="450px">
        <el-carousel-item>
          <div class="d-flex jc-center body-box">
            <dv-scroll-board class="dv-scr-board" :config="config1" />
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="d-flex jc-center body-box">
            <dv-scroll-board class="dv-scr-board" :config="config2" />
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="d-flex jc-center body-box">
            <dv-scroll-board class="dv-scr-board" :config="config3" />
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="d-flex jc-center body-box">
            <dv-scroll-board class="dv-scr-board" :config="config4" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config1: {
        header: ["省", "市", "故障量"],
        data: [
          ["广东省", "广州市", 711409],
          ["广东省", "深圳市", 627510],
          ["广东省", "东莞市", 198241],
          ["广东省", "佛山市", 90502],
          ["广东省", "珠海市", 52840],
          ["广东省", "江门市", 52129],
          ["广东省", "惠州市", 43824],
          ["广东省", "汕头市", 39276],
          ["广东省", "肇庆市", 36373],
          ["广东省", "湛江市", 34669],
          ["广东省", "茂名市", 26375],
          ["广东省", "韶关市", 22249],
          ["广东省", "梅州市", 19801],
          ["广东省", "揭阳市", 18916],
          ["广东省", "清远市", 16743],
          ["广东省", "云浮市", 14596],
          ["广东省", "潮州市", 14086],
          ["广东省", "阳江市", 13082],
          ["广东省", "汕尾市", 8718],
          ["广东省", "河源市", 7826],
        ],
        rowNum: 7, //表格行数
        headerHeight: 35,
        headerBGC: "#0f1325", //表头
        oddRowBGC: "#0f1325", //奇数行
        evenRowBGC: "#171c33", //偶数行
        index: true,
        columnWidth: [50],
        align: ["center"],
      },
      config2: {
        header: ["省", "市", "故障量"],
        data: [
          ["广西省", "南宁市", 43069],
          ["广西省", "梧州市", 11678],
          ["广西省", "桂林市", 11436],
          ["广西省", "贵港市", 11237],
          ["广西省", "百色市", 10372],
          ["广西省", "来宾市", 7253],
        ],
        rowNum: 7, //表格行数
        headerHeight: 35,
        headerBGC: "#0f1325", //表头
        oddRowBGC: "#0f1325", //奇数行
        evenRowBGC: "#171c33", //偶数行
        index: true,
        columnWidth: [50],
        align: ["center"],
      },
      config3: {
        header: ["省", "市", "故障量"],
        data: [
          ["新疆省", "乌鲁木齐市", 288161],
          ["新疆省", "伊犁哈萨克自治州", 66310],
          ["新疆省", "巴音郭勒蒙古自治州", 65019],
          ["新疆省", "昌吉回族自治州", 55779],
          ["新疆省", "喀什地区", 36663],
          ["新疆省", "克拉玛依市", 22643],
          ["新疆省", "阿勒泰地区", 18882],
          ["新疆省", "塔城地区", 18627],
          ["新疆省", "阿克苏地区", 17996],
          ["新疆省", "石河子市", 17961],
          ["新疆省", "和田地区", 15010],
          ["新疆省", "博尔塔拉蒙古自治州", 13730],
          ["新疆省", "哈密市", 13142],
          ["新疆省", "吐鲁番市", 11265],
          ["新疆省", "克孜勒苏柯尔克孜自治州", 4064],
        ],
        rowNum: 7, //表格行数
        headerHeight: 35,
        headerBGC: "#0f1325", //表头
        oddRowBGC: "#0f1325", //奇数行
        evenRowBGC: "#171c33", //偶数行
        index: true,
        columnWidth: [50],
        align: ["center"],
      },
      config4: {
        header: ["省", "市", "故障量"],
        data: [
          ["甘肃省", "兰州市", 158273],
          ["甘肃省", "武威市", 60261],
          ["甘肃省", "天水市", 56134],
          ["甘肃省", "定西市", 49840],
          ["甘肃省", "陇南市", 49337],
          ["甘肃省", "平凉市", 43573],
          ["甘肃省", "庆阳市", 40640],
          ["甘肃省", "张掖市", 35418],
          ["甘肃省", "白银市", 33258],
          ["甘肃省", "酒泉市", 28445],
          ["甘肃省", "临夏回族自治州", 22029],
          ["甘肃省", "金昌市", 15276],
          ["甘肃省", "嘉峪关市", 8920],
          ["甘肃省", "甘南藏族自治州", 6755],
        ],
        rowNum: 7, //表格行数
        headerHeight: 35,
        headerBGC: "#0f1325", //表头
        oddRowBGC: "#0f1325", //奇数行
        evenRowBGC: "#171c33", //偶数行
        index: true,
        columnWidth: [50],
        align: ["center"],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
$box-height: 500px;
$box-width: 400px;
#centerRight1 {
  padding: 16px;
  padding-top: 20px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 10px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 10px;
    overflow: hidden;
    .dv-scr-board {
      width: 340px;
      height: 440px;
    }
  }
}
/deep/ .el-carousel__indicator--horizontal .el-carousel__button {
  width: 10px;
  height: 10px;
  background: transparent;
  border: 1px solid #ffffff;
  border-radius: 50%;
  opacity: 0.5;
}
/deep/ .el-carousel__indicator--horizontal.is-active .el-carousel__button {
  width: 10px;
  height: 10px;
  background: #ffffff;
  border-radius: 50%;
  opacity: 1;
}
</style>
