<template>
	<div class="page" v-if="pager">
		<div>
			<button @click="pre"><i class="iconfont icon-fanyezuo"></i></button>
			<span>{{current}}/{{totalPage}}</span>
			<button @click="next"><i class="iconfont icon-fanyeyou"></i></button>
			<input type="text" name="page" v-model="page">
			<button @click="goPage">跳转</button></div>
		</div>
</template>

<script>
export default {
  name: 'pager',
  props: ['pager'],
  data () {
    return {
      page: 1
    }
  },
  computed: {
    current () {
      return this.pager.page + 1
    },
    totalPage () {
      if (this.pager.totalCount <= this.pager.size) {
        return 1
      }
      return Math.ceil(this.pager.totalCount / this.pager.size)
    }
  },
  methods: {
    pre () {
      if (this.current <= 1) {
        return
      }
      this.$emit('loadPage', this.pager.page - 1)
      this.page = this.current
    },
    next () {
      if (this.current < this.totalPage) {
        this.$emit('loadPage', this.pager.page + 1)
        this.page = this.current
      }
    },
    goPage () {
      if (parseInt(this.page) <= 1) {
        this.$emit('loadPage', 0)
      } else if (parseInt(this.page) >= this.totalPage) {
        this.$emit('loadPage', this.totalPage - 1)
      } else {
        this.$emit('loadPage', this.page - 1)
      }
      this.page = this.current
    }
  }
}
</script>

<style scoped lang="scss">
.page{
	height: 60px;
  // border-bottom: 1px solid #e7e7eb;
	div{
		width: 100%;
		text-align: right;	
  	input{
  		width: 70px;
  		border: 1px solid #e7e7eb;
  		margin: 13px 0 13px 10px;
  		height: 30px;
  		text-align: center;
      border-radius: 3px;
      color: #666;
  	}
  	span{
  		margin-left: 10px;
      color: #666;
      font-size: 12px;
  	}
  	>button{
  		margin: 13px 0;
  		outline:none;
  		background-color: #f7f7f7;
  		border-radius: 3px;
  		border: 1px solid #e7e7eb;
  		color: #666666;
  		height: 30px;
  		width: 30px;
  		margin-left: 10px;
  		line-height: 20px;
  		text-align: center;
      color: #999;
      cursor: pointer;
  		&:last-child {
  			width: 46px;
  			margin-right: 20px;
        color: #666;
        font-size: 12px;
  		}
      &:hover{
        background-color: #fff;
      }
  		i{
  		  font-size: 10px;
  		}
  	}
	}
}
</style>