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

        <div class="body-box">
          <div class="content-box">
            <div>
              <dv-border-box-12>
                <centerLeft1 />
              </dv-border-box-12>
            </div>
            <div>
              <fullscreen v-model="fullscreen">
                <dv-border-box-12>
                  <!-- <button type="button" @click="toggle">Fullscreen</button> -->
                  <centerLeft2 :is-full="fullscreen"></centerLeft2>
                </dv-border-box-12>
              </fullscreen>
            </div>
            <div>
              <dv-border-box-13>
                <centerRight1 />
              </dv-border-box-13>
            </div>
          </div>

          <!-- 第四行数据 -->
          <div class="bottom-box">
            <dv-border-box-13>
              <bottomLeft />
            </dv-border-box-13>
            <dv-border-box-13>
              <bottomCenter />
            </dv-border-box-13>
            <dv-border-box-13>
              <bottomRight />
            </dv-border-box-13>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import drawMixin from "../utils/drawMixin";
import { formatTime } from "../utils/index.js";
import centerLeft1 from "../centerLeft1";
import centerLeft2 from "../centerLeft2";
import centerRight1 from "../centerRight1";
import center from "../center";
import bottomLeft from "../bottomLeft";
import bottomRight from "../bottomRight";
import bottomCenter from "../bottomCenter"
export default {
  mixins: [drawMixin],
  data() {
    return {
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      decorationColor: ["#568aea", "#000000"],
      fullscreen: false,
    };
  },
  components: {
    centerLeft1,
    centerLeft2,
    centerRight1,
    center,
    bottomLeft,
    bottomCenter,
    bottomRight,
  },
  mounted() {
    this.timeFn();
    this.cancelLoading();
  },
  beforeDestroy() {
    clearInterval(this.timing);
  },
  methods: {
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), "HH: mm: ss");
        this.dateYear = formatTime(new Date(), "yyyy-MM-dd");
        this.dateWeek = this.weekday[new Date().getDay()];
      }, 1000);
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    toggle() {
      console.log(this.fullscreen);
      this.fullscreen = !this.fullscreen;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/screenStyle.scss";
@import "@/assets/styles/screen.scss";
</style>
