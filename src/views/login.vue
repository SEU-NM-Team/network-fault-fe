<!--
 * @Descripttion: 登录
 * @version:
 * @Author: qianlishi
 * @Date: 2021-12-11 14:48:27
 * @LastEditors: qianlishi
 * @LastEditTime: 2022-06-23 17:23:23
-->
<template>
  <div class="login_container">
    <!-- 顶部logo -->
    <div class="login_title">
      <div class="left">
        <div class="box">
          <img src="../../static/logo-dp.png" alt="" />
        </div>
        <div class="name">运营商网络故障数据分析系统</div>
      </div>
      <div class="right">
        <div class="item" @click="centerDialogVisible = true">管理员</div>
      </div>
    </div>
    <div class="login_contant">
      <img src="@/assets/images/login.png" alt="image" class="login_img" />
      <el-form
        v-if="!needRegister"
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login_form"
        autocomplete="on"
        label-position="left"
        @keyup.enter.native="handleLogin"
      >
        <div class="title_container">
          <h3 class="title">
            HELLO,
            <br />
            <p class="title_name">SEUer</p>
          </h3>
        </div>
        <div class="form_fields">
          <!-- 黄色条条 -->
          <i :style="{ top: activeTop + '%' }" />
          <!-- 中间条条 -->
          <b class="b1" />
          <b class="b2" />
          <div>
            <p>用户名</p>
            <el-form-item prop="loginName">
              <el-input
                ref="loginName"
                v-model="loginForm.loginName"
                placeholder="用户名"
                name="loginName"
                type="text"
                tabindex="1"
                autocomplete="on"
                @focus="setTop('0')"
                @change="getPsw"
              />
            </el-form-item>
          </div>
          <div>
            <p>密码</p>
            <input
              name="password"
              type="password"
              autocomplete="off"
              class="take"
            />
            <el-tooltip
              v-model="capsTooltip"
              content="Caps lock is On"
              placement="right"
              manual
            >
              <el-form-item prop="password">
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="用户密码"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @blur="capsTooltip = false"
                  @focus="setTop('34')"
                  @keyup.native="checkCapslock"
                />
                <span class="show_pwd" @click="showPwd">
                  <i class="el-icon-view" />
                </span>
              </el-form-item>
            </el-tooltip>
          </div>
          <div>
            <p>用户类型</p>
            <el-form-item prop="userType">
              <el-radio-group
                ref="userType"
                v-model="loginForm.userType"
                @change="setTop('67')"
              >
                <el-radio :label="1">运营商用户</el-radio>
                <el-radio :label="2">大数据工程师</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div class="control">
          <div class="remember">
            <input v-model="rememberPsw" type="checkbox" />
            <p>记住密码</p>
          </div>
        </div>
        <el-button
          :loading="loading"
          type="primary"
          class="login_btn"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
        <el-button
          type="text"
          class="register_btn"
          @click.native.prevent="toRegister"
          >注册</el-button
        >
      </el-form>
      <el-form
        v-if="needRegister"
        ref="registerForm"
        :model="registerForm"
        :rules="registerRules"
        class="register_form"
        autocomplete="on"
        label-position="left"
        @keyup.enter.native="handleRegister"
      >
        <div class="title_container">
          <h3 class="title">
            HELLO,
            <br />
            <p class="title_name">SEUer</p>
          </h3>
        </div>
        <div class="form_fields">
          <!-- 黄色条条 -->
          <i :style="{ top: activeTop + '%' }" />
          <!-- 中间条条 -->
          <b class="b1" />
          <b class="b2" />
          <b class="b3" />
          <div>
            <p>用户名</p>
            <el-form-item prop="loginName">
              <el-input
                ref="loginName"
                v-model="registerForm.loginName"
                placeholder="用户名"
                name="loginName"
                type="text"
                tabindex="1"
                autocomplete="on"
                @focus="setTop('0')"
              />
            </el-form-item>
          </div>
          <div>
            <p>密码</p>
            <input
              name="password"
              type="password"
              autocomplete="off"
              class="take"
            />
            <el-tooltip
              v-model="capsTooltip"
              content="Caps lock is On"
              placement="right"
              manual
            >
              <el-form-item prop="password">
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="registerForm.password"
                  :type="passwordType"
                  placeholder="用户密码"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @blur="capsTooltip = false"
                  @focus="setTop('25')"
                  @keyup.native="checkCapslock"
                />
                <span class="show_pwd" @click="showPwd">
                  <i class="el-icon-view" />
                </span>
              </el-form-item>
            </el-tooltip>
          </div>
          <div>
            <p>确认密码</p>
            <input
              name="passwordConfirm"
              type="password"
              autocomplete="off"
              class="take"
            />

            <el-form-item prop="passwordConfirm">
              <el-input
                :key="passwordTypeConfirm"
                ref="passwordConfirm"
                v-model="registerForm.passwordConfirm"
                :type="passwordTypeConfirm"
                placeholder="再次输入密码"
                name="passwordConfirm"
                tabindex="3"
                autocomplete="on"
                @focus="setTop('50')"
              />
              <span class="show_pwd" @click="showPwdConfirm">
                <i class="el-icon-view" />
              </span>
            </el-form-item>
          </div>
          <div>
            <p>用户类型</p>
            <el-form-item prop="userType">
              <el-radio-group
                ref="userType"
                v-model="registerForm.userType"
                @change="setTop('75')"
              >
                <el-radio :label="1">运营商用户</el-radio>
                <el-radio :label="2">大数据工程师</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div class="control"></div>
        <el-button
          :loading="loading"
          type="primary"
          class="login_btn"
          @click.native.prevent="handleRegister"
          >注册并登录</el-button
        >
        <el-button
          type="text"
          class="register_btn"
          @click.native.prevent="toLogin"
          >已有账号，直接登录</el-button
        >
      </el-form>
    </div>
    <!--  验证码  -->
    <Verify
      v-if="needCaptcha"
      ref="verify"
      :captcha-type="'blockPuzzle'"
      :img-size="{ width: '400px', height: '200px' }"
      @success="verifylogin"
    />
    <!-- 管理员登录 -->
    <el-dialog
      title="管理员登录"
      :visible.sync="centerDialogVisible"
      width="34%"
      center
      @close="closeDialog"
    >
      <el-form
        ref="adminForm"
        :model="adminForm"
        :rules="adminRule"
        label-width="70px"
      >
        <el-form-item label="密码" prop="password">
          <el-input
            ref="password"
            v-model="adminForm.password"
            type="password"
            class="admin_form"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native.prevent="handleAdmin"
          >确 定</el-button
        >
        <el-button type="primary" @click="centerDialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Verify from "@/components/verifition/Verify";
