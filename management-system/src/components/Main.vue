<template>
<div class="main" @click="hideSecond">
	<div class="ribbon">
		Development
	</div>
	<div class="left-nav">
		<div class="logo-box">
			<img src="../assets/logo.png"/>
		</div>
		<ul>
	      <li v-for="(item, index) in firstMenu">
	      	<div v-if="item.sec && item.secondMenu.length > 0" class="center-nav">
				<div class="second-nav">
					<div @click="secondTabSwitch(index, secindex)" v-for="(item, secindex) in item.secondMenu"><span>{{item.title}}</span></div>
				</div>
			</div>
	        <router-link :to="{path: item.url}" @click.stop.native="tabSwitch(index)" :class="{'tab-active': tabStatus === index}">{{item.name}}<i v-if="index !== 0" class="iconfont icon-xialajiantouxiangxia marginLeft"></i></router-link>
	      </li>
		</ul>
	</div>
	<div class="right-content">
		<div class="router-view">
			<router-view></router-view>
		</div>
	</div>
	<div class="footer">
		<p>版权所有 ©云悟科技 联系我们：<a href="mailto:pm@yunwutechccom">pm@yunwutechccom</a></p>
	</div>
</div>
</template>

<script>
import UserService from '../service/UserService'
export default {
  name: 'main',
  data () {
    return {
      isAdmin: false,
      userId: sessionStorage.getItem('login'),
      secondTabStatus: 0,
      tabStatus: 0,
      firstMenu: [{
        name: '首页',
        url: '/main/home',
        secondMenu: []
      }, {
        name: '任务管理',
        secondMenu: [{title: '我的任务', path: '/main/myTask'}, {title: '已办事项', path: '/main/doTask'}, {title: '我发起的', path: '/main/launched'}, {title: '全部流程', path: '/main/allProcess'}]
      }, {
        name: '商圈管理',
        secondMenu: [{title: '商圈列表', path: '/main/mall'}]
      }, {
        name: '招商管理',
        secondMenu: []
      }, {
        name: '运营管理',
        secondMenu: []
      }, {
        name: '合同管理',
        secondMenu: []
      }, {
        name: '财务管理',
        secondMenu: []
      }, {
        name: '报表管理',
        secondMenu: []
      }, {
        name: '设置',
        secondMenu: []
      }, {
        name: '管理',
        secondMenu: []
      }, {
        name: '网络商铺管理',
        secondMenu: [{title: '商铺管理', path: '/main/shopList'}]
      }, {
        name: '你好',
        secondMenu: [{title: '密码', path: '/main/resetPsd'}, {title: '退出', path: '/'}]
      }],
      sec: false
    }
  },
  computed: {
  },
  created () {
    this.tabStatus = sessionStorage.tabStatus - 0 || 0
    this.defaultShop = sessionStorage.defaultShop - 0 || 0
    this.secondTabStatus = sessionStorage.secondTabStatus - 0 || 0
  },
  beforeRouteUpdate (to, from, next) {
    for (let i = 0; i < this.firstMenu.length; i++) {
      if (this.firstMenu[i].url && this.firstMenu[i].url.split('/')[2] === to.name) {
        this.tabStatus = i
        break
      }
    }
    next()
  },
  methods: {
    getAccount () {
      this.axios.get('/uaa/api/account').then(res => {
        this.account = res.data
        this.firstMenu[11].name = this.account.name + '，你好'
        if (res.data.authorities.indexOf('ROLE_OBSADMIN') >= 0) {
          this.isAdmin = true
        }
      })
    },
    tabSwitch (index) {
      this.tabStatus = index
      sessionStorage.tabStatus = index
      sessionStorage.removeItem('secondTabStatus')
      this.secondTabStatus = 0
      for (var i = 0; i < this.firstMenu.length; i++) {
        this.firstMenu[i].sec = false
      }
      this.firstMenu[index].sec = true
    },
    secondTabSwitch (index, secindex) {
      sessionStorage.secondTabStatus = this.secondTabStatus = index
      console.log(this.firstMenu[index].secondMenu[secindex].path)
      this.$router.push({path: this.firstMenu[index].secondMenu[secindex].path})
      sessionStorage.tabStatus = this.tabStatus = ''
      for (var i = 0; i < this.firstMenu.length; i++) {
        this.firstMenu[i].sec = false
      }
      if (index === 11 && secindex === 1) {
        UserService.logout()
      }
    },
    hideSecond () {
      sessionStorage.tabStatus = this.tabStatus = ''
      for (var i = 0; i < this.firstMenu.length; i++) {
        this.firstMenu[i].sec = false
      }
      this.$root.$emit('menuClose', false)
    }
  },
  mounted () {
    this.getAccount()
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
	.main{
		width: 100%;
		min-width: 1100px;
		min-height: 100%;
		background: #e5e5e5;
	}
	.left-nav{
		width:100%;
		background: #2b3245;
		display: flex;
		padding-left:30px;
	}
	.logo-box{
		width:150px;
		height:80px;
		float: left;
	}
	.logo-box img{
		margin-top:14px;
		margin-left:15px;
	}
	.left-nav>ul{
		float: left;
		flex: 1;
	}
	.left-nav>ul>li{
		line-height: 16px;
		padding:30px 0px;
		text-align: center;
		position: relative;
		float: left;
		width:8%;
		position: relative;
	}
	.left-nav>ul>li>div{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		cursor: not-allowed;
	}
	.left-nav>ul>li>a{
		display: block;
		height: 100%;
		color: #cccccc;
		font-size: 14px;
		text-decoration: none;
		border-left: 2px solid transparent;
	}
	.left-nav>ul>li>.tab-active{
		color: white;
	}
	.center-nav{
		width: 180px!important;
		height:auto!important;
		background: white;
		border: 1px solid #e7e7eb;
		position: absolute;
		z-index: 999;
		left:-14%!important;
		top:60px!important;
		border-radius: 5px;
	}
	.firstNav-title{
		line-height: 48px;
		border-bottom: 1px solid #E7E7EB;
		text-align: center;
		font-size: 14px;
		color: #333;
	}
	.second-nav>div{
		line-height: 40px;
		font-size: 14px;
		color: #666666;
		text-align: center;
		position: relative;
		cursor: pointer;
	}
	.second-nav>div:hover{
		background: #f1f1f1;
	}
	.second-nav>.menuChecked{
		background: #f8f8f8;
	}
	.router-view{
		height: calc(100% - 50px);
		padding-top: 16px;
	}
	.footer{
		width:100%;
		height:70px;
		border-top:1px solid rgba(0,0,0,.125);
		margin-top:30px;
	}
	.footer p{
		font-size: 16px;
		text-align: center;
		line-height: 70px;
	}
	.footer p a{
		color:#00c1de;
	}
	.footer p a:hover{
		text-decoration: underline;
	}
	.marginLeft{
		margin-left:7px;
		font-size: 10px;
	}
</style>
