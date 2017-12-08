<template>
  <div class="Home">
  	<h5>进制转换器</h5>
  	<ul @touchend='touchEnd' @touchstart='touchStart' class="showCount">
  		<li :class="{'active' : item.tabOn, 'fontSize' : item.font}" @click="statusOn(index)" v-for="(item, index) in showList">{{item.value}}<span v-if="item.value === ''">{{item.placehoder}}</span></li>
  	</ul>
  	<ul class="code clear">
  		<li @click="putIn(index)" :class="!item.undisable ? 'disable' : ''" v-for="(item, index) in codeList">{{item.val}}</li>
  	</ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      showList: [{'tabOn': true, 'value': '', 'placehoder': '请输入二进制数', 'font': false}, {'tabOn': false, 'value': '', 'placehoder': '请输入十进制数', 'font': false}, {'tabOn': false, 'value': '', 'placehoder': '请输入十六进制数', 'font': false}],
      codeList: [
                  {'val': 'c', 'undisable': false},
                  {'val': 'd', 'undisable': false},
                  {'val': 'e', 'undisable': false},
                  {'val': 'f', 'undisable': false},
                  {'val': '8', 'undisable': false},
                  {'val': '9', 'undisable': false},
                  {'val': 'a', 'undisable': false},
                  {'val': 'b', 'undisable': false},
                  {'val': '4', 'undisable': false},
                  {'val': '5', 'undisable': false},
                  {'val': '6', 'undisable': false},
                  {'val': '7', 'undisable': false},
                  {'val': '0', 'undisable': true},
                  {'val': '1', 'undisable': true},
                  {'val': '2', 'undisable': false},
                  {'val': '3', 'undisable': false},
                ]
    }
  },
  methods: {
  	touchStart (e) {
  	  this.clientXStart = e.changedTouches[0].clientX
  	},
  	touchEnd (e) {
  	  this.clientXEnd = e.changedTouches[0].clientX
  	  var touchMove = this.clientXEnd - this.clientXStart
  	  console.log(touchMove)
  	  if (touchMove > 10) {
  	  	for (var i = 0; i < this.showList.length; i++) {
          this.showList[i].value = ''
        }
  	  	this.showList[0].font = false
  	  } else if (touchMove < -10) {
  	    this.delet()
  	    if (this.showList[0].value.length < 23) {
          this.showList[0].font = false
        }
  	  } else {
  	    return
  	  }
  	},
    statusOn (inx) {
      for (var i = 0; i < this.showList.length; i++) {
        this.showList[i].tabOn = false
      }
      this.showList[inx].tabOn = true
      if (inx === 0) {
        for (var j = 0; j < this.codeList.length; j++) {
          this.codeList[j].undisable = false
	      }
        this.codeList[12].undisable = true
        this.codeList[13].undisable = true
      } else if(inx === 1) {
        for (var j = 0; j < this.codeList.length; j++) {
          this.codeList[j].undisable = true
	      }
        this.codeList[0].undisable = false
        this.codeList[1].undisable = false
        this.codeList[2].undisable = false
        this.codeList[3].undisable = false
        this.codeList[6].undisable = false
        this.codeList[7].undisable = false
      } else if(inx === 2) {
        for (var j = 0; j < this.codeList.length; j++) {
          this.codeList[j].undisable = true
	      }
      }
    },
    putIn (inx) {
      this.showList[0].value = this.showList[0].value + ''
      this.showList[1].value = this.showList[1].value + ''
      this.showList[2].value = this.showList[2].value + ''
      if (this.showList[0].value.length > 23) {
        this.showList[0].font = true
      }
      if (this.codeList[inx].undisable === true && this.showList[0].value.length < 32) {
        if (this.showList[0].tabOn === true) {
          this.showList[0].value += this.codeList[inx].val
          this.showList[1].value = parseInt(this.showList[0].value,2)
          this.showList[2].value = (this.showList[1].value).toString(16)
        } else if (this.showList[1].tabOn === true) {
          this.showList[1].value += this.codeList[inx].val
          this.showList[0].value = (+ this.showList[1].value).toString(2)
          this.showList[2].value = (+ this.showList[1].value).toString(16)
        } else if (this.showList[2].tabOn === true) {
          this.showList[2].value += this.codeList[inx].val
          this.showList[1].value = parseInt(this.showList[2].value,16)
          this.showList[0].value = (+ this.showList[1].value).toString(2)
        }
      } else {
        return
      }
    },
    delet () {
      this.showList[0].value = this.showList[0].value + ''
      this.showList[1].value = this.showList[1].value + ''
      this.showList[2].value = this.showList[2].value + ''
      if (this.showList[0].tabOn === true) {
        if (this.showList[0].value.length === 1) {
          this.showList[0].value = ''
          this.showList[1].value = ''
          this.showList[2].value = ''
        } else if (this.showList[0].value.length > 1) {
	        this.showList[0].value = (this.showList[0].value).substring(0, this.showList[0].value.length - 1)
		      this.showList[1].value = parseInt(this.showList[0].value,2)
		      this.showList[2].value = (this.showList[1].value).toString(16)
        }
        
	    } else if (this.showList[1].tabOn === true) {
	    	if (this.showList[1].value.length === 1) {
          this.showList[0].value = ''
          this.showList[1].value = ''
          this.showList[2].value = ''
        } else if (this.showList[1].value.length > 1) {
	        this.showList[1].value = (this.showList[1].value).substring(0, this.showList[1].value.length - 1)
		      this.showList[0].value = (+ this.showList[1].value).toString(2)
		      this.showList[2].value = (+ this.showList[1].value).toString(16)
        }
	      
	    } else if (this.showList[2].tabOn === true) {
	    	if (this.showList[2].value.length === 1) {
          this.showList[0].value = ''
          this.showList[1].value = ''
          this.showList[2].value = ''
        } else if (this.showList[2].value.length > 1) {
          this.showList[2].value = (this.showList[2].value).substring(0, this.showList[2].value.length - 1)
	        this.showList[1].value = parseInt(this.showList[2].value,16)
	        this.showList[0].value = (+ this.showList[1].value).toString(2)
        }
	    	
	    } else {
	      return
	    }
    }
  }
}
</script>

