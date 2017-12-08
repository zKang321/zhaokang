<template>
	<div class="taskDetail">
		<div v-if="beforePage === 'myTask'" class="detail-head">
			<router-link class="button" :to="{path: '/main/myTask'}">
				我的任务
		    </router-link>
		    <span>/</span>审批
		</div>
		<div v-if="beforePage === 'launched'" class="detail-head">
			<router-link class="button" :to="{path: '/main/launched'}">
				我发起的
		    </router-link>
		    <span>/</span>查看
		</div>
		<ul class='tab'>
			<li @click="tabChange(index)" v-for="(item, index) in tab" :class="item.status ? 'tabActive' : ''">{{item.text}}</li>
		</ul>
		<div v-if="tab[0].status" class="detail-center">
			<ul class="detail-list">
				<li>
					<h5><i class="iconfont icon-shanghu"></i>商户基础信息</h5>
					<table border="0" cellspacing="0" cellpadding="0" class="detail-table">
						<tr>
							<th>证件类型:</th>
							<td>{{detail.certificateType}}</td>
							<th>证件号码:</th>
							<td>{{detail.certificateCode}}</td>
						</tr>
						<tr>
							<th>商户性质:</th>
							<td>{{detail.partyType}}</td>
							<th>承租方:</th>
							<td>{{detail.name}}</td>
						</tr>
						<tr>
							<th>网址:</th>
							<td>{{detail.homepage}}</td>
							<th>地址:</th>
							<td>{{detail.address}}</td>
						</tr>
						<tr>
							<th>注册资本:</th>
							<td>{{detail.registeredCapital}}</td>
							<th>法人:</th>
							<td>{{detail.legalPerson}}</td>
						</tr>
						<tr>
							<th>营业执照:</th>
							<td>
								<img class="img" v-if="detail.tenantNo" src="detail.tenantNo"/>
								<div v-else="detail.tenantNo" class="imgnull">
									暂无图片
								</div>
							</td>
						</tr>
					</table>
				</li>
				<li>
					<h5><i class="iconfont icon-pinpai"></i>品牌信息</h5>
					<table border="0" cellspacing="0" cellpadding="0" class="detail-table">
						<tr>
							<th>商铺名称:</th>
							<td>{{detail2.shopName}}</td>
							<th>业态:</th>
							<td>{{detail2.industry}}</td>
						</tr>
						<tr>
							<th>经营品牌:</th>
							<td>{{detail2.brandName}}</td>
							<th>经营业务:</th>
							<td>{{detail2.business}}</td>
						</tr>
						<tr>
							<th>品牌简介:</th>
							<td>{{detail2.introduction}}</td>
							<th>主营产品:</th>
							<td>{{detail2.mainProduct}}</td>
						</tr>
					</table>
				</li>
				<li>
					<h5><i class="iconfont icon-zulin"></i>租赁业务信息</h5>
					<table border="0" cellspacing="0" cellpadding="0" class="detail-table">
						<tr>
							<th>承租方名称:</th>
							<td>{{detail.name}}</td>
							<th>房屋坐落(铺位编号):</th>
							<td>{{detail4.shops[0].serialNum}}</td>
						</tr>
						<tr>
							<th>保证金:</th>
							<td>{{detail4.deposit}}</td>
							<th>建筑面积(㎡):</th>
							<td>{{detail4.shops[0].buildingArea}}</td>
						</tr>
						<tr>
							<th>付款周期:</th>
							<td>{{detail4.paymentPeriod}}个月</td>
							<th>合同起止时间:</th>
							<td>{{detail4.contractStart}}~{{detail4.contractEnd}}</td>
						</tr>
						<tr>
							<th>平均租金指导价:</th>
							<td>{{detail4.shops[0].exceptedRent}}元/㎡/天</td>
							<th>房屋交付时间:</th>
							<td>{{detail4.handoverDay}}</td>
						</tr>
						<tr>
							<th>经营方式:</th>
							<td>{{detail4.leaseMode}}</td>
							<th></th>
							<td></td>
						</tr>
						<tr>
							<th>租赁费用计算表:</th>
							<td colspan="2">
								<p v-for="(item, index) in detail3">
									第{{index + 1}}阶段 {{item.periodStart}} ~ {{item.periodEnd}}，租金{{item.rent}}(元/㎡/天)，物业费{{item.pmFee}}(元/㎡/月)
								</p>
							</td>
							<th></th>
							<td></td>
						</tr>
					</table>
				</li>
			</ul>
		</div>
		<div v-if="tab[1].status" class="liuchengtu">
			<img src="../../../assets/07d54eb9-53ee-4bd1-805d-81534520fde5.png"/>
		</div>
		<div v-if="tab[2].status" class="info">
			<table border="0" cellspacing="0" cellpadding="0" class="detail-table">
				<tr>
					<th>节点名称:</th>
					<td>修改合同</td>
					<th>节点状态:</th>
					<td>待办</td>
				</tr>
				<tr>
					<th>创建人:</th>
					<td>Administrator</td>
					<th>操作人:</th>
					<td>Administrator</td>
				</tr>
				<tr>
					<th>开始时间:</th>
					<td>2017-07-20</td>
					<th>到期时间:</th>
					<td></td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
