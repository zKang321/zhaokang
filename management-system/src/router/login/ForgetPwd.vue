<template>
	<div class="forget">
		<div class="ribbon">
			Development
		</div>
		<div v-if="showTip" class="tipBox">
			电子邮箱未注册
		</div>
		<div class="forgetCenter">
			<h5>重置您的密码</h5>
			<div class="forgetInfo">
				请输入您邮件地址
			</div>
			<p class="label">电子邮件</p>
			<input v-model="mail" type="text" placeholder="您的电子邮件" class="text"/>
			<p class="error">{{errorText}}</p>
			<input type="button" class="button" value="重置密码" @click="reset"/>
		</div>
	</div>
</template>

<script>
export default {
  name: 'forget',
  data () {
    return {
      mail: '',
      errorText: '',
      showTip: false
    }
  },
  mounted () {
  },
  methods: {
    reset () {
      if (this.mail === '') {
        this.errorText = '请输入您的电子邮件'
      } else if (this.mail.length < 5) {
        this.errorText = '电子邮件的长度不能少于5位'
      } else {
        this.errorText = ''
        this.axios.post('/uaa/api/account/reset_password/init', {mail: this.mail}).then(res => {
          console.log('111')
        }).catch(error => {
          console.log(error.response.data)
          this.showTip = true
          this.errorFade()
        })
      }
    },
    errorFade () {
      setTimeout(() => {
        this.hideFade()
      }, 3000)
    },
    hideFade () {
      this.showTip = false
    }
  }
}
</script>

<style scoped>
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
	.forget{
		width:100%;
		height:100%;
		background: #e5e5e5;
		padding-top:20px;
	}
	.forgetCenter{
		width:100%;
		padding:20px 20%;
		background: #ffffff;
		border-top: 1px solid #cfcfcf;
		border-bottom: 1px solid #cfcfcf;
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