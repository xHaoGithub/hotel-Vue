<template>
    <div class="login_container">
      <div class="login_box">
        <!-- 头像区域 -->
        <div class="avatar_box">
          <img src="../assets/logo.jpg" alt="">
        </div>
        <!-- 登录表单 -->
        <el-form label-width="0px" class="login_form" :model="loginform" :rules="loginFormrules" ref="loginFormRef">
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input prefix-icon="iconfont icon-luogu" placeholder="请输入用户名"
                      v-model="loginform.username"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input prefix-icon="iconfont icon-fudai" placeholder="请输入密码"
                      v-model="loginform.password" type="password"></el-input>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary" round @click="login">登录</el-button>
            <el-button type="info" round @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
export default {
  name: 'login',
  data: function () {
    return {
      // 登录表单的数据绑定对象
      loginform: {
        username: 'admin',
        password: '123456'
      },
      loginFormrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return true
        }
        const { data: result } = await this.$http.post('/hotel/login', this.loginform)
        if (result.success.status !== '200') {
          return this.$message.error(result.success.msg)
        }
        this.$message.success('恭喜你,登录成功!')
        // 1. 登录成功之后的 token, 保存到客户端的 sessionStorage 中
        //  1.1 项目中除了登录的其他 API 接口,必须在登录之后才可以访问
        //  1.2 token 只应在当前网站打开期间生效, 所以将 token 保存在 sessionStorage 中
        console.log(result)
        window.sessionStorage.setItem('token', result.data.token)
        // 通过编程式导航跳转到后台主页, 路由地址是 /home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login_container {
    background-image: url("../assets/background.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 100%;
  }
  .login_box {
    width: 450px;
    height: 300px;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #dddddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }

</style>
