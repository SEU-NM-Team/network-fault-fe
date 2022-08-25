<template>
  <div>
    <!-- 搜索框 -->
    <el-row :gutter="20" style="margin: 15px 15px 15px 15px">
      <el-col :span="3">
        <el-input
          v-model="searchUserBy.id"
          placeholder="用户id"
          offset="3"
        ></el-input>
      </el-col>
      <el-col :span="3">
        <el-input v-model="searchUserBy.name" placeholder="用户名"></el-input>
      </el-col>
      <el-col :span="3">
        <el-input v-model="searchUserBy.type" placeholder="用户类型"></el-input>
      </el-col>
      <el-button type="primary" style="margin-left: 40px" @click="searchUsers"
        >搜索</el-button
      >
      <el-button type="primary" @click="addVisible = true">新增用户</el-button>
      <el-button type="primary" @click="displayAll = true">展示全部</el-button>
    </el-row>
    <!-- 新增用户的对话框 -->
    <div>
      <el-dialog title="新增用户：" :visible.sync="addVisible" width="35%">
        <el-form label-width="90px">
          <el-form-item label="用户id">
            <el-input disabled placeholder="id后台随机生成"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="input.name"></el-input>
          </el-form-item>
          <el-form-item label="用户类型">
            <el-input v-model="input.type"></el-input>
          </el-form-item>
          <el-form-item label="上次登陆时间">
            <el-input v-model="input.last_log"></el-input>
          </el-form-item>
          <el-form-item label="用户地址">
            <el-input v-model="input.address"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              addVisible = false;
              addUser();
            "
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <!-- 展示栏  表格 -->
    <div>
      <el-table
        :data="
          (displayAll ? usertable : searchTable).slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        "
        stripe
        :show-header="true"
        style="width: 100%; overflow-y: auto"
      >
        <el-table-column prop="id" label="用户id" width="100"></el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="password"
          label="用户密码"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="用户类型"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="last_log"
          label="上次登陆时间"
          width="150"
        ></el-table-column>
        <el-table-column prop="address" label="用户地址"></el-table-column>
        <el-table-column
          prop="status"
          label="账号状态"
          width="150"
        ></el-table-column>
        <!-- 对用户的操作 -->
        <el-table-column label="操作">
          <template slot-scope="props">
            <el-button
              type="primary"
              size="mini"
              @click="
                editVisible = true;
                changeInformation(props.row);
              "
              >修改</el-button
            >
            <el-popconfirm
              title="确定删除该用户吗？"
              @confirm="remove(props.row.id)"
            >
              <el-button
                slot="reference"
                title="删除"
                type="danger"
                size="mini"
                :disabled="props.row.type == -1"
                >删除</el-button
              >
            </el-popconfirm>

            <el-button
              title="冻结"
              type="danger"
              size="mini"
              :disabled="props.row.status === '冻结'"
              @click="handleFreeze(props.row.id)"
              >冻结</el-button
            >
            <el-button
              @click="handleUnfreeze(props.row.id)"
              title="解冻"
              size="mini"
              :disabled="props.row.status === '正常'"
              >解冻</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usertable.length"
      >
      </el-pagination>
      <!-- 修改的对话框 -->
      <el-dialog
        title="修改自提点信息："
        :visible.sync="editVisible"
        width="35%"
      >
        <el-form label-width="90px">
          <el-form-item label="用户id" disabled>
            <el-input
              class="inputId"
              placeholder="不可修改"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="form.name" class="inputName"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" class="inputAddress">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="用户类型">
            <el-select v-model="typeChoice" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.typeChoice"
                :label="item.label"
                :value="item.typeChoice"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上次登陆时间">
            <el-input v-model="form.last_log"></el-input>
          </el-form-item>
          <el-form-item label="用户地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="editVisible = false;handleChange();"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("加载数据");
  },
  data() {
    return {
      displayAll: true, //控制是否展示所有用户或者是搜索结果
      editVisible: false,
      addVisible: false,
      currentPage: 1,
      pageSize: 10,
      typeChoice: "",
      options: [
        {
          typeChoice: "运营商",
          label: "运营商",
        },
        {
          typeChoice: "大数据工程师",
          label: "大数据工程师",
        },
      ],

      input: {
        id: null,
        name: "",
        password: "",
        type: "",
        last_log: "",
        address: "",
        status: "",
      },
      // 存储搜索框中的输入
      searchUserBy: {
        id: null,
        name: "",
        type: "",
      },
      form: {
        //修改页面input里的数据，在这里存储一下
        id:null,
        name: "",
        password: "",
        type: "",
        address: "",
        last_log: "",
        status: "",
      },
      searchTable: [],
      usertable: [
        {
          id: 1,
          name: "dfxc",
          password: "123456",
          type: "运营商",
          last_log: "2011-11-11",
          address: "sbgvcbcf",
          status: "正常",
        },
        {
          id: 2,
          name: "dfxc",
          password: "123456",
          type: "运营商",
          last_log: "2011-11-11",
          address: "sbgvcbcf",
          status: "正常",
        },
        {
          id: 3,
          name: "dfxc",
          password: "123456",
          type: "运营商",
          last_log: "2011-11-11",
          address: "sbgvcbcf",
          status: "正常",
        },
        {
          id: 4,
          name: "dfxc",
          password: "123456",
          type: "大数据工程师",
          last_log: "2011-11-11",
          address: "sbgvcbcf",
          status: "正常",
        },
        {
          id: 5,
          name: "dfxc",
          password: "123456",
          type: "运营商",
          last_log: "2011-11-11",
          address: "sbgvcbcf",
          status: "正常",
        },
        {
          id: 6,
          name: "dfxc",
          password: "123456",
          type: "大数据工程师",
          last_log: "2011-11-11",
          address: "sbgvcbcf",
          status: "正常",
        },
        {
          id: 7,
          name: "dfxc",
          password: "123456",
          type: "运营商",
          last_log: "2011-11-11",
          address: "sbgvcbcf",
          status: "正常",
        },
        {
          id: 8,
          name: "dfxc",
          password: "123456",
          type: "大数据工程师",
          last_log: "2011-11-11",
          address: "sbgvcbcf",
          status: "正常",
        },
      ],
    };
  },
  methods: {
    //新增用户
    addUser() {
      this.usertable.push({
        name: this.input.name,
        type: this.input.type,
        last_log: this.input.last_log,
        address: this.input.address,
      });
    },
    //冻结用户
    handleFreeze(rowId) {
      console.log(rowId);
      for (var i = 0; i < this.usertable.length; i++) {
        if (rowId === this.usertable[i].id) {
          this.usertable[i].status = "冻结";
        }
      }
    },
    //给用户解冻
    handleUnfreeze(rowId) {
      console.log(rowId);
      for (var i = 0; i < this.usertable.length; i++) {
        if (rowId == this.usertable[i].id) {
          this.usertable[i].status = "正常";
        }
      }
    },
    //删除用户
    remove(rowid) {
      console.log("remove" + rowid);
      for (let i = 0; i < this.usertable.length; i++) {
        if (rowid == this.usertable[i].id) {
          this.usertable.splice(i, 1);
        }
      }
    },
    //对表格页面大小的控制，即每页可以展示多少条数据
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //处理搜索用户
    searchUsers() {
      console.log(
        "搜索" +
          this.searchUserBy.id +
          " " +
          this.searchUserBy.name +
          " " +
          this.searchUserBy.type
      );
      if (
        !this.searchTable.id &&
        !this.searchTable.name &&
        !this.searchTable.type
      ) {
        alert("请输入搜索条件！");
        return;
      }
      this.searchTable.splice(0, this.searchTable.length);
      let sid = this.searchUserBy.id;
      let sname = this.searchUserBy.name;
      let stype = this.searchUserBy.type;
      if (stype) {
        this.searchTable = this.usertable.filter((item) =>
          item.type.includes(stype)
        );
      }
      if (sid) {
        if (this.searchTable.length != 0) {
          for (var i = 0; i < this.searchTable.length; i++) {
            if (this.searchTable[i].id == sid) {
              let tmp = this.searchTable[i];
              this.searchTable.splice(0, this.searchTable.length);
              this.searchTable.push(tmp);
              break;
            }
          }
        } else {
          for (var i = 0; i < this.usertable.length; i++) {
            if (this.usertable[i].id == sid) {
              this.searchTable.push(this.usertable[i]);
              break;
            }
          }
        }
      }
      if (sname) {
        if (this.searchTable.length != 0) {
          let tmp = [];
          for (var i = 0; i < this.searchTable.length; i++) {
            if (this.searchTable[i].name.includes(sname)) {
              tmp.push(this.searchTable[i]);
            }
          }
          this.searchTable.splice(0, this.searchTable.length);
          this.searchTable = tmp;
        } else {
          for (var i = 0; i < this.usertable.length; i++) {
            if (this.usertable[i].name.includes(sname)) {
              this.searchTable.push(this.usertable[i]);
            }
          }
        }
      }
      this.displayAll = false;
      console.log(this.searchTable);
    },
    // 处理修改用户弹出对话框时，对话框的显示
    changeInformation(usr) {
      this.typeChoice=usr.type;
      this.form.id=usr.id;
      this.form.name = usr.name;
      this.form.password = usr.password;
      this.form.last_log = usr.last_log;
      this.form.address = usr.address;
    },
    // 修改用户
    handleChange() {
      console.log('修改用户id为'+this.form.id+'的用户');
      for (var i = 0; i < this.usertable.length; i++) {
        if (this.usertable[i].id == this.form.id) {
          this.usertable[i].name = this.form.name;
          this.usertable[i].type = this.typeChoice;
          this.usertable[i].address = this.form.address;
          this.usertable[i].last_log = this.form.last_log;
          this.usertable[i].password = this.form.password;
          break;
        }
      }
    },
  },
};
</script>

<style>
</style>