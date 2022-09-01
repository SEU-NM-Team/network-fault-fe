<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10" />
          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8" :color="decorationColor" />
            <div class="title">
              <span class="title-text">网络故障数据分析</span>
              <dv-decoration-6
                class="dv-dec-6"
                :reverse="true"
                :color="['#50e3c2', '#67a1e5']"
              />
            </div>
            <dv-decoration-8
              class="dv-dec-8"
              :reverse="true"
              :color="decorationColor"
            />
          </div>
          <dv-decoration-10 class="dv-dec-10-s" />
        </div>

        <div class="center-box">
          <div>
            <dv-border-box-12 class="dv-bor">
              <center />
            </dv-border-box-12>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import drawMixin from "../utils/drawMixin";
import center from "../center";

export default {
  mixins: [drawMixin],
  data() {
    return {
      loading: true,
      decorationColor: ["#568aea", "#000000"],
    };
  },
  components: {
    center,
  },
  mounted() {
    this.cancelLoading();
  },
  methods: {
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/screenStyle.scss";
@import "@/assets/styles/screen.scss";
.center-box {
  position: absolute;
  left: 8%;
  top: 6%;
  width: 95%;
  .dv-bor {
    width: 90%;
  }
}
</style>
