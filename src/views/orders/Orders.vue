<template>
    <div v-if="stayhome">
        <div class="top">
            <i class="iconfont iconzuo" style="color: #f8606a" @click="goback"></i>
            <span>订单填写</span>
        </div>
        <van-card
                :title="stayhome.sname"
                :desc="stayhome.snotice"
                :thumb="stayhome.sthumb"
                :price="stayhome.sprice"
        >
            <template #tags>
                <van-tag round type="danger">不可取消</van-tag>
            </template>
        </van-card>
        <van-form @submit="handleSubmit">
            <div class="dateBox">
                <div class="dateTop">
                    <span>入离日期</span>
                    <span>
                    <router-link :to="{name:'ordersdate'}">
                        修改日期<i class="iconfont iconyou"></i>
                    </router-link>
                </span>
                </div>
                <div class="date">
                    {{orders.enter_time}}——{{orders.leave_time}}
                </div>
                <div style="visibility: hidden">
                    <van-field v-model="orders.enter_time" name="enter_time" />
                    <van-field v-model="orders.leave_time" name="leave_time" />
                    <van-field v-model="orders.sid" name="sid" />
                </div>
            </div>
            <div class="userNum">
                <van-field name="user_number" label="入住人数">
                    <template #input>
                        <van-stepper v-model="orders.user_number" theme="round" button-size="22" disable-input max=2 />
                    </template>
                </van-field>
            </div>
            <div class="userInfo">
                <h5>住客信息</h5>
                <van-field v-model="orders.user_info" label="姓名" name="user_info" error
                           required
                           placeholder="请输入姓名" />
                <van-field v-model="orders.phone" type="tel" label="手机号" name="phone" required
                           placeholder="请输入手机号"
                           error />
            </div>
            <van-field label="房费" v-model="orders.price" readonly input-align="right" style="font-weight: bold" name="price" />
            <van-submit-bar :price="tranPrice" button-text="提交订单" native-type="submit" />
        </van-form>
    </div>
</template>

<script>
    import {IMGURL} from "../../lib/base";
    import { Card ,Tag,Field,Stepper,SubmitBar,Form,Toast} from 'vant';
    import 'vant/lib/card/style'
    import 'vant/lib/tag/style'
    import 'vant/lib/field/style'
    import 'vant/lib/stepper/style'
    import 'vant/lib/submit-bar/style'
    import 'vant/lib/form/style'
    import 'vant/lib/toast/style'
    import store from "../../store/store";
    import {apiOrders} from "../../http/api";

    export default {
        name: "Orders",
        data(){
            return{
                orders:{
                    sid:'',
                    enter_time:store.enter_time,
                    leave_time:store.leave_time,
                    user_number:'',
                    phone:'',
                    user_info:'',
                    price:'',
                },
                stayhome:null
            }
        },
        components:{
            vanCard:Card,
            vanTag:Tag,
            vanField:Field,
            vanStepper:Stepper,
            vanSubmitBar:SubmitBar,
            vanForm:Form
        },
        computed:{
            tranPrice(){
                return Number(this.orders.price.replace('.',''))
            }
        },
        methods:{
            handleSubmit(value){
                apiOrders(value).then(res=>{
                    if (res.code==200){
                        Toast.success(res.msg)
                        this.$router.replace({name:'pay',query:{price:this.orders.price,oid:res.oid}})
                    }else {
                        Toast.fail(res.msg)
                    }
                    // console.log(res);
                }).catch(error=>{
                    console.log(error);
                })
            },
            goback(){
                this.$router.back()
            }
        },
        mounted() {
            let {sid,stayhome} = this.$route.query;
            this.orders.sid=sid;
            this.stayhome=JSON.parse(stayhome)
            console.log(this.stayhome);
            this.stayhome.sthumb = IMGURL + this.stayhome.sthumb
            this.orders.price = this.stayhome.sprice
        }
    }
</script>

<style>
.userNum .van-stepper{
    position: relative;
    left: 65%;
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
.dateBox{
    width: 90%;
    margin: 0.3rem auto;
    height: 1.2rem;
}
.dateTop{
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
}
.dateTop span{
    font-size: 0.25rem;
    color: #7f7f7f;
}
.dateTop span a{
    font-size: 0.25rem;
    color: #7f7f7f;
}
.date{
    line-height: 0.7rem;
    color: #555555;
    font-weight: bold;
    font-size: 0.4rem;
}
.userInfo{
    width: 90%;
    margin: 0.3rem auto;
}
.userInfo .van-field{
    margin: 0.1rem 0;
}
</style>