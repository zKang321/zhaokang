<template>
	<div class="home">
		<div class="select-box">
			<div class="select-tip">
				<div @click.stop="showSaleState">
					<span class="saleTip">{{saleTip}}</span><span class="iconfont icon-xialajiantouxiangxia jiantou"></span>
				</div>
				<ul v-if="saleTipTurn" class="saleState">
					<li @click="changeSaleState('吴泾满天星生活广场')">吴泾满天星生活广场</li>
					<li @click="changeSaleState('浦江满天星生活广场')">浦江满天星生活广场</li>
					<li @click="changeSaleState('马桥满天星')">马桥满天星</li>
				</ul>
			</div>
		</div>
		<div class="table-box">
			<div class="table-list">
				<p class="table-title">出租率</p>
				<div v-if="mallId == 1 || mallId == 2" class="table-content">
					<span :class="mall.rentRateLv > 0 ? 'tip' : 'tip tipOn'">{{mall.rentRateLv}}%</span>
					<p>{{mall.rentRate * 100}}%</p>
				</div>
			</div>
			<div class="table-list">
				<p class="table-title">出租面积</p>
				<div v-if="mallId == 1 || mallId == 2" class="table-content">
					<p>{{mall.rentedArea}}<span>m2</span></p>
				</div>
			</div>
			<div class="table-list">
				<p class="table-title">平均租金</p>
				<div v-if="mallId == 1 || mallId == 2" class="table-content">
					<span :class="mall.avgRentLv > 0 ? 'tip' : 'tip tipOn'">{{mall.avgRentLv}}%</span>
					<p>{{mall.avgRent}}<span>元/m2</span></p>
				</div>
			</div>
			<div class="table-list">
				<p class="table-title">收缴率</p>
				<div v-if="mallId == 1 || mallId == 2" class="table-content">
					<span :class="mall.payRateLv > 0 ? 'tip' : 'tip tipOn'">{{mall.payRateLv}}%</span>
					<p>{{mall.payRate}}%</p>
				</div>
			</div>
		</div>
		<div class="home-bottom clear">
			<div class="home-left">
				<div class="table-list">
					<p class="table-title">栋详情</p>
					<table class="home-table" cellspacing="0" cellpadding="0">
						<tr>
							<th>栋号</th>
							<th>出租率(%)</th>
							<th>租金(元/m2)</th>
							<th>收缴率(%)</th>
							<th>商机意向(%)</th>
						</tr>
						<tr v-for="(item, index) in building">
							<td>{{item.areaName}}</td>
							<td>{{item.rentRate}}<span v-if="item.rentRateUp" class="iconfont icon-shang icon-up-default"></span><span v-if="item.rentRateDown" class="iconfont icon-shang-copy icon-up-red"></span></td>
							<td>{{item.avgRent}}<span v-if="item.avgRentUp" class="iconfont icon-shang icon-up-default"></span><span v-if="item.avgRentDown" class="iconfont icon-shang-copy icon-up-red"></span></td>
							<td>{{item.payRate}}<span v-if="item.payRateUp" class="iconfont icon-shang icon-up-default"></span><span v-if="item.payRateDown" class="iconfont icon-shang-copy icon-up-red"></span></td>
							<td>{{item.intentionRate * 100}}</td>
						</tr>
					</table>
				</div>
				<div class="table-list">
					<p class="table-title">层详情</p>
					<table class="home-table" cellspacing="0" cellpadding="0">
						<tr>
							<th>层号</th>
							<th>出租率(%)</th>
							<th>租金(元/m2)</th>
							<th>收缴率(%)</th>
							<th>商机意向(%)</th>
						</tr>
						<tr v-for="(item, index) in floor">
							<td>{{item.areaName}}</td>
							<td>{{item.rentRate}}<span v-if="item.rentRateUp" class="iconfont icon-shang icon-up-default"></span><span v-if="item.rentRateDown" class="iconfont icon-shang-copy icon-up-red"></span></td>
							<td>{{item.avgRent}}<span v-if="item.avgRentUp" class="iconfont icon-shang icon-up-default"></span><span v-if="item.avgRentDown" class="iconfont icon-shang-copy icon-up-red"></span></td>
							<td>{{item.payRate}}<span v-if="item.payRateUp" class="iconfont icon-shang icon-up-default"></span><span v-if="item.payRateDown" class="iconfont icon-shang-copy icon-up-red"></span></td>
							<td>{{item.intentionRate * 100}}</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="home-right clear">
				<div class="charts-box">
					<vue-highcharts  v-if="mallId == 1 || mallId == 2" :options="options" ref="lineCharts"></vue-highcharts>
				</div>
				<div class="charts-table">
					<table class="home-table" cellspacing="0" cellpadding="0">
						<tr>
							<th>业态</th>
							<th>平均租金</th>
						</tr>
						<tr v-if="mallId == 1 || mallId == 2" v-for="(item, index) in chartsData">
							<td>{{item.industryText}}</td>
							<td>{{item.averageRent}}元/m2/天</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import VueHighcharts from 'vue2-highcharts'