export default {
  name: 'taskDetail',
  data () {
    return {
      tab: [{'text': '合同详情', 'status': true}, {'text': '流程图', 'status': false}, {'text': '节点信息', 'status': false}],
      detail: [],
      detail2: [],
      detail3: [],
      detail4: [],
      beforePage: ''
    }
  },
  mounted () {
    this.getdetail()
  },
  methods: {
    tabChange (inx) {
      for (var i = 0; i < this.tab.length; i++) {
        this.tab[i].status = false
      }
      this.tab[inx].status = true
    },
    getdetail () {
      this.beforePage = this.$route.query.status
      console.log(this.beforePage)
      this.axios.get('bdm/api/leads/' + this.$route.query.businessId).then(res => {
        console.log(res.data)
        if (res.data.leasebusiness.tenantInfo.certificateType === 'ORGANIZATION_CODE') {
          res.data.leasebusiness.tenantInfo.certificateType = '组织机构代码证'
        } else if (res.data.leasebusiness.tenantInfo.certificateType === 'ID_CARD') {
          res.data.leasebusiness.tenantInfo.certificateType = '身份证'
        }
        if (res.data.leasebusiness.tenantInfo.partyType === 'INDIVIDUAL') {
          res.data.leasebusiness.tenantInfo.partyType = '个体工商户'
        }
        if (res.data.leasebusiness.tenantInfo.tenantBrand.industry === 'FOOD') {
          res.data.leasebusiness.tenantInfo.tenantBrand.industry = '餐饮'
        }
        this.detail = res.data.leasebusiness.tenantInfo
        this.detail2 = res.data.leasebusiness.tenantInfo.tenantBrand
        for (var i = 0; i < res.data.leasebusiness.shopRents.length; i++) {
          res.data.leasebusiness.shopRents[i].periodStart = res.data.leasebusiness.shopRents[i].periodStart.substring(0, 10)
          res.data.leasebusiness.shopRents[i].periodEnd = res.data.leasebusiness.shopRents[i].periodEnd.substring(0, 10)
        }
        this.detail3 = res.data.leasebusiness.shopRents
        res.data.leasebusiness.contractStart = res.data.leasebusiness.contractStart.substring(0, 10)
        res.data.leasebusiness.contractEnd = res.data.leasebusiness.contractEnd.substring(0, 10)
        res.data.leasebusiness.handoverDay = res.data.leasebusiness.handoverDay.substring(0, 10)
        if (res.data.leasebusiness.leaseMode === 'LEASE') {
          res.data.leasebusiness.leaseMode = '自营'
        }
        this.detail4 = res.data.leasebusiness
      })
    }
  }
}
</script>

<style scoped>
	.taskDetail{
		width: 98%;
		margin:0 auto;
		border:1px solid #cfcfcf;
		height: 100%;
		overflow: hidden;
		border-radius: 5px;
		background: #FFFFFF;
		min-height: 100px;
		padding:20px;
	}
	.detail-head{
		padding:15px;
		background:#e5e5e5;
		font-size: 16px;
		border-radius: 3px;
	}
	.detail-head .button{
		color:#00c1de;
	}
	.detail-head .button:hover{
		text-decoration: underline;
	}
	.detail-head span{
		margin:0 8px;
	}
	.tab{
		width:100%;
		height:38px;
		margin:20px 0px;
	}
	.tab li{
		height:35px;
		float: left;
		width:80px;
		color: #00c1de;
    	background-color:#fff;
    	line-height: 35px;
    	border-radius: 3px;
    	font-size: 14px;
    	cursor: pointer;
    	text-align: center;
	}
	.tab .tabActive{
		color: #ffffff;
    	background-color:#00c1de;
	}
	.detail-center{
		width:100%;
		min-height: 100px;
		border:1px solid #dddddd;
		border-radius: 6px;
		padding:20px;
	}
	.detail-list li{
		width:100%;
		min-height: 100px;
		border:1px solid #dddddd;
		border-radius: 3px;
		margin-bottom: 20px;
	}
	.detail-list li h5{
		padding:15px 20px;
		background: #f5f5f5;
		font-size: 16px;
		color:#777777;
		line-height: 16px;
		border-bottom: 1px solid #dddddd;
	}
	.detail-list li h5 i{
		font-size: 18px;
		margin-right:5px;
		font-weight: bold;
		color:#333333;
	}
	.detail-table{
		width:100%;
		padding:0 20%;
		box-sizing: border-box;
		font-size: 16px;
	}
	.detail-table th{
		padding: 20px 0;
		width:150px;
		text-align: right;
		box-sizing: border-box;
		font-weight: lighter;
		color:#333333;
	}
	.detail-table td{
		padding: 20px 15px;
		text-align: left;
		box-sizing: border-box;
		color:#999999;
	}
	.detail-table td p{
		line-height: 26px;
	}
	.img{
		display: block;
		width:80px;
		height:80px;
	}
	.imgnull{
		display: block;
		width:80px;
		height:80px;
		background: #eeeeee;
		text-align: center;
		line-height: 80px;
		font-size: 14px;
	}
	.liuchengtu img{
		display: block;
		width:800px;
	}
</style>