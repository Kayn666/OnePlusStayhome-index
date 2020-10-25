<template>
    <div>
        <div class="fix">
            <div class="top">
                <i class="iconfont iconzuo" style="color: #f8606a" @click="goback"></i>
                <span>全部订单</span>
            </div>
            <div class="order-buttons">
                <ul>
                    <li :class="{tap:search.field === item.field}" v-for="(item,index) in ordersType" :key="index" @click="changeOrdersType(item.field)">
                        <div><span>{{item.text}}</span></div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="ordersList" v-if="orders">
            <div class="orderItem" v-for="(item,index) in orders" :key="index">
                <div class="sthumb">
                    <img :src="item.sthumb" alt="">
                </div>
                <div class="status">
                    <span>{{item.enter_time}}→{{item.leave_time}}</span>
                    <span>{{item.status}}</span>
                </div>
                <div class="info">
                    <span>{{item.sname}}</span>
                    <span>RMB {{item.price}}</span>
                </div>
                <div class="toPay" v-if="item.status=='待付款'">
                    <van-button type="danger" size="small" @click="topay(item.price,item.oid)">立即支付</van-button>
                    <van-button size="small" @click="showPopup(item.oid)">取消订单</van-button>
                </div>
                <div class="toPay" v-if="item.status=='已付款'">
                    <van-button type="danger" size="small">立即评价</van-button>
                    <van-button size="small" @click="showPopup(item.oid)">取消订单</van-button>
                </div>
                <div class="toPay" v-if="item.status=='已完成'">
                    <van-button type="danger" size="small">再次预定</van-button>
                    <van-button size="small">查看订单</van-button>
                </div>
                <van-popup v-model="show" position="bottom" round closeable :style="{ height: '30%' }">
                    <h1>确认取消订单？</h1>
                    <van-button type="danger" @click="quitOrder(quitOid)">确认</van-button>
                </van-popup>
            </div>
        </div>
        <div class="space" v-if="!orders">
            <h1>暂无该类型订单</h1>
        </div>
    </div>
</template>

<script>
    import {apiOrdersList, apiOrdersQuit} from "../../http/api";
    import {IMGURL} from "../../lib/base";
    import {Toast,Button,Popup} from 'vant';
    import 'vant/lib/toast/style'
    import 'vant/lib/button/style'
    import 'vant/lib/popup/style'

    export default {
        name: "OrdersList",
        data(){
            return{
                ordersType:[
                    {field:0,text:'全部'},
                    {field:1,text:'待付款'},
                    {field:2,text:'已付款'},
                    {field:3,text:'已完成'},
                ],
                orders:[],
                paginate:{
                    page:1,
                    limit:5
                },
                search:{
                    field:0
                },
                show: false,
                quitOid:null
            }
        },
        components:{
            vanButton:Button,
            vanPopup:Popup
        },
        methods:{
            goback(){
                this.$router.push('/my')
            },
            changeOrdersType(field){
                this.search.field=field
                this.initOrders()
            },
            initOrders(){
                apiOrdersList(this.search.field).then(res=>{
                    this.orders=res.data;
                    if (res.data){
                        this.orders.map(ele=>{
                            ele.sthumb = IMGURL + ele.sthumb;
                            if (ele.status==1){
                                ele.status='待付款'
                            }else if(ele.status==2){
                                ele.status='已付款'
                            }else if(ele.status==3){
                                ele.status='已完成'
                            }
                            return ele;
                        })
                        // console.log(this.orders);
                    }else {
                        Toast.fail('暂无该类型订单')
                    }
                    // console.log(res);
                }).catch(error=>{
                    console.log(error);
                })
            },
            topay(price,oid){
                this.$router.push({name:'pay',query:{price:price,oid:oid}})
            },
            quitOrder(oid){
                apiOrdersQuit(oid).then(res=>{
                    if (res.code==200){
                        Toast.success(res.msg)
                        this.$router.back()
                    }else {
                        Toast.fail(res.msg)
                    }
                    this.quitOid = null;
                    // console.log(res);
                }).catch(error=>{
                    console.log(error);
                })
            },
            showPopup(oid) {
                this.show = true;
                this.quitOid =oid;
            },
        },
        mounted() {
            let type = this.$route.query.type;
            this.search.field=type;
            this.initOrders();
        }
    }
</script>

<style>

</style>

<style scoped>
    .fix{
        position: fixed;
        width: 100%;
        top: 0;
        background: rgb(255,255,255);
        padding-bottom: 0.2rem;
        z-index: 999;
    }
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

    .order-buttons{
        width: 85%;
        margin: 0.3rem auto 0;
        height: 0.63rem;
    }
    .order-buttons ul li{
        float: left;
        text-align: center;
        margin-right: 0.3rem;
    }

    .order-buttons ul li div{
        width: 1.35rem;
        height: 0.63rem;
        line-height: 0.63rem;
    }

    .tap{
        color: #fafafa;
        width: 1.35rem;
        height: 0.63rem;
        background-color: #eb666b;
        box-shadow: 0 0.12rem 0.3rem 0 rgba(235, 102, 107, 0.5);
        border-radius: 0.32rem;
    }
    .order-buttons ul li:nth-child(4){
        margin-right: 0;
    }
    /*.order-buttons ul li div span{*/
    /*    position: relative;*/
    /*    top: 0.1rem;*/
    /*}*/

    .ordersList{
        width: 90%;
        margin: 0.2rem auto;
        padding-top: 1.8rem;
    }
    .orderItem{
        width: 100%;
        height: auto;
        border-radius: 0.1rem;
        box-shadow: 0 0 0.05rem rgba(100,100,100,0.3);
        margin: 0.5rem auto;
    }
    .sthumb{
        width: 100%;
        height: 3rem;
        overflow: hidden;
    }
    .sthumb img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-top-left-radius: 0.1rem;
        border-top-right-radius: 0.1rem;
    }
    .status,.info{
        display: flex;
        flex-wrap: wrap;
        justify-content:space-between;
        margin: 0.1rem auto;
        padding: 0 0.1rem 0.1rem;
    }
    .status{
        border-bottom:1px solid rgba(25,25,25,0.1) ;
    }
    .status span{
        font-size: 0.4rem;
        color: #5e5e5e;
    }
    .status span:last-child{
        font-size: 0.4rem;
        color: rgb(238,172,60);
        font-weight: bold;
    }
    .info span{
        font-size: 0.3rem;
        font-weight: bold;
        color: #5e5e5e;
    }
    .info span:last-child{
        font-size: 0.4rem;
        font-weight: bold;
        color: #f8606a;
    }

    .space{
        width: 100%;
        text-align: center;
        margin-top: 1rem;
    }
    .space h1{
        color: #888888;
    }

    .toPay{
        padding: 0 0.2rem 0.2rem;
    }
    .toPay:after{
        content: "";
        display: block;
        height: 0;
        clear:both;
        visibility: hidden;
    }
    .toPay .van-button{
        float: right;
        margin-right: 0.3rem;
        border-radius: 0.1rem;
    }
    .van-popup{
        text-align: center;
    }
    .van-popup h1{
        margin: 0.6rem auto;
    }
    .van-popup button{
        border-radius: 0.1rem;
    }
</style>