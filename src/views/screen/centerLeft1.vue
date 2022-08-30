<template>
  <div id="bottomRight">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <div class="d-flex">
          <span class="fs-xl text mx-2">业务类型统计图</span>
        </div>
      </div>
      <div>
        <CenterLeft1Chart />
      </div>
    </div>
  </div>
</template>

<script>
import CenterLeft1Chart from "./components/echart/centerLeft/centerLeft1Chart";
export default {
  components: {
    CenterLeft1Chart,
  },
};
</script>

<style lang="scss" class>
$box-height: 440px;
$box-width: 100%;
#bottomRight {
  padding: 14px 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .chart-box {
    margin-top: 16px;
    width: 270px;
    height: 270px;
    .active-ring-name {
      padding-top: 10px;
    }
  }
}
</style>