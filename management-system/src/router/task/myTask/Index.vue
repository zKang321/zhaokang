<template>
	<div class="myTask">
		<h2>我的任务</h2>
		<div class="list-head">
			<p>标题</p>
			<p>事项名称</p>
			<p>流程节点</p>
			<p>来源</p>
			<p>创建人</p>
			<p>操作人</p>
			<p>任务到达时间</p>
		</div>
		<ul class="list-shop">
			<li v-for="(item, index) in shopList">
				<p>{{item.title}}</p>
				<p>{{item.processName}}</p>
				<p>{{item.name}}</p>
				<p>{{item.sourceName}}</p>
				<p>{{item.processStarter}}</p>
				<p>{{item.assignee}}</p>
				<p>{{item.createTime}}</p>
				<p>
					<router-link class="button" :to="{path: '/main/taskDetail', query: {businessId: item.businessId, status: 'myTask'}}">
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
  name: 'myTask',
  data () {
    return {
      pager: {
        page: 0,
        size: 15,
        totalCount: 0
      },
      shopList: []
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
      this.axios.get('/bdm/api/tasks', {params: {page: this.pager.page, size: 15, sort: 'createTime,desc'}}).then(res => {
        this.pager.totalCount = res.headers['x-total-count']
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].createTime = this.checkDate(res.data[i].createTime)
        }
        this.shopList = res.data
      })
    },
    checkDate (dateVal) {
      dateVal = dateVal.replace('T', ' ')
      dateVal = dateVal.substring(0, 19)
      return dateVal
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
	.myTask{
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
	.myTask h2{
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
		width:10%;
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
		width:15%;
		padding-left:20px;
	}
	.list-head p:nth-child(5){
		width:12%;
		padding-left:20px;
	}
	.list-head p:nth-child(6){
		width:12%;
		padding-left:20px;
	}
	.list-head p:nth-child(7){
		width:20%;
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
		width:10%;
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
		width:15%;
		padding-left:20px;
	}
	.list-shop li p:nth-child(5){
		width:12%;
		padding-left:20px;
	}
	.list-shop li p:nth-child(6){
		width:12%;
		padding-left:20px;
	}
	.list-shop li p:nth-child(7){
		width:20%;
		padding-left:20px;
	}
	.list-shop li p:nth-child(8) .button{
		margin-top:12px;
		height:35px;
		line-height: 35px;
	} 
</style>