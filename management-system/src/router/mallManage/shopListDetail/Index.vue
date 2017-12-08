<template>
	<div class="shopListDetail">
		<h2>{{shopDetail.shopName}}</h2>
		<ul class="detail-content">
			<li>
				<span class="list-label">合同编号:</span>
				<span class="list-content">{{shopDetail.contractNo}}</span>
			</li>
			<li>
				<span class="list-label">商圈:</span>
				<span class="list-content">{{shopDetail.mallName}}</span>
			</li>
			<li>
				<span class="list-label">详细地址:</span>
				<span class="list-content">{{shopDetail.address}}</span>
			</li>
			<li>
				<span class="list-label">铺位编号:</span>
				<span style="width:1000px;" class="list-content">{{shopDetail.positionNum}}</span>
			</li>
			<li>
				<span class="list-label">商铺名称:</span>
				<span class="list-content">{{shopDetail.shopName}}</span>
			</li>
			<li>
				<span class="list-label">商铺业态:</span>
				<span class="list-content">{{shopDetail.industryName}}</span>
			</li>
			<li>
				<span class="list-label">营业类型:</span>
				<span class="list-content"></span>
			</li>
			<li>
				<span class="list-label">商铺logo:</span>
				<span class="list-content"><img class="logoImg" :src="shopDetail.logo"/></span>
			</li>
			
			<li>
				<span class="list-label">商铺图片:</span>
				<span class="list-content"><img class="logoImg" v-for="(item, index) in shopDetail.shopImages" :src="item.imageUrl"/></span>
			</li>
			<li>
				<span class="list-label">客服电话:</span>
				<span class="list-content">{{shopDetail.serviceHotline}}</span>
			</li>
			<li>
				<span class="list-label">商铺介绍:</span>
				<span class="list-content">{{shopDetail.introduction}}</span>
			</li>
		</ul>
		<router-link class="button" :to="{path: '/main/shopList'}">
			返回
		</router-link>
	</div>
</template>

<script>
export default {
  name: 'shopListDetail',
  data () {
    return {
      shopDetail: []
    }
  },
  mounted () {
    this.getShopDetail()
  },
  methods: {
    getShopDetail () {
      this.axios.get('/obs/api/shop/' + this.$route.query.shopId).then(res => {
        console.log(res.data)
        this.shopDetail = res.data
      })
    }
  }
}
</script>

<style scoped>
	.shopListDetail{
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
	.shopListDetail h2{
		border-bottom: 1px solid #dddddd;
		padding-bottom: 15px;
		color:#333333;
	}
	.detail-content{
		padding-top:10px;
	}
	.detail-content li{
		padding:15px 0px;
	}
	.detail-content li:after{
		display:block;
		clear:both;
		content:"";
		visibility:hidden;
		height:0;
	}
	.detail-content span{
		line-height: 20px;
	}
	.logoImg{
		width:90px;
		height:auto;
		margin-right:20px;
	}
	.list-label{
		margin-right:15px;
		color:#333333;
		display: block;
		float: left;
		width:100px;
		text-align: right;
	}
	.list-content{
		color:#666666;
		display: block;
		float: left;
	}
	.button{
		display: block;
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
	    margin-left:30px;
	    margin-top:10px;
	    margin-bottom: 10px;
	}
</style>