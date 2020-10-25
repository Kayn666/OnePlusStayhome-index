<template>
    <div>
        <div v-if="person" class="top">
            <div class="avatar">
                <img :src="person.avatar" alt="">
            </div>
            <h5>{{person.nickname}}</h5>
        </div>
        <van-cell title="我的收藏" is-link @click="toCollection" />
        <div class="orders">
            <div class="ordersTop">
                <span>我的订单</span>
                <router-link :to="{name:'orderslist',query:{type:0}}">查看全部订单 &gt;</router-link>
            </div>
            <div class="ordersList">
                <router-link class="ordersItem" :to="{name:'orderslist',query:{type:1}}">
                    <i class="iconfont icondingdan1"></i>
                    <h5>未付款</h5>
                </router-link>
                <router-link class="ordersItem" :to="{name:'orderslist',query:{type:2}}">
                    <i class="iconfont iconqianbaoqiandaiyue"></i>
                    <h5>已付款</h5>
                </router-link>
                <router-link class="ordersItem" :to="{name:'orderslist',query:{type:3}}">
                    <i class="iconfont iconjiudian"></i>
                    <h5>已完成</h5>
                </router-link>
                <router-link class="ordersItem" :to="{name:'orderslist',query:{type:3}}">
                    <i class="iconfont iconrefund"></i>
                    <h5>退款</h5>
                </router-link>
            </div>
        </div>
        <van-button type="danger" size="large" block @click="quit">退出登录</van-button>
        <tabbar :index="3"></tabbar>
    </div>
</template>

<script>
    import tabbar from "../../components/tabbar/tabbar";
    import {IMGURL} from "../../lib/base";
    import {apiPerson} from "../../http/api";
    import {Toast,Cell,Button} from 'vant';
    import 'vant/lib/toast/style'
    import 'vant/lib/cell/style'
    import 'vant/lib/button/style'

    export default {
        name: "My",
        components:{
            tabbar,
            vanCell:Cell,
            vanButton:Button
        },
        data(){
            return {
                person:null,
                IMGURL
            }
        },
        methods:{
            initPerson(){
                apiPerson().then(res=>{
                    if (res.data){
                        this.person = res.data
                        this.person['avatar'] = IMGURL + this.person.avatar
                        // console.log(res);
                    }else {
                        Toast(res.msg)
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            toCollection(){
                this.$router.push('/collection')
            },
            quit(){
                localStorage.clear();
                this.$router.push('/login')
            }
        },
        mounted() {
            this.initPerson()
        }
    }
</script>

<style scoped>
    .top{
        text-align: center;
    }
    .avatar{
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
        border: 0.02rem solid #f8606a;
        overflow: hidden;
        margin: 0.5rem auto;
    }
    .avatar img{
        width: 100%;
        height: 100%;
    }
    .top h5{
        color: #5e5e5e;
        font-weight: bolder;
        font-size: 0.3rem;
    }
    .orders{
        width: 90%;
        margin: 0.4rem auto;
        box-shadow: 0 0 0.05rem rgba(100,100,100,0.3);
        padding: 0.2rem;
        border-radius: 0.1rem;
    }
    .ordersTop{
        display: flex;
        flex-wrap: wrap;
        justify-content:space-between;
    }
    .ordersTop a{
        font-size: 0.3rem;
        color: #888888;
    }
    .ordersTop span{
        font-size: 0.3rem;
        color: #888888;
    }
    .ordersList{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content:space-between;
        text-align: center;
        margin-top: 0.5rem;
    }
    .ordersItem{
        float: left;
    }
    .ordersItem i{
        font-size: 0.7rem;
        color: #f8606a;
    }
    .ordersItem h5{
        font-size: 0.3rem;
        color: #000000;
        margin-top: 0.3rem;
    }
    .van-button{
        width: 90%;
        margin: 0 auto;
        border-radius: 0.1rem;
        position: absolute;
        bottom: 2rem;
        left: 5%;
    }
</style>