<template>
	<div class="mallEidit">
		<div class="detail-head">
			<router-link class="button" :to="{path: '/main/mall'}">
				商圈列表
		    </router-link>
		    <span>/</span>新建商圈
		</div>
		<div class="editCenter">
			<ul class='tab'>
				<li @click="tabChange(index)" v-for="(item, index) in tab" :class="item.status ? 'tabActive' : ''">{{item.text}}</li>
			</ul>
			<ul class='content'>
				<li>
					<h5><i class="iconfont icon-cooperate"></i>商圈合作信息</h5>
					<table border="0" cellspacing="0" cellpadding="0" class="formTable">
						<tr>
							<th>合同起止日期</th>
							<td>
								<div class="date-box">
									<date-picker :date="startTime" @change="getStartDate" :option="option"></date-picker>
									<span class="date-line">-</span>
									<date-picker :date="endTime" @change="getEndDate" :option="option"></date-picker>
								</div>
							</td>
							<th>合作模式</th>
							<td>
								<label @click="changeR1"><span :class="radioTab1 ? 'on' : 'radio'"></span>委托经营</label>  
    							<label @click="changeR2" style="margin-left:20px;"><span :class="radioTab2 ? 'on' : 'radio'"></span>承租</label>
							</td>
						</tr>
						<tr>
							<th>商圈主题描述</th>
							<td><textarea v-model="textVal" class="textArea"></textarea></td>
						</tr>
					</table>
				</li>
				<li>
					<h5><i class="iconfont icon-ren"></i>商圈负责人信息</h5>
					<table border="0" cellspacing="0" cellpadding="0" class="formTable">
						<tr>
							<th>商圈负责人</th>
							<td><input v-model="name" type="text" class="input"/></td>
							<th>职位</th>
							<td><input v-model="job" disabled="disabled" type="text" class="input"/></td>
						</tr>
						<tr>
							<th>负责人电话</th>
							<td><input v-model="phone" disabled="disabled" type="text" class="input"/></td>
							<th>负责人邮箱</th>
							<td><input v-model="mail" disabled="disabled" type="text" class="input"/></td>
						</tr>
					</table>
				</li>
				<li>
					<h5><i class="iconfont icon-xinxi"></i>商圈基础信息</h5>
					<table border="0" cellspacing="0" cellpadding="0" class="formTable">
						<tr>
							<th>商圈名称</th>
							<td><input v-model="name1" type="text" class="input"/></td>
							<th>商圈代码</th>
							<td><input v-model="name2" type="text" class="input"/></td>
						</tr>
						<tr>
							<th>业态范围</th>
							<td><input v-model="name3" type="text" class="input"/></td>
							<th>建筑面积(㎡)</th>
							<td><input v-model="name4" type="text" class="input"/></td>
						</tr>
						<tr>
							<th>开发商名</th>
							<td><input v-model="name5" type="text" class="input"/></td>
							<th>占地面积(㎡)</th>
							<td><input v-model="name6" type="text" class="input"/></td>
						</tr>
						<tr>
							<th>竣工日期</th>
							<td class="data"><date-picker :date="endedTime" @change="getEndedTime" :option="option"></date-picker></td>
							<th>商业面积(㎡)</th>
							<td><input v-model="name7" type="text" class="input"/></td>
						</tr>
						<tr>
							<th>绿地面积(㎡)</th>
							<td><input v-model="name8" type="text" class="input"/></td>
							<th>邮政编码</th>
							<td><input v-model="name9" type="text" class="input"/></td>
						</tr>
						<tr>
							<th>总铺位位数</th>
							<td><input v-model="name10" type="text" class="input"/></td>
							<th>商圈地址</th>
							<td>
								<select @change="change1(addrProvince)" class="select" v-model="addrProvince">
									<option v-for="(item, index) in address" :value="item.code">{{item.address}}</option>
								</select>
								<select @change="change2(addrCity)" class="select" v-model="addrCity">
									<option v-for="(item, index) in address2" :value="item.code">{{item.name}}</option>
								</select>
								<select class="select" v-model="addrDistrict">
									<option v-for="(item, index) in address3" :value="item.code">{{item.name}}</option>
								</select>
								<input v-model="ads" type="text" class="input adsInput"/>
							</td>
						</tr>
						<tr>
							<th>商圈描述</th>
							<td><textarea v-model="name12" class="textArea"></textarea></td>
						</tr>
					</table>
				</li>
			</ul>
			<div class="btn-box">
				<input @click="save" type="button" class="button1" value="保存" />
				<input @click="cancel" type="button" class="button1" value="取消" />
			</div>
		</div>
	</div>
