<template>
  <div class="index-container">
    <el-row align="middle" justify="center">
      <el-col :span="24" :offset="0" class="position">
        <div class="center"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "index1",
  data() {
    return {};
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style rel="stylesheet/scss" lang="scss">
.index-container {
  width: 100%;
  height: calc(100vh - 50px);
  overflow: hidden;
  background: url("~@/assets/images/background.jpg");
  background-size: 100% 100%;
  .position {
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 0;
    position: absolute;
    top: 67px;
  }
  .center {
    width: 100%;
    height: 100vh;
    bottom: 0;
    position: relative;
    max-width: 1893px;
  }
}
</style>