<style scoped>
	.Home{
		width:100%;
		height:100%;
    margin: 0px auto;
    font-size: 16px;
    box-sizing: border-box;
    padding-top: 50px;
	}
	.clear:after{
		display:block;
		clear:both;
		content:"";
		visibility:hidden;
		height:0;
	}
	.clear{
		zoom:1;
	}
	.info{
		font-size: 12px;
		width:80%;
		margin:20px auto;
		text-align: right;
		color:#d9d9d9;
	}
	.fontSize{
	  font-size: 14px!important;
	}
	h5{
		font-size: 16px;
		color:#ffffff;
		text-align: center;
		font-weight: lighter;
	}
	.showCount{
		width:90%;
    margin: 20px auto;
	}
	.showCount li{
		border-radius: 0px;
		border:1px solid #000000;
    color: #d9d9d9;
    height:50px;
    line-height: 48px;
    margin-bottom: 10px;
    width:100%;
    box-sizing: border-box;
    position: relative;
    padding:0 3px;
    font-size: 20px;
	}
	.showCount li span{
		display: block;
		width:200px;
		height:50px;
		position: absolute;
		left:0;
		top:0;
		font-size: 12px;
		line-height: 48px;
		padding-left:5px;
		color:#d9d9d9;
	}
	.code{
		width:90%;
    margin: 10px auto;
	}
	.code li{
		margin: 1%;
    width: 22.2%;
    border: 1px solid #0d0d0d;
    height: 55px;
    border-radius: 4px;
    color: #d9d9d9;
    background-color: #1a1a1a;
    cursor: pointer;
    outline: none;
    float: left;
    text-align: center;
    line-height: 55px;
	}
	.active{
		border:1px solid #3385ff!important;
		box-shadow: 0 0 3px #3385ff!important;
	}
	.disable{
		background:rgba(26,26,26,.2)!important;
	}
</style>
