<template>
	<div class="shopListCont">
		<h2>网络商铺</h2>
		<div class="select">
			<input class="input" type="text" placeholder="商户(承租方) 商铺名称" v-model="shopName"/>
			<div class="select-tip">
				<div @click.stop="showSaleState">
					<span class="saleTip">{{saleTip}}</span><span class="iconfont icon-xialajiantouxiangxia jiantou"></span>
				</div>
				<ul v-if="saleTipTurn" class="saleState">
					<li @click="changeSaleState('商圈')">商圈</li>
					<li @click="changeSaleState('吴泾满天星生活广场')">吴泾满天星生活广场</li>
					<li @click="changeSaleState('浦江满天星生活广场')">浦江满天星生活广场</li>
					<li @click="changeSaleState('马桥满天星')">马桥满天星</li>
				</ul>
			</div>
			<div class="select-tip type-tip">
				<div @click.stop="showTypeState">
					<span class="saleTip">{{typeTip}}</span><span class="iconfont icon-xialajiantouxiangxia jiantou"></span>
				</div>
				<ul v-if="typeTipTurn" class="saleState">
					<li @click="changeTypeState('业态')">业态</li>
					<li @click="changeTypeState('生活配套')">生活配套</li>
					<li @click="changeTypeState('餐饮')">餐饮</li>
					<li @click="changeTypeState('零售')">零售</li>
					<li @click="changeTypeState('亲子教育')">亲子教育</li>
					<li @click="changeTypeState('娱乐')">娱乐</li>
					<li @click="changeTypeState('金融')">金融</li>
					<li @click="changeTypeState('房地产')">房地产</li>
					<li @click="changeTypeState('其他')">其他</li>
				</ul>
			</div>
			<input @click="search" type="button" class="button" value="搜索" />
		</div>
		<div class="list-head">
			<p>商铺信息</p>
			<p>商圈</p>
			<p>业态</p>
			<p>商户手机</p>
		</div>
		<ul class="list-shop">
			<li v-for="(item, index) in shopList">
				<p>{{item.shopName}}</p>
				<p>{{item.mallName}}</p>
				<p>{{item.industryText}}</p>
				<p>{{item.telPhone}}</p>
				<p>
					<router-link class="button" :to="{path: '/main/shopListDetail', query: {shopId: item.id}}">
						查看
				    </router-link>
				</p>
			</li>
		</ul>
		<pager v-on:loadPage="getShopList" :pager="pager"></pager>
	</div>
</template>

<script>
import pager from '@/components/Pager.vue'
export default {
  name: 'shopList',
  data () {
    return {
      saleTipTurn: false,
      saleTip: '商圈',
      typeTipTurn: false,
      typeTip: '业态',
      shopList: [],
      pager: {
        page: 0,
        size: 15,
        totalCount: 0
      },
      shopName: ''
    }
  },
  components: {pager},
  created () {
    this.$root.$on('menuClose', res => {
      this.saleTipTurn = false
      this.typeTipTurn = false
    })
  },
  mounted () {
    this.getShopList()
  },
  methods: {
    getShopList (page) {
      if (page >= 0) {
        this.pager.page = page
      }
      this.axios.get('/obs/api/shop/bdm', {params: {page: this.pager.page, size: 15, mallId: this.mallId, industry: this.industry, queryName: this.shopName}}).then(res => {
        this.pager.totalCount = res.headers['x-total-count']
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].industry === 'LIFE') {
            res.data[i].industryText = '生活配套'
          } else if (res.data[i].industry === 'FOOD') {
            res.data[i].industryText = '餐饮'
          } else if (res.data[i].industry === 'RETAIL') {
            res.data[i].industryText = '零售'
          } else if (res.data[i].industry === 'BDUCATION') {
            res.data[i].industryText = '亲子教育'
          } else if (res.data[i].industry === 'CSE') {
            res.data[i].industryText = '娱乐'
          } else if (res.data[i].industry === 'FINANCIAL') {
            res.data[i].industryText = '金融'
          } else if (res.data[i].industry === 'REAL_ESTATE') {
            res.data[i].industryText = '房地产'
          } else if (res.data[i].industry === 'SERVICE') {
            res.data[i].industryText = '其他'
          }
        }
        this.shopList = res.data
      })
    },
    search () {
      this.pager.page = 0
      if (this.saleTip === '商圈') {
        this.mallId = ''
      } else if (this.saleTip === '吴泾满天星生活广场') {
        this.mallId = 1
      } else if (this.saleTip === '浦江满天星生活广场') {
        this.mallId = 2
      } else if (this.saleTip === '马桥满天星') {
        this.mallId = 3
      }
      if (this.typeTip === '业态') {
        this.industry = ''
      } else if (this.typeTip === '生活配套') {
        this.industry = 'LIFE'
      } else if (this.typeTip === '餐饮') {
        this.industry = 'FOOD'
      } else if (this.typeTip === '零售') {
        this.industry = 'RETAIL'
      } else if (this.typeTip === '亲子教育') {
        this.industry = 'BDUCATION'
      } else if (this.typeTip === '娱乐') {
        this.industry = 'CSE'
      } else if (this.typeTip === '金融') {
        this.industry = 'FINANCIAL'
      } else if (this.typeTip === '房地产') {
        this.industry = 'REAL_ESTATE'
      } else if (this.typeTip === '其他') {
        this.industry = 'SERVICE'
      }
      this.getShopList()
    },
    showSaleState () {
      this.saleTipTurn = true
      this.typeTipTurn = false
    },
    showTypeState () {
      this.typeTipTurn = true
      this.saleTipTurn = false
    },
    changeSaleState (str) {
      this.saleTip = str
      this.saleTipTurn = false
    },
    changeTypeState (str) {
      this.typeTip = str
      this.typeTipTurn = false
    }
  }
}
</script>
<style type="text/css">
	.page div button:last-child{
		margin-right:0!important;
	}
	.page{
		width:290px;
		margin:0 auto;
	}
