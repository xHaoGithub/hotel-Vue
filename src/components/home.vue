<template>
  <div>
    <el-button type="text" @click="loginout">退出登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    loginout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
