<template>
	<div class="loading"><img src="./loading.gif"  alt=""><span>{{loadingWord}}</span></div>
</template>

<script>
export default {
    name: 'loading',
    props:{
    	loadingWord:{
    		type:String
    	}
    } ,
    data () {
        return {

    	};
  	}
};
</script>

<style lang="scss" scoped>
	.loading{
		text-align: center;
		z-index: 100;
		width: 100%;
		height:0.2rem;
		line-height: 0.2rem;				
		img{
			margin: 0 auto;
			width: 0.2rem;
			height: 0.2rem;
			vertical-align: middle;
		}
		span{
			vertical-align: middle;
			margin-left: 0.14rem;
		
		}
	}
</style>