<template>
  <div class="off">
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on : loginWay}" @click="loginWay=true">短信登录</a>
            <a href="javascript:;" :class="{on : !loginWay}" @click="loginWay=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <div :class="{on : loginWay}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <button :disabled="!isRightPhone" class="get_verification"
                        :class="{rightPhone:isRightPhone}" @click.prevent="getCode">
                  {{computeTime ? `已发送(${computeTime}s)` : '获取验证码'}}
                </button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on : !loginWay}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="text" maxlength="8" placeholder="密码" v-if="!showPwd" v-model="pwd" />
                  <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd" />
                  <div class="switch_button" :class="showPwd ? 'on' : 'off'" @click="showPwd=!showPwd">
                    <div class="switch_circle" :class="{right : showPwd}"></div>
                    <span class="switch_text">{{showPwd ? 'abc' : ''}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" src="http://localhost:4000/captcha"
                       @click='getCaptcha' alt="captcha" ref="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
      <AlertTip :alertText="alertText" v-show="showAlert" @closeTip="closeTip" />
    </section>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  import AlertTip from "../../components/AlertTip/AlertTip";
  import {reqLogin , reqSendCode , reqLoginSms} from '../../api'

  export default {
    name: "Login" ,
    data() {
      return {
        loginWay : true ,   // true 代表短信登录，false 代表密码登录
        computeTime : 0,    // 计时的时间
        phone : '' ,        // 手机号码
        code : '' ,         // 手机短信验证码
        captcha : '' ,      // 服务器发回的验证码
        name : '' ,         // 用户名
        buttonText : '获取验证码' ,
        showPwd : true ,      // 是否显示密码
        pwd : '' ,            // 密码
        alertText : '' ,      // 提示框信息
        showAlert : false     // 是否显示提示框
      }
    } ,
    components : {AlertTip},
    computed : {
      isRightPhone (){
        return /^1\d{10}$/.test(this.phone)
      } ,
    } ,
    methods : {
      ...mapActions(['saveUser']) ,
      // 异步获取短信验证码
      async getCode(){
        // 如果当前没有启动计时
        if(!this.computeTime){
          // 启动倒计时
          this.computeTime = 30;
          this.timer = setInterval(()=>{
            this.computeTime--;
            if(this.computeTime <= 0){
              clearInterval(this.timer)
            }
          },1000)
          // 发送Ajax 请求获取验证码
          const result = await reqSendCode(this.phone)
          if(result.code === 1){    // 发送失败
            // 显示提示
            this.showAlerts('验证码请求失败')
            // 停止倒计时
            if(this.computeTime){
              this.computeTime = 0;
              clearInterval(this.timer)
            }
          }
        }
      } ,
      showAlerts(text){
        this.showAlert = true
        this.alertText = text
      } ,
      // 前台 表单验证
      async login () {
        let result
        // 判断登录方式
        if(this.loginWay){    // 短信登陆
          let {isRightPhone, phone , code} = this;
          if(!isRightPhone){
            // 手机号不正确
            this.showAlerts('手机号不正确')
            return
          }else if(!/^\d{6}$/.test(code)) {
            // 手机验证码不正确
            this.showAlerts('手机验证码不正确')
            return
          }
          // 发送 ajax 请求短信登录
          result = await reqLoginSms(phone , code)
        } else {    // 密码登录
          let {name , pwd , captcha} = this;
          if(!name){
            // 用户名没输入
            this.showAlerts('请输入用户名！')
            return
          }else if(!pwd) {
            // 密码不正确
            this.showAlerts('请输入密码！')
            return
          }else if(!captcha){
            // 验证码格式不正确
            this.showAlerts('请输入验证码！')
            return
          }
          // 发送 ajax 请求短信登录
          result = await reqLogin({name, pwd, captcha})
        }
        // 停止倒计时
        if(this.computeTime){
          this.computeTime = 0;
          clearInterval(this.timer)
        }
        // 根据结果处理数据
        if(result.code === 0){
          const user = result.data;
          // alert('login success !')
          // 将 user 保存到 state 中
          this.saveUser(user)
          // 跳转个人中心界面
          this.$router.replace('/profile')
        } else {
          const msg = result.msg
          this.showAlerts(msg)
          // 错误自动刷新验证码
          this.getCaptcha()
          this.captcha = ''
        }
      } ,
      // 关闭警告框
      closeTip (){
        this.showAlert = false
        this.alertText = ''
      } ,
      // 获取验证码
      getCaptcha() {
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
      }
    } ,
    watch : {
      pwd : (value)=> console.log(value)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.rightPhone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
