<template>
	<div class="login">
		<div class="ribbon">
			Development
		</div>
		<img class="login-bg" src="../../assets/back2.png"/>
		<div class="yunwuLogo">
			<img class="login-bg" src="../../assets/logo.png"/>
		</div>
		<div class="login-box">
			<h5>登陆</h5>
			<div class="login-content">
				<p>手机号</p>
				<input placeholder="请输入手机号" v-model="login.user" type="text" class="input"/>
				<p>密码</p>
				<input placeholder="请输入密码" v-model="login.psw" type="password" class="input"/>
				<div class="login-info clear">
					<div class="login-check">
						<span :class="state ? 'checkedOn' : ''" v-on:click="alocked"/>
						<p>记住密码</p>
					</div>
					<p @click="goForget" class="forget-psd">忘记密码？</p>	
				</div>
				<div class="error">{{showError}}</div>
				<input class="buttonLogin" type="button" @click="loginSubmit" value="登陆" />
			</div>
		</div>
	</div>
</template>

<script>
import UserService from '../../service/UserService'
export default {
  name: 'login',
  data () {
    return {
      state: false,
      login: {
        user: '',
        psw: ''
      },
      showError: ''
    }
  },
  mounted () {
    this.login.user = localStorage.getItem('login.user')
    this.login.psw = localStorage.getItem('login.psw')
  },
  methods: {
    goForget () {
      console.log('1')
      this.$router.push({path: '/forget', name: 'forget'})
    },
    alocked () {
      this.state = !this.state
    },
    async loginSubmit () {
      if (this.login.user === '' || this.login.psw === '') {
        this.showError = '请输入用户名或者密码！'
      } else {
        UserService.login(this.login).then(res => {
          this.showError = ''
          if (this.state) {
            localStorage.setItem('login.psw', this.login.psw)
            localStorage.setItem('login.user', this.login.user)
          }
          this.$router.push({path: '/main/home'})
          sessionStorage.setItem('login', this.login.user)
        }).catch(error => {
          console.log(error)
          this.showError = '用户名或者密码错误！'
        })
      }
    }
  }
}
</script>

<style>
	.ribbon {
	    background-color: rgba(170, 0, 0, 0.5);
	    left: -3.5em;
	    moz-transform: rotate(-45deg);
	    ms-transform: rotate(-45deg);
	    o-transform: rotate(-45deg);
	    webkit-transform: rotate(-45deg);
	    transform: rotate(-45deg);
	    overflow: hidden;
	    position: absolute;
	    top: 40px;
	    white-space: nowrap;
	    width: 15em;
	    z-index: 9999;
	    pointer-events: none;
	    opacity: 0.75;
	    z-index: 999999999;
	    text-align: center;
	    color:#ffffff;
	    height:2.8rem;
	    line-height: 2.8rem;
	}
	.login{
		width:100%;
		height:100%;
		position: relative;
	}
	.login-bg{
		display: block;
		float: left;
		width:100%;
		height:100%;
	}
	.yunwuLogo{
		position: absolute;
		top:100px;
		left:50%;
		margin-left:-90px;
		width:180px;
		height:auto;
	}
	.login-box{
		position: absolute;
		left:50%;
		margin-left:-250px;
		width:500px;
		min-height: 100px;
		background: #ffffff;
		border:1px solid #dddddd;
		border-radius: 5px;
		top:170px;
	}
	.login-box h5{
		width:100%;
		height:60px;
		font-size: 22px;
		color:#666666;
		line-height: 60px;
		text-align: center;
		border-bottom: 1px solid #dddddd;
	}
	.login-content{
		padding:20px;
		padding-top:0px;
	}
	.login-content p{
		margin-bottom: 10px;
		margin-top:20px;
	}
	.login-content input{
		display: block;
		width:100%;
		height:38px;
		border:1px solid #dddddd;
		line-height: 38px;
		border-radius: 3px;
		padding-left:10px;
	}
	.login-check{
		float: left;
		height:14px;
	}
	.login-check span{
		display: block;
		float: left;
		width:14px;
		height:14px;
		margin-top:20px;
		background: url(../../assets/box-no-checked.png) no-repeat center;
	}
	.login-check .checkedOn{
		background: url(../../assets/box-checked.png) no-repeat center;
	}
	.login-check p{
		height:14px;
		display: block;
		float: left;
		font-size: 14px;
		line-height: 14px;
		margin-top:20px;
		margin-left:5px;
	}
	.forget-psd{
		cursor: pointer;
		float: right;
		font-size: 14px;
		line-height: 14px;
		margin-top:20px;
	}
	.buttonLogin{
		display: block;
		margin:10px auto 0px;
		background-color:#00c1de;
		color:#ffffff;
		cursor: pointer;
		border:1px solid #00c1de;
	}
	.error{
		font-size: 12px;
		color:red;
		line-height: 25px;
	}
</style>