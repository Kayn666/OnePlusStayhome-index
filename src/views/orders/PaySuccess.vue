<template>
    <div>
        <div class="sucimg">
            <img src="../../assets/success.png" alt="">
            <div class="sucword">
                <span>支付</span>
                <span>成功</span>
            </div>
            <div class="sucprice">
                <span>￥  {{this.$route.query.price}}</span>
            </div>
        </div>
        <van-button plain block type="danger" @click="seeOrders">查看订单</van-button>
    </div>
</template>

<script>
    import {Button} from 'vant';
    import 'vant/lib/button/style'

    export default {
        name: "PaySuccess",
        components:{
            vanButton:Button
        },
        methods:{
            seeOrders(){
                this.$router.push({name:'orderslist',query:{type:2}})
            }
        }
    }
</script>

<style scoped>
    .sucimg{
        margin: 1rem auto;
        text-align: center;
    }
    .sucimg img{
        width: 3.5rem;
        height: auto;
        margin: 0.4rem auto;
    }
    .sucword span{
        font-size: 0.5rem;
        font-weight: bolder;
    }
    .sucword span:first-child{
        color: #555555;
    }
    .sucword span:last-child{
        color: #f8606a;
    }
    .sucprice{
        margin: 0.4rem auto;
    }
    .sucprice span{
        font-size: 0.65rem;
        font-weight: bold;
        color: #f8606a;
    }
    .van-button{
        width: 40%;
        margin: 0 auto;
        border-radius: 0.1rem;
    }
</style>