</template>

<script>
import myDatepicker from 'vue-datepicker'
export default {
  name: 'mallEidit',
  data () {
    return {
      option: {
        type: 'day',
        week: ['一', '二', '三', '四', '五', '六', '日'],
        month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        format: 'YYYY-MM-DD',
        placeholder: '',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '30px',
          'font-size': '12px',
          'border': '1px solid #d7d8d9',
          'border-radius': '3px',
          'color': '#666666',
          'width': '165px',
          'height': '35px'
        },
        color: {
          header: '#ccc',
          headerText: '#f00'
        },
        buttons: {
          ok: '确认',
          cancel: '取消'
        },
        overlayOpacity: 0.5,
        dismissible: true
      },
      startTime: {
        time: ''
      },
      endTime: {
        time: ''
      },
      endedTime: {
        time: ''
      },
      radioTab1: true,
      radioTab2: false,
      detail: [],
      person: [],
      textVal: '',
      name: '',
      job: '',
      phone: '',
      mail: '',
      addrProvince: '',
      address: [],
      address2: [],
      address3: [],
      ads: '',
      addrCity: '',
      addrDistrict: '',
      tab: [{'text': '商圈基础信息', 'status': true}, {'text': '商圈楼层列表', 'status': false}, {'text': '铺位列表', 'status': false}]
    }
  },
  components: {'date-picker': myDatepicker},
  mounted () {
    this.getDetail()
    this.getperson()
  },
  methods: {
    save () {
      var obj = this.detail
      obj.code = this.name2
      obj.contractStartDate = this.startTime.time
      obj.contractEndDate = this.endTime.time
      obj.cooperationMode = this.cooperationMode
      obj.themeDesc = this.textVal
      obj.picName = this.name
      obj.name = this.name1
      obj.industry = this.name3
      obj.buildingArea = this.name4
      obj.builder = this.name5
      obj.area = this.name6
      obj.businessArea = this.name7
      obj.greenArea = this.name8
      obj.addrPostcode = this.name9
      obj.numberOfShops = this.name10
      obj.desc = this.name12
      obj.buildCompleteDate = this.endedTime.time
      obj.addrProvince = this.addrProvince
      obj.addrCity = this.addrCity
      obj.addrDistrict = this.addrDistrict
      obj.addrAddress = this.ads
      console.log(obj)
      this.axios.put('/bdm/api/business-districts', obj).then(res => {
        this.$router.push({path: '/main/mall'})
      })
    },
    change1 (val) {
      console.log(val)
      this.addrProvince = val
      this.addrCity = -1
      this.getAddress()
    },
    change2 (val) {
      console.log(val)
      this.addrCity = val
      this.getAddress()
    },
    getStartDate () {
      this.startTime.time = this.startTime.time + ''
    },
    getEndDate () {
      this.endTime.time = this.endTime.time + ''
    },
    getEndedTime () {
      this.endedTime.time = this.endedTime.time + ''
    },
    cancel () {
      this.$router.push({path: '/main/mall'})
    },
    tabChange (inx) {
      for (var i = 0; i < this.tab.length; i++) {
        this.tab[i].status = false
      }
      this.tab[inx].status = true
    },
    changeR1 () {
      this.radioTab1 = true
      this.cooperationMode = 'CONSING'
      this.radioTab2 = false
    },
    changeR2 () {
      this.radioTab2 = true
      this.cooperationMode = 'LEASEHOLD'
      this.radioTab1 = false
    },
    getDetail () {
      this.axios.get('/bdm/api/business-districts/' + this.$route.query.mallId).then(res => {
        console.log(res.data)
        this.startTime.time = res.data.contractStartDate
        this.endTime.time = res.data.contractEndDate
        this.textVal = res.data.themeDesc
        this.name = res.data.picName
        this.name1 = res.data.name
        this.name2 = res.data.code
        this.name3 = res.data.industry
        this.name4 = res.data.buildingArea
        this.name5 = res.data.builder
        this.name6 = res.data.area
        this.endedTime.time = res.data.buildCompleteDate
        this.name7 = res.data.businessArea
        this.name8 = res.data.greenArea
        this.name9 = res.data.addrPostcode
        this.name10 = res.data.numberOfShops
        this.name11 = res.data.name
        this.name12 = res.data.desc
        this.addrProvince = res.data.addrProvince
        this.addrCity = res.data.addrCity
        this.addrDistrict = res.data.addrDistrict
        this.ads = res.data.addrAddress
        if (res.data.cooperationMode === 'CONSING') {
          this.radioTab1 = true
          this.cooperationMode = 'CONSING'
          this.radioTab2 = false
        } else if (res.data.cooperationMode === 'LEASEHOLD') {
          this.radioTab2 = true
          this.cooperationMode = 'LEASEHOLD'
          this.radioTab1 = false
        }
        this.detail = res.data
        this.getAddress()
      })
    },
    getperson () {
      this.axios.get('/uaa/api/users/finduser/' + this.$route.query.picStaffId).then(res => {
        console.log(res.data)
        this.phone = res.data.telephone
        this.mail = res.data.email
        this.job = res.data.roles[0].name
        this.person = res.data
      })
    },
    getAddress () {
      this.axios.get('/bdm/api/district-codes').then(res => {
        console.log(res.data)
        this.address = res.data
        this.axios.get('/bdm/api/district-codes?parentId=' + this.addrProvince).then(res => {
          console.log(res.data)
          this.address2 = res.data
          this.axios.get('/bdm/api/district-codes?parentId=' + this.addrCity).then(res => {
            console.log(res.data)
            this.address3 = res.data
          })
        })
      })
    }
  }
}
</script>

