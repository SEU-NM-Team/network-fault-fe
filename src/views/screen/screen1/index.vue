<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="body">
        <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10" />
          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8" :color="decorationColor" />
            <div class="title">
              <span class="title-text">用户画像</span>
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

        <div class="common-layout">
          <el-container>
            <el-aside width="6%"></el-aside>
            <el-container>
              <el-main class="box">
                <el-row :gutter="8" class="box-row">
                  <el-col
                    v-for="(item, index) in userList.slice((queryParams.pageNumber-1)*4,queryParams.pageNumber*4+4)"
                    :key="index"
                    :span="12"
                  >
                    <dv-border-box-12 class="box-dv">
                      <el-card class="box-card">
                        <template #header>
                          <div class="card-header">
                            <el-avatar
                              class="user-number"
                              :size="50"
                              :src="circleUrl"
                            />
                            <span>{{ item.number }}</span>
                          </div>
                        </template>
                        <div class="text-item">
                          {{
                            "省份：" +
                            (item.provine === "" ? "无" : item.province)
                          }}
                        </div>
                        <div class="text-item">
                          {{ "详细地址：" + item.address }}
                        </div>
                        <div class="text-item">
                          {{ "特征：" + item.description }}
                        </div>
                      </el-card>
                    </dv-border-box-12>
                  </el-col>
                </el-row>
              </el-main>
              <el-footer>
                <div class="page_bottom">
                  <div class="pagination">
                    <el-pagination
                      v-show="userList.length > 0"
                      background
                      :current-page.sync="queryParams.pageNumber"
                      :page-size="queryParams.pageSize"
                      layout="total, prev, pager, next, jumper"
                      :total="userList.length"
                      @current-change="handleCurrentChange"
                    />
                  </div>
                </div>
              </el-footer>
            </el-container>
          </el-container>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import drawMixin from "../utils/drawMixin";
import { reportDataSetList } from "@/api/reportDataSet";
export default {
  mixins: [drawMixin],
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      userList: [],
      total: 1,
      queryParams: {
        pageNumber: 1,
        pageSize: 4,
      },
    };
  },
  mounted(){
    this.setUserList();
  },
  created() {
    this.handleQueryPageList1();
  },
  methods: {
    async setUserList() {
      this.userList = await this.getUserList("portrait");
    },
    async getUserList(setName) {
      let queryParams = {};
      let a = [];
      queryParams["setName"] = setName;
      let params = this.urlEncodeObject(queryParams);
      const { data, code } = await reportDataSetList(params);
      if (code != "200") return;
      let temp = JSON.parse(data.records[0].caseResult);
      //console.log(temp);
      temp.map((k) => {
        k = {
          number:k.id,
          province:k.province,
          address:k.detail,
          description:k.mood,
        };
        a.push(k);
      });
      return a;
    },
    async handleQueryPageList1() {
      let params = this.urlEncodeObject(this.queryParams);
      console.log(params);
      // const { data, code } = await
      const code = "200";
      const data = {
        userList: [
        ],
      };
      if (code != "200") return;
      this.total = data.total;
      this.userList = data.userList;
    },
    handleCurrentChange(pageNumber) {
      this.queryParams.pageNumber = pageNumber;
      this.handleQueryPageList();
    },
    async handleQueryPageList() {
      let params = this.urlEncodeObject(this.queryParams);
      console.log(params);
      // const { data, code } = await
      if (code != "200") return;
      this.total = data.total;
      this.userList = data.userList;
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/styles/screenStyle.scss";
@import "@/assets/styles/screen.scss";
.body {
  .dv-dec-10,
  .dv-dec-10-s {
    width: 33.3%;
    height: 5px;
  }

  .dv-dec-10-s {
    transform: rotateY(180deg);
  }

  .dv-dec-8 {
    width: 200px;
    height: 50px;
  }

  .title {
    position: relative;
    width: 500px;
    text-align: center;
    background-size: cover;
    background-repeat: no-repeat;

    .title-text {
      font-size: 27px;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%);
    }

    .dv-dec-6 {
      position: absolute;
      bottom: -30px;
      left: 50%;
      width: 250px;
      height: 8px;
      transform: translate(-50%);
    }
  }
}
.common-layout {
  position: absolute;
  left: 7%;
  top: 10%;
  .box {
    overflow: hidden;
    width: 1600px;
    height: 850px;
    .box-row {
      .box-dv {
        width: 80%;
        height: 370px;
        margin: 20px;
        .box-card {
          background: transparent !important;
          color: #ffffff;
          border-color: transparent !important;
          font-size: 22px !important;
          width: 90%;
          height: 250px;
          position: absolute;
          left: 5%;
          top: 10%;
          .text-item {
            height: 30px;
          }
        }
      }
    }
  }
}
.page_bottom {
  width: 50%;
  position: absolute;
  left: 12%;
  margin-top: 20px;
  .pagination {
    margin-left: 55%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
.el-pager li.active,
.el-pager li:hover {
  background: transparent !important;
  color: white !important;
}
</style>
