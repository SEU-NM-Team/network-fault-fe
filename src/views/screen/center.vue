<template>
  <div id="center">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <div class="d-flex">
          <span class="fs-xl text mx-2">每月各省市故障数据统计图</span>
        </div>
      </div>
      <div class="chart">
        <Center />
      </div>
    </div>
  </div>
</template>

<script>
import Center from "./components/echart/center";
export default {
  data() {
    return {};
  },
  components: {
    Center,
  },
};
</script>

<style lang="scss" scoped>
$box-height: 900px;
$box-width: 90%;
#center {
  margin: 50px;
  padding: 40px 90px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 35px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
}
</style>
