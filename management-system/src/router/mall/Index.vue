<template>
	<div class="mall">
		<router-link class="button add" :to="{path: '/main/mallEidit'}">
			<i class="iconfont icon-xinzeng"></i>新建
	    </router-link>
		<h2>商圈管理</h2>
		<div class="list-head">
			<p>商圈名称</p>
			<p>商圈地址</p>
			<p>商圈负责人</p>
			<p>占地面积(㎡)</p>
			<p>建筑面积(㎡)</p>
			<p>绿地面积(㎡)</p>
			<p>合同起始日期</p>
			<p>合同终止日期</p>
		</div>
		<ul class="list-shop">
			<li v-for="(item, index) in shopList">
				<p>{{item.name}}</p>
				<p>{{item.addrAddress}}</p>
				<p>{{item.picName}}</p>
				<p>{{item.area}}</p>
				<p>{{item.buildingArea}}</p>
				<p>{{item.greenArea}}</p>
				<p>{{item.contractStartDate}}</p>
				<p>{{item.contractEndDate}}</p>
				<p>
					<router-link class="button" :to="{path: '/main/mallEidit', query: {mallId: item.id, picStaffId: item.picStaffId}}">
						<i class="iconfont icon-bianji"></i>编辑
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
  name: 'mall',
  data () {
    return {
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
  mounted () {
    this.getShopList()
  },
  methods: {
    getShopList (page) {
      if (page >= 0) {
        this.pager.page = page
      }
      this.axios.get('/bdm/api/business-districts', {params: {page: this.pager.page, size: 15, sort: 'id,desc'}}).then(res => {
        this.pager.totalCount = res.headers['x-total-count']
        console.log(res.data)
        this.shopList = res.data
      })
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
	.mall{
		width: 98%;
		margin:0 auto;
		border:1px solid #cfcfcf;
		height: 100%;
		overflow: hidden;
		border-radius: 5px;
		background: #FFFFFF;
		min-height: 100px;
		padding:20px;
		position: relative;
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
	.button i{
		margin-right:6px;
	}
	.mall h2{
		font-size: 16px;
		margin-bottom: 50px;
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
		width:15%;
		padding-left:20px;
	}
	.list-head p:nth-child(2){
		width:10%;
		padding-left:20px;
	}
	.list-head p:nth-child(3){
		width:10%;
		padding-left:20px;
	}
	.list-head p:nth-child(4){
		width:10%;
		padding-left:20px;
	}
	.list-head p:nth-child(5){
		width:10%;
		padding-left:20px;
	}
	.list-head p:nth-child(6){
		width:10%;
		padding-left:20px;
	}
	.list-head p:nth-child(7){
		width:12%;
		padding-left:20px;
	}
	.list-head p:nth-child(8){
		width:12%;
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
		width:15%;
		padding-left:20px;
	}
	.list-shop li p:nth-child(2){
		width:10%;
		padding-left:20px;
	}
	.list-shop li p:nth-child(3){
		width:10%;
		padding-left:20px;
	}
	.list-shop li p:nth-child(4){
		width:10%;
		padding-left:20px;
	}
	.list-shop li p:nth-child(5){
		width:10%;
		padding-left:20px;
	}
	.list-shop li p:nth-child(6){
		width:10%;
		padding-left:20px;
	}
	.list-shop li p:nth-child(7){
		width:12%;
		padding-left:20px;
	}
	.list-shop li p:nth-child(8){
		width:12%;
		padding-left:20px;
	}
	.list-shop li p:nth-child(9) .button{
		margin-top:12px;
		height:35px;
		line-height: 35px;
	} 
	.add{
		position: absolute;
		right:20px;
		top:20px;
		font-size: 14px;
		line-height: 35px;
	}
</style>