let asyncData = {
  name: 'series',
  data: []
}
export default {
  name: 'home',
  data () {
    return {
      options: {
        chart: {
          type: 'pie',
          animation: false
        },
        colors: ['#f279b0', '#79d2f2', '#f2ee79', '#cc79f2', '#79f2a8', '#f28579'],
        title: {
          text: ''
        },
        tooltip: {
        },
        plotOptions: {
          pie: {
            showInLegend: true,
            dataLabels: {
              enabled: false
            }
          }
        },
        legend: {
          align: 'center',
          verticalAlign: 'top',
          borderWidth: 0
        },
        series: []
      },
      saleTipTurn: false,
      saleTip: '吴泾满天星生活广场',
      mall: [],
      mallId: 1,
      building: [],
      floor: [],
      chartsData: []
    }
  },
  components: {VueHighcharts},
  created () {
    this.$root.$on('menuClose', res => {
      this.saleTipTurn = false
    })
  },
  mounted () {
    this.getData()
    this.getBuilding()
    this.getFloor()
    this.getChartsData()
  },
  methods: {
    load () {
      asyncData = {}
      let lineCharts = this.$refs.lineCharts
      asyncData.data = this.optionData
      lineCharts.removeSeries(asyncData)
      lineCharts.addSeries(asyncData)
    },
    changeSaleState (str) {
      this.saleTip = str
      this.saleTipTurn = false
      if (this.saleTip === '吴泾满天星生活广场') {
        this.mallId = 1
      } else if (this.saleTip === '浦江满天星生活广场') {
        this.mallId = 2
      } else if (this.saleTip === '马桥满天星') {
        this.mallId = 3
      }
      this.getData()
      this.getBuilding()
      this.getFloor()
      this.getChartsData()
    },
    showSaleState () {
      this.saleTipTurn = true
    },
    getData () {
      this.axios.get('/saa/api/area-aggrs/scope', {params: {aggregateScope: 'MALL', mallId: this.mallId}}).then(res => {
        console.log(res.data)
        res.data[0].rentRateLv = (res.data[0].rentRate * 100 - res.data[0].rentRateRef * 100).toFixed(2)
        res.data[0].avgRentLv = (res.data[0].avgRent - res.data[0].avgRentRef).toFixed(2)
        res.data[0].payRateLv = ((res.data[0].payRate - res.data[0].payRateRef) * 100).toFixed(2)
        res.data[0].payRate = (res.data[0].payRate * 100).toFixed(2)
        this.mall = res.data[0]
      })
    },
    getChartsData () {
      this.axios.get('/bdm/api/shop-managements/industrySummarys/' + this.mallId).then(res => {
        var optionData = []
        for (var i = 0; i < res.data.length; i++) {
          var dataDouble = []
          if (res.data[i].industry === 'CSE') {
            res.data[i].industryText = '娱乐'
          } else if (res.data[i].industry === 'FOOD') {
            res.data[i].industryText = '餐饮'
          } else if (res.data[i].industry === 'LIFE') {
            res.data[i].industryText = '生活配套'
          } else if (res.data[i].industry === 'BDUCATION') {
            res.data[i].industryText = '亲子教育'
          } else if (res.data[i].industry === 'RETAIL') {
            res.data[i].industryText = '零售'
          } else if (res.data[i].industry === 'REAL_ESTATE') {
            res.data[i].industryText = '房地产'
          }
          dataDouble.push(res.data[i].industryText)
          dataDouble.push(res.data[i].actualQuantity)
          optionData.push(dataDouble)
        }
        this.optionData = optionData
        this.load()
        console.log(optionData)
        this.chartsData = res.data
      })
    },
    getBuilding () {
      this.axios.get('/saa/api/area-aggrs/scope', {params: {aggregateScope: 'BUILDING', mallId: this.mallId}}).then(res => {
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].payRate !== 0) {
            res.data[i].payRate = (res.data[i].payRate * 100).toFixed(1)
          }
          res.data[i].rentRate = (res.data[i].rentRate * 100).toFixed(1)
          if ((res.data[i].rentRate / 100 - res.data[i].rentRateRef) > 0) {
            res.data[i].rentRateUp = true
            res.data[i].rentRateDown = false
          } else if ((res.data[i].rentRate / 100 - res.data[i].rentRateRef) < 0) {
            res.data[i].rentRateUp = false
            res.data[i].rentRateDown = true
          } else {
            res.data[i].rentRateUp = false
            res.data[i].rentRateDown = false
          }
          if ((res.data[i].avgRent - res.data[i].avgRentRef) > 0) {
            res.data[i].avgRentUp = true
            res.data[i].avgRentDown = false
          } else if ((res.data[i].avgRent - res.data[i].avgRentRef) < 0) {
            res.data[i].avgRentUp = false
            res.data[i].avgRentDown = true
          } else {
            res.data[i].avgRentUp = false
            res.data[i].avgRentDown = false
          }
          if ((res.data[i].payRate - res.data[i].payRateRef) < 0) {
            res.data[i].payRateUp = true
            res.data[i].payRateDown = false
          } else if ((res.data[i].payRate - res.data[i].payRateRef) > 0) {
            res.data[i].payRateUp = false
            res.data[i].payRateDown = true
          } else {
            res.data[i].payRateUp = false
            res.data[i].payRateDown = false
          }
        }
        this.building = res.data
      })
    },
    getFloor () {
      this.axios.get('/saa/api/area-aggrs/scope', {params: {aggregateScope: 'FLOOR', mallId: this.mallId}}).then(res => {
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].payRate !== 0) {
            res.data[i].payRate = (res.data[i].payRate * 100).toFixed(1)
          }
          res.data[i].rentRate = (res.data[i].rentRate * 100).toFixed(1)
          if ((res.data[i].rentRate / 100 - res.data[i].rentRateRef) > 0) {
            res.data[i].rentRateUp = true
            res.data[i].rentRateDown = false
          } else if ((res.data[i].rentRate / 100 - res.data[i].rentRateRef) < 0) {
            res.data[i].rentRateUp = false
            res.data[i].rentRateDown = true
          } else {
            res.data[i].rentRateUp = false
            res.data[i].rentRateDown = false
          }
          if ((res.data[i].avgRent - res.data[i].avgRentRef) > 0) {
            res.data[i].avgRentUp = true
            res.data[i].avgRentDown = false
          } else if ((res.data[i].avgRent - res.data[i].avgRentRef) < 0) {
            res.data[i].avgRentUp = false
            res.data[i].avgRentDown = true
          } else {
            res.data[i].avgRentUp = false
            res.data[i].avgRentDown = false
          }
          if ((res.data[i].payRate - res.data[i].payRateRef) < 0) {
            res.data[i].payRateUp = true
            res.data[i].payRateDown = false
          } else if ((res.data[i].payRate - res.data[i].payRateRef) > 0) {
            res.data[i].payRateUp = false
            res.data[i].payRateDown = true
          } else {
            res.data[i].payRateUp = false
            res.data[i].payRateDown = false
          }
        }
        this.floor = res.data
      })
    },
    checkNumber (num) {
      num = num + ''
      console.log(num.indexOf('.'))
      if (num.indexOf('.') > 0) {
        num = num.substring(num.indexOf('.'), num.length)
        return num.length
      } else {
        return 0
      }
    }
  }
}
</script>

