<template>
    <div>
        <div class="top">
            <i class="iconfont iconzuo" style="color: #f8606a" @click="goback"></i>
            <span>订单支付</span>
        </div>
        <div class="countdown">
            <h2>剩余支付时间</h2>
            <van-count-down :time='time'>
                <template #default="timeData">
                    <span class="block">{{ timeData.minutes }}</span>
                    <span class="colon">:</span>
                    <span class="block">{{ timeData.seconds }}</span>
                </template>
            </van-count-down>
            <p>
                <span>待支付    </span>
                <span>￥{{this.$route.query.price}}</span>
            </p>
            <div>30分钟内未支付的订单会被自动取消</div>
        </div>
        <div class="paymethod">
            <van-radio-group v-model="paymethod">
                <van-cell-group>
                    <van-cell title="微信支付" clickable @click="paymethod = '1'">
                        <template #right-icon>
                            <i class="iconfont iconweixin" style="color: lime;font-size: 0.6rem"></i>
                            <van-radio name="1" />
                        </template>
                    </van-cell>
                    <van-cell title="支付宝支付" clickable @click="paymethod = '2'">
                        <template #right-icon>
                            <i class="iconfont iconzhifubao" style="color: dodgerblue;font-size: 0.6rem"></i>
                            <van-radio name="2" />
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </div>
        <van-button color="#f8606a" size="large" block @click="showPopup">立即付款</van-button>
        <van-popup v-model="show" closeable>
            <h3>确认金额并付款</h3>
            <h1>￥{{this.$route.query.price}}</h1>
            <van-button color="#f8606a" size="large" block @click="handleSubmit">立即付款</van-button>
        </van-popup>
    </div>
</template>

<script>
    import {CountDown,Radio,RadioGroup,Cell,CellGroup,Button,Popup} from 'vant';
    import 'vant/lib/count-down/style'
    import 'vant/lib/radio/style'
    import 'vant/lib/radio-group/style'
    import 'vant/lib/cell/style'
    import 'vant/lib/cell-group/style'
    import 'vant/lib/button/style'
    import 'vant/lib/popup/style'
    import {apiOrdersStatus} from "../../http/api";

    export default {
        name: "Pay",
        data(){
            return{
                paymethod:'',
                time:1800000,
                show: false,
            }
        },
        methods:{
            goback(){
                this.$router.back()
            },
            showPopup() {
                this.show = true;
            },
            handleSubmit(){
                apiOrdersStatus(2,this.$route.query.oid).then(res=>{
                    console.log(res);
                }).catch(error=>{
                    console.log(error);
                })
                this.$router.push({name:'paysuccess',query:{price:this.$route.query.price}})
            }
        },
        components:{
            vanCountDown:CountDown,
            vanRadio:Radio,
            vanRadioGroup:RadioGroup,
            vanCell:Cell,
            vanCellGroup:CellGroup,
            vanButton:Button,
            vanPopup:Popup
        }
    }
</script>

<style>
    .van-count-down{
        width: 100%;
        text-align: center;
        margin: 0.6rem auto;
    }
    .colon {
        display: inline-block;
        margin: 0 0.2rem;
        color: rgb(54,67,80);
        font-weight: bold;
        font-size: 0.7rem;
    }
    .block {
        display: inline-block;
        width: 1rem;
        height: 1.3rem;
        line-height: 1.3rem;
        color: #fff;
        font-size: 0.4rem;
        text-align: center;
        background-color: rgb(54,67,80);
        border-radius: 0.2rem;
    }
    .van-cell__title span{
        margin-left: 0.5rem;
    }
    .iconzhifubao,.iconweixin{
        position: relative;
        right: 88%;
    }
    .van-button{
        width: 90%;
        border-radius: 0.1rem;
        position: absolute;
        bottom: 1rem;
        left: 5%;
    }
    .van-popup{
        width: 80%;
        height: 4rem;
        border-radius: 0.1rem;
        text-align: center;
    }
    .van-popup h3{
        margin: 0.5rem auto 0.25rem;
    }
    .van-popup h1{
        color: #f8606a;
    }
    .van-popup .van-button{
        width: 90%;
        border-radius: 0.1rem;
        position: absolute;
        bottom: 0.5rem;
        left: 5%;
    }
</style>

<style scoped>
    .top{
        width: 90%;
        margin: 0 auto;
        height: 1rem;
        line-height: 1rem;
        background: rgb(255,255,255);
        text-align: center;
    }
    .top .iconzuo{
        float: left;
    }
    .top span{
        font-weight: bold;
        color: rgb(79,84,94);
    }
    .countdown{
        width: 90%;
        margin: 0.3rem auto 1rem;
        text-align: center;
    }
    .countdown h2{
        font-weight: bold;
        color: rgb(54,67,80);
    }
    .countdown p span:first-child{
        font-weight: bold;
        font-size: 0.3rem;
        color: #5e5e5e;
    }
    .countdown p span:last-child{
        font-weight: bold;
        font-size: 0.3rem;
        color: #f8606a;
    }
    .countdown div{
        font-size: 0.2rem;
        color: #5e5e5e;
        margin-top: 0.2rem;
    }
</style>