import cookies from "js-cookie";
import { Decrypt, Encrypt } from "@/utils/index";
import { login } from "@/api/login";
import { transPsw } from "@/utils/encrypted";
import { setToken, setAccessUser } from "@/utils/auth";
export default {
  name: "Login",
  components: {
    Verify,
  },
  data() {
    var validatePsw = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateType = (rule, value, callback) => {
      if ((value === 1) | (value === 2)) {
        callback();
      } else {
        callback(new Error("用户类型必选"));
      }
    };
    return {
      activeTop: "-50%",
      rememberPsw: false,
      loginForm: {
        loginName: "",
        password: "",
        userType: "",
        verifyCode: "",
      },
      loginRules: {
        loginName: [{ required: true, message: "用户名必填", trigger: "blur" }],
        password: [
          { required: true, message: "用户密码必填", trigger: "blur" },
        ],
        userType: [
          { required: true, validator: validateType, trigger: "change" },
        ],
      },
      registerForm: {
        loginName: "",
        password: "",
        passwordConfirm: "",
        userType: "",
      },
      registerRules: {
        loginName: [{ required: true, message: "用户名必填", trigger: "blur" }],
        password: [
          { required: true, message: "用户密码必填", trigger: "blur" },
        ],
        passwordConfirm: [
          { required: true, validator: validatePsw, trigger: "blur" },
        ],
        userType: [
          { required: true, validator: validateType, trigger: "change" },
        ],
      },
      adminForm: {
        password: "",
      },
      adminRule: {
        password: [{ required: true, message: "密码必填", trigger: "blur" }],
      },
      passwordType: "password",
      passwordTypeConfirm: "password",
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      needCaptcha: false,
      needRegister: false,
      centerDialogVisible: false,
    };
  },
  watch: {
    $route: {
      // 监听路由获取上个路由（from）的地址和参数
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.handleLoginFocus();
  },
  methods: {
    handleLoginFocus() {
      if (this.loginForm.loginName === "") {
        this.$refs.loginName.focus();
      } else if (this.loginForm.password === "") {
        this.$refs.password.focus();
      }
    },
    //转到注册页面
    toRegister() {
      this.needRegister = true;
      this.setTop(0);
      this.$refs["loginForm"].resetFields();
    },
    //转到登录页面
    toLogin() {
      this.needRegister = false;
      this.setTop(0);
      this.$refs["registerForm"].resetFields();
    },
    // 获取存储的密码并解密
    getPsw() {
      const cookVal = cookies.get(`u_${this.loginForm.loginName}`);
      console.log(cookVal);
      this.loginForm.password = cookVal && Decrypt(cookVal);
    },
    // 滑动条块的top控制
    setTop(val) {
      this.activeTop = val;
    },
    // 检测大写锁定键是否开启
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    // 查看密码
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    showPwdConfirm() {
      if (this.passwordTypeConfirm === "password") {
        this.passwordTypeConfirm = "";
      } else {
        this.passwordTypeConfirm = "password";
      }
      this.$nextTick(() => {
        this.$refs.passwordConfirm.focus();
      });
    },
    // 滑动验证码
    useVerify() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$refs.verify.show();
        } else {
          return false;
        }
      });
    },
    // 验证成功的回调
    verifylogin(params) {
      this.loginForm.verifyCode = params.captchaVerification;
      if (this.loginForm.verifyCode) {
        this.loginApi();
      }
    },
    closeDialog() {
      this.$refs["adminForm"].resetFields();
    },
    //管理员登录
    handleAdmin() {
      this.$refs.adminForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          console.log(this.adminForm);
          this.adminApi();
        } else {
          return false;
        }
      });
    },
    async adminApi() {
      const obj = {
        password: transPsw(this.adminForm.password),
      };
      // const { code, data } = await register(obj);
      const code = "200";
      const data = { token: "admin" };
      this.loading = false;
      if (code != "200") return;
      setToken(data.token);
      setAccessUser(data);
      this.$router.push({
        path: "/admin",
      });
    },
    //注册操作
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          console.log(this.registerForm);
          this.registerApi();
        } else {
          return false;
        }
      });
    },
    async registerApi() {
      const obj = {
        loginName: this.registerForm.loginName,
        password: transPsw(this.registerForm.password),
      };
      // const { code, data } = await register(obj);
      const code = "200";
      const data = { token: "abc" };
      this.loading = false;
      if (code != "200") return;
      setToken(data.token);
      setAccessUser(data);
      this.$router.push({
        path: this.redirect || "/index",
        query: this.otherQuery,
      });
    },
    // 登录操作
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // 登录失败次数过多需要展示滑动验证码
          if (this.needCaptcha) {
            this.useVerify();
            return;
          }
          this.loginApi();
        } else {
          return false;
        }
      });
    },
    async loginApi() {
      const obj = {
        loginName: this.loginForm.loginName,
        password: transPsw(this.loginForm.password),
        verifyCode: "",
      };
      const { code, data } = await login(obj);
      // const code = "200";
      // const data = { token: "abc" };
      this.loading = false;
      if (code != "200") return;
      setToken(data.token);
      setAccessUser(data);
      // 选中记住密码时 把密码存到cookie里,时效15天
      this.rememberPsw &&
        cookies.set(
          `u_${this.loginForm.loginName}`,
          Encrypt(this.loginForm.password),
          { expires: 15 }
        );
      // if (data && data.captcha) {
      //   this.needCaptcha = true;
      // }
      if (0) {
        this.needCaptcha = true;
      } else {
        this.needCaptcha = false;
        this.$router.push({
          path: this.redirect || "/index",
          query: this.otherQuery,
        });
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>

<style lang="scss">
.login_container .el-input input {
  color: #000;
  background: #fff;
}
.login_container {
  .el-input {
    display: inline-block;
    width: 100%;
    input {
      -webkit-appearance: none;
      caret-color: rgba($color: #000000, $alpha: 0.3);
      border: 1px solid #fff;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #eee inset !important;
        -webkit-text-fill-color: #666 !important;
      }
    }
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #f5ab1b !important;
  }
  .el-radio__input.is-checked .el-radio__inner {
    background: #f5ab1b !important;
    border-color: #f5ab1b !important;
  }
  .el-form-item {
    border-radius: 5px;
    color: #454545;
  }
}
.verifybox {
  position: absolute;
  left: auto;
  right: 30%;
  transform: translate(50%, -50%);
}
.take {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.admin_form {
  border: 1px solid rgb(193, 192, 192);
}
.login_container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .login_title {
    width: 100%;
    height: 60px;
    padding: 10px 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      flex-direction: row;
      .box {
        width: 40px;
        height: 40px;
        margin-top: 6px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        font-size: 20px;
        font-weight: bold;
        padding-bottom: 5px;
        margin-left: 10px;
        border-left: 1px solid #ccc;
        padding-top: 14px;
        padding-left: 10px;
      }
      .box1 {
        width: 100px;
        margin-left: 40px;
        cursor: pointer;
        img {
          width: 100%;
          margin-top: 10px;
          margin-left: 10px;
        }
      }
    }
    .right {
      display: flex;
      flex-direction: row;
      .item {
        margin-right: 60px;
        cursor: pointer;
      }
    }
  }
  .login_contant {
    position: relative;
    width: 100%;
    height: calc(100% - 60px);
    .login_img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .login_form {
      position: absolute;
      top: 50%;
      right: 30%;
      transform: translate(50%, -50%);
      min-width: 400px;
      width: 22%;
      height: 530px;
      background-color: #ffffff;
      border-radius: 11px;
      padding: 30px;
      overflow: hidden;
      .title_container {
        position: relative;
        .title {
          font-size: 24px;
          color: #1a1a1a;
          .title_name {
            margin: 0;
            font-size: 18px;
          }
        }
        .set_language {
          color: #fff;
          position: absolute;
          top: 3px;
          font-size: 18px;
          right: 0px;
          cursor: pointer;
        }
      }
      .form_fields {
        position: relative;
        width: 100%;
        overflow: hidden;
        padding: 5px 16px;
        background: #ffffff;
        border: 1px solid #e0e0e0;
        box-shadow: 0 0 14px 4px rgba(230, 229, 229, 0.5);
        border-radius: 4px 10px 10px 4px;
        i {
          position: absolute;
          top: -50%;
          left: 0;
          width: 4px;
          height: 33.3%;
          transition: top 0.2s;
          background: #f5ab1b;
          border-radius: 14px;
        }
        .b1 {
          position: absolute;
          top: 34%;
          left: 0;
          width: 100%;
          height: 1px;
          background: #e0e0e0;
          border-radius: 2px;
          margin-top: -0.5px;
        }
        .b2 {
          position: absolute;
          top: 67%;
          left: 0;
          width: 100%;
          height: 1px;
          background: #e0e0e0;
          border-radius: 2px;
          margin-top: -0.5px;
        }
        p {
          margin: 0;
          padding: 0;
          line-height: 32px;
          height: 32px;
          font-size: 12px;
          color: #666;
        }
        .show_pwd {
          position: absolute;
          right: 10px;
          top: 0;
          font-size: 16px;
          color: #889aa4;
          cursor: pointer;
          user-select: none;
        }
      }
      .control {
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color: #919191;
        .remember {
          width: 36%;
          display: flex;
          align-items: center;
          p {
            padding-left: 8px;
          }
          & > input {
            position: relative;
            width: 14px;
            height: 14px;
          }
          & > input:checked::before {
            content: "\2713";
            background-color: #f5ab1b;
            position: absolute;
            top: 0;
            left: 0px;
            padding-left: 1.5px;
            width: 100%;
            height: 100%;
            border: 1px solid #f5ab1b;
            border-radius: 2px;
            font-size: 12px;
            color: white;
            font-weight: bold;
          }
        }
      }
      .login_btn {
        width: 130px;
        height: 40px;
        background: #f5ab1b;
        border: none;
        border-radius: 10px;
        font-size: 16px;
        color: #ffffff;
        text-align: center;
      }
      .register_btn {
        line-height: 32px;
        height: 32px;
        font-size: 14px;
        color: rgb(130, 130, 130);
      }
    }
    .register_form {
      position: absolute;
      top: 50%;
      right: 30%;
      transform: translate(50%, -50%);
      min-width: 400px;
      width: 22%;
      height: 550px;
      background-color: #ffffff;
      border-radius: 11px;
      padding: 30px;
      overflow: hidden;
      .title_container {
        position: relative;
        .title {
          font-size: 24px;
          color: #1a1a1a;
          .title_name {
            margin: 0;
            font-size: 18px;
          }
        }
        .set_language {
          color: #fff;
          position: absolute;
          top: 3px;
          font-size: 18px;
          right: 0px;
          cursor: pointer;
        }
      }
      .form_fields {
        position: relative;
        width: 100%;
        overflow: hidden;
        padding: 5px 16px;
        background: #ffffff;
        border: 1px solid #e0e0e0;
        box-shadow: 0 0 14px 4px rgba(230, 229, 229, 0.5);
        border-radius: 4px 10px 10px 4px;
        i {
          position: absolute;
          top: -50%;
          left: 0;
          width: 4px;
          height: 25%;
          transition: top 0.2s;
          background: #f5ab1b;
          border-radius: 14px;
        }
        .b1 {
          position: absolute;
          top: 25%;
          left: 0;
          width: 100%;
          height: 1px;
          background: #e0e0e0;
          border-radius: 2px;
          margin-top: -0.5px;
        }
        .b2 {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 1px;
          background: #e0e0e0;
          border-radius: 2px;
          margin-top: -0.5px;
        }
        .b3 {
          position: absolute;
          top: 75%;
          left: 0;
          width: 100%;
          height: 1px;
          background: #e0e0e0;
          border-radius: 2px;
          margin-top: -0.5px;
        }
        p {
          margin: 0;
          padding: 0;
          line-height: 32px;
          height: 32px;
          font-size: 12px;
          color: #666;
        }
        .show_pwd {
          position: absolute;
          right: 10px;
          top: 0;
          font-size: 16px;
          color: #889aa4;
          cursor: pointer;
          user-select: none;
        }
      }
      .control {
        width: 100%;
        height: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .login_btn {
        width: 130px;
        height: 40px;
        background: #f5ab1b;
        border: none;
        border-radius: 10px;
        font-size: 16px;
        color: #ffffff;
        text-align: center;
      }
      .register_btn {
        line-height: 32px;
        height: 32px;
        font-size: 14px;
        color: rgb(130, 130, 130);
      }
    }
  }
}
</style>