<style scoped>
	.home{
		width: 98%;
		margin:0 auto;
		border:1px solid #cfcfcf;
		height: 100%;
		overflow: hidden;
		border-radius: 5px;
		background: #FFFFFF;
		min-height: 800px;
		padding:20px;
	}
	.select-box{
		width:100%;
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
		margin:0 auto;
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
	.table-box{
		width:100%;
		height:170px;
		margin-top:20px;
	}
	.table-list{
		height:168px;
		width:calc(25% - 25px);
		float: left;
		border:1px solid rgba(0,0,0,.125);
		margin:0 12.5px;
		border-radius: 3px;
	}
	.table-list .table-title{
		height:42px;
		background: #f7f7f9;
		text-align: center;
		line-height: 42px;
		border-bottom:1px solid rgba(0,0,0,.125);
	}
	.table-content{
		padding-top:60px;
		position: relative;
	}
	.table-content p{
		text-align: center;
		font-size: 40px;
		line-height: 40px;
	}
	.table-content p span{
		font-size: 12px;
	}
	.table-content .tip{
		display: block;
		position: absolute;
		right:20px;
		top:25px;
		padding:3px;
		background:#5cb85c;
		color:#ffffff;
		font-size: 12px;
		line-height: 12px;
		border-radius: 3px;
	}
	.tipOn{
		background: #d9534f!important;
	}
	.home-bottom{
		margin-top:20px;
	}
	.home-left{
		width:calc(50% - 12.5px);
		float: left;
	}
	.home-left .table-list{
		float: none;
		width:calc(100% - 12.5px);
		margin-bottom: 20px;
		height:auto;
	}
	.home-table{
		width:100%;
	}
	.home-table th{
		font-weight: lighter;
		font-size: 15px;
		padding:6px 0px;
		text-align: center;
		background: #f1f1f1;
	}
	.home-table td{
		font-size: 15px;
		padding:6px 0px;
		text-align: center;
		border-bottom: 1px solid #eeeeee;
	}
	.home-table tr:last-child td{
		border-bottom: none;
	}
	.home-table tr td:first-child{
		font-weight: bold;
	}
	.charts-table .home-table tr td:first-child{
		font-weight: lighter;
	}
	.icon-up-default{
		color:#5cb85c;
	}
	.icon-up-red{
		color:#d9534f;
	}
	.home-right{
		width:calc(50% - 25px);
		float: left;
		border:1px solid rgba(0,0,0,.125);
		border-radius: 3px;
		margin-left:25px;
	}
	.charts-box{
		width:50%;
		float: left;
		overflow: hidden;
		min-height: 100px;
	}
	.charts-table{
		width:50%;
		float: left;
	}
</style>