<template>
  <div class="bg">
    <div class="common-layout">
      <el-container>
        <el-header class="title">
          <span class="title-text"> 用户画像 </span>
        </el-header>
        <el-divider />
        <el-container>
          <el-aside width="8%"></el-aside>
          <el-container>
            <el-main class="box">
              <el-row :gutter="10">
                <el-col
                  v-for="(item, index) in userList"
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
                          "电话：" +
                          (item.phoneNum === "" ? "无" : item.phoneNum)
                        }}
                      </div>
                      <div class="text-item">
                        {{ "地址：" + item.address }}
                      </div>
                      <div class="text-item">
                        {{ "心情：" + item.description }}
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
                    v-show="total > 0"
                    background
                    :current-page.sync="queryParams.pageNumber"
                    :page-size="queryParams.pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="total"
                    @current-change="handleCurrentChange"
                  />
                </div>
              </div>
            </el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
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
  created() {
    this.handleQueryPageList1();
  },
  methods: {
    async handleQueryPageList1() {
      let params = this.urlEncodeObject(this.queryParams);
      console.log(params);
      // const { data, code } = await
      const code = "200";
      const data = {
        userList: [
          {
            number: "1234",
            address: "广东省广州市",
            phoneNum: "123456789",
            description: "情绪激动",
          },
          {
            number: "1234",
            address: "广东省广州市",
            phoneNum: "",
            description: "情绪激动",
          },
          {
            number: "1234",
            address: "广东省广州市",
            phoneNum: "123456789",
            description: "情绪激动",
          },
          {
            number: "1234",
            address: "广东省广州市",
            phoneNum: "123456789",
            description: "情绪激动",
          },
        ],
        total: 5,
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
.bg {
  width: 100%;
  height: 100%;
  padding: 16px 16px 0 16px;
  background-image: url("~@/assets/images/pageBg.png");
  background-size: cover;
  background-position: center center;
}
.title {
  height: 70px;
  position: relative;
  .title-text {
    font-size: 24px;
    color: #ffffff;
    text-align: center;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%);
  }
}
.box {
  width: 100%;
  .box-dv {
    width: 80%;
    height: 270px;
    margin: 20px;
    .box-card {
      background: transparent !important;
      color: #ffffff;
      border-color: transparent !important;
      font-size: 18px !important;
      width: 90%;
      height: 250px;
      position: absolute;
      left: 5%;
      .text-item {
        height: 30px;
      }
    }
  }
}
.page_bottom {
  width: 50%;
  position: absolute;
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
