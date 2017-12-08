<template>
	<div class="resetPsd">
		<div v-if="showTip" class="tipBox">
			修改密码完成
		</div>
		<div class="forgetCenter">
			<h5>修改密码</h5>
			<p class="label">新密码</p>
			<input v-model="passwords" type="password" placeholder="您的新密码" class="text"/>
			<p class="label">新密码确认</p>
			<input v-model="pwdSure" type="password" placeholder="确认您的新密码" class="text"/>
			<p class="error">{{errorText}}</p>
			<input type="button" class="button" value="保存" @click="reset"/>
		</div>
	</div>
</template>

<script>
export default {
  name: 'resetPsd',
  data () {
    return {
      passwords: '',
      pwdSure: '',
      errorText: '',
      showTip: false
    }
  },
  methods: {
    reset () {
      if (this.passwords.length < 5) {
        this.errorText = '密码长度不能少于5位'
      } else if (this.pwdSure !== this.passwords) {
        this.errorText = '两次输入密码不一致'
      } else {
        this.axios.post('/uaa/api/account/change_password', {password: this.pwdSure}).then(res => {
          this.showTip = true
          setTimeout(() => {
            this.showTip = false
          }, 3000)
        })
      }
    }
  }
}
</script>

<style scoped>
	.resetPsd{
		width: 98%;
		margin:0 auto;
		border:1px solid #cfcfcf;
		height: 100%;
		overflow: hidden;
		border-radius: 5px;
		background: #FFFFFF;
		min-height: 500px;
	}
	.forgetCenter{
		width:100%;
		padding:20px 20%;
		background: #ffffff;
	}
	.forgetCenter h5{
		font-size: 30px;
		line-height: 40px;
	}
	.forgetInfo{
		width:100%;
		line-height: 60px;
		background-color: #fcf8e3;
    	border:1px solid #faf2cc;
    	color: #8a6d3b;
    	padding-left:30px;
    	border-radius: 5px;
    	margin:10px 0;
	}
	.label{
		line-height: 40px;
	}
	.text{
		display: block;
		width:100%;
		height:38px;
		border:1px solid #dddddd;
		border-radius: 3px;
		padding-left:10px;
	}
	.button{
		color: #fff;
    	background-color: #00c1de;
    	border:1px solid #00c1de;
    	display: block;
    	font-size: 14px;
    	border-radius: 3px;
    	padding:8px 15px;
    	cursor: pointer;
    	margin-top:20px;
	}
	.error{
		font-size: 12px;
		color:red;
		line-height: 16px;
		margin-top:10px;
	}
	.tipBox{
		width:200px;
		background: #00C1DE;
		border-radius: 3px;
		color:#ffffff;
		text-align: center;
		line-height: 60px;
		position: fixed;
		top:50px;
		left:50%;
		margin-left: -100px;
		z-index: 99999;
		font-size: 14px;
	}
</style>