<style scoped>
	.select{
		width:80px;
		height:35px;
		border:1px solid #dddddd;
		border-radius: 3px;
	}
	.adsInput{
		width:150px!important;
	}
	.data input{
		width:300px!important;
	}
	.radio{
		display: inline-block;
		width:12px;
		height:12px;
		margin-right: 5px;
		border:1px solid #bbbbbb;
		border-radius: 12px;
		background: #eeeeee;
	}
	.on{
		display: inline-block;
		width:12px;
		height:12px;
		margin-right: 5px;
		background: url(../../../assets/checked.png) no-repeat center;
		border:none;
		border-radius: 12px;
	}
	.date-box{
		width:350px;
	}
	.btn-box{
		width:500px;
		margin:20px auto;
		height:40px;
	}
	.btn-box input:first-child{
		float: left;
	}
	.btn-box input:last-child{
		float: right;
	}
	.button1{
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
	.editCenter{
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
	.detail-head{
		padding:15px;
		font-size: 16px;
		border-radius: 3px;
		padding-top:0px;
	}
	.detail-head span{
		margin:0 8px;
	}
	.detail-head .button{
		color:#00c1de;
	}
	.detail-head .button:hover{
		text-decoration: underline;
	}
	.tab{
		width:100%;
		height:38px;
	}
	.tab li{
		height:35px;
		float: left;
		width:120px;
		color: #00c1de;
    	background-color:#fff;
    	line-height: 35px;
    	border-radius: 3px;
    	font-size: 16px;
    	cursor: pointer;
    	text-align: center;
	}
	.tab .tabActive{
		color: #ffffff;
    	background-color:#00c1de;
	}
	.content h5{
		font-size: 18px;
		color:#333333;
		line-height: 18px;
		padding-bottom: 20px;
		padding-top: 20px;
		border-bottom: 1px solid #eeeeee;
	}
	.content h5 i{
		font-size: 20px;
		font-weight: bold;
		margin-right:5px;
	}
	.formTable{
		width:100%;
	}
	.formTable th{
		font-size: 16px;
		padding:15px 0px;
		text-align: right;
		width:20%;
		color:#333333;
		font-weight: lighter;
		padding-right:20px;
	}
	.formTable td{
		font-size: 16px;
		padding:15px 0px;
		text-align: left;
		color:#777777;
		width:30%;
	}
	.input{
		width:350px;
		height:35px;
		border:1px solid #dddddd;
		border-radius: 3px;
		padding:0 5px;
	}
	.textArea{
		width:350px;
		height:100px;
		border:1px solid #dddddd;
		border-radius: 3px;
		padding:5px;
	}
</style>