</style>
<style scoped>
	.shopListCont{
		width: 98%;
		margin:0 auto;
		border:1px solid #cfcfcf;
		height: 100%;
		overflow: hidden;
		border-radius: 5px;
		background: #FFFFFF;
		min-height: 500px;
		padding:20px;
	}
	.input{
		width:200px;
		height:38px;
		border-radius: 5px;
		border:1px solid #cccccc;
		padding:0 5px;
		font-size: 14px;
		float: left;
	}
	.select{
		height:40px;
	}
	/*下拉框样式*/
	.select-tip{
		display: block;
		width:200px;
		height:38px;
		border-radius: 5px;
		border:1px solid #cccccc;
		padding:0 5px;
		cursor: pointer;
		position: relative;
		float: left;
		margin-left:15px;
	}
	.saleTip{
		width:160px;
		float: left;
		line-height: 38px;
		font-size: 14px;
	}
	.saleState{
		z-index: 10;
		position: absolute;
		top: 38px;
		left: 0px;
		border: 1px solid #cccccc;
		box-shadow: rgba(60,60,60,.2) 0 0 3px 1px;
	}
	.saleState>li{
		width: 198px;
		font-size: 14px;
		line-height: 30px;
		padding: 0 8px;
		word-break: keep-all;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		background: #fff;
		cursor: pointer;
	}
	.saleState>li:hover{
		background: #f0f0f0;
	}
	.jiantou{
		display: block;
		float: left;
		height:38px;
		width:10px;
		line-height: 38px;
		text-align: right;
	}
	/*下拉框样式*/
	.type-tip{
		width:110px;
	}
	.type-tip .saleTip{
		width:70px;
	}
	.type-tip>.saleState>li{
		width:105px;
	}
	.button{
		display: block;
		float: left;
		color: #fff;
	    background-color: #00c1de;
	    border-color: #00c1de;
	    width: 106px;
	    height: 36px;
	    font-weight: 400;
	    line-height: 32px;
	    text-align: center;
	    border-radius: 5px;
	    box-shadow: 1px 2px 5px #dddddd;
	    cursor: pointer;
	    margin-left:15px;
	}
	.shopListCont h2{
		font-size: 16px;
		margin-bottom: 10px;
	}
	.list-head{
		background: #f1f1f1;
		width:100%;
		height:50px;
		margin-top:20px;
		border-top:1px solid #eeeeee;
		border-bottom: 1px solid #eeeeee;
	}
	.list-head p{
		display:block;
		float: left;
		font-size: 16px;
		line-height: 50px;
		color:#333333;
	}
	.list-head p:nth-child(1){
		width:25%;
		padding-left:20px;
	}
	.list-head p:nth-child(2){
		width:20%;
		padding-left:20px;
	}
	.list-head p:nth-child(3){
		width:15%;
		padding-left:20px;
	}
	.list-head p:nth-child(4){
		width:15%;
		padding-left:20px;
	}
	.list-shop{
		width:100%;
		margin-top: 5px;
		margin-bottom: 10px;
	}
	.list-shop li{
		width:100%;
		height:60px;
		border-bottom: 1px solid #dddddd;
	}
	.list-shop li p{
		float: left;
		line-height: 60px;
		display: block;
		color:#666666;
		font-size: 14px;
	}
	.list-shop li p:nth-child(1){
		width:25%;
		padding-left:20px;
	}
	.list-shop li p:nth-child(2){
		width:20%;
		padding-left:20px;
	}
	.list-shop li p:nth-child(3){
		width:15%;
		padding-left:20px;
	}
	.list-shop li p:nth-child(4){
		width:20%;
		padding-left:20px;
	}
	.list-shop li p:nth-child(5) .button{
		margin-top:12px;
		height:35px;
		line-height: 35px;
	} 
</style>