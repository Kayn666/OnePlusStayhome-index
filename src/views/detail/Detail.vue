<template>
    <div>
        <!--    顶部    -->
        <div class="top">
            <i class="iconfont iconzuo" style="color: #f8606a" @click="goback"></i>
            <span>民宿详情</span>
        </div>
        <!--    banner    -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in stayhome.sbanner" :key="index">
                <img :src="item" alt="">
            </van-swipe-item>
        </van-swipe>
        <!--    民宿概况    -->
        <div class="hotelbase">
            <div class="titleBox">
                <div class="titleBoxLeft">
                    <h3 class="title">
                        {{stayhome.sname}}
                    </h3>
                    <div class="tagBox">
                        <div class="tag" v-for="(tag,index) in stayhome.stag" :key="index">
                            {{tag}}
                        </div>
                    </div>
                </div>
                <div class="titleBoxRight">
                    <div class="supergood">
                        超赞
                    </div>
                    <div class="scoreBox">
                        <div class="score">
                            {{stayhome.score}}
                        </div>
                        <div>
                            ...
                        </div>
                    </div>
                </div>
            </div>
            <div class="equip">
                <ul class="equipIn">
                    <li>
                        <i class="iconfont iconfangzi"></i>
                        酒店式公寓
                    </li>
                    <li>
                        <i class="iconfont iconshafa1"></i>
                        一室一厅
                    </li>
                    <li>
                        <i class="iconfont iconguo"></i>
                        一厨一卫
                    </li>
                    <li>
                        <i class="iconfont iconshafa"></i>
                        配备齐全
                    </li>
                    <li>
                        <i class="iconfont iconrenshu"></i>
                        宜住两人
                    </li>
                </ul>
            </div>
            <div class="notice">
                <h5>注意事项</h5>
                <p>{{stayhome.snotice}}</p>
            </div>
            <div class="discount">
                <div class="discount1">
                    <i class="iconfont iconyouhuiquan" style="color: red"></i>
                    <span>新手立减·今日特价·连住优惠</span>
                    <i class="iconfont iconyou"></i>
                </div>
                <div class="discount2">
                    <i class="iconfont iconhongbao" style="color: red"></i>
                    <div>九折优惠</div>
                    <div>满100减5</div>
                    <i class="iconfont iconyou"></i>
                    <span>去领取</span>
                </div>
            </div>
        </div>
        <van-collapse v-model="actives">
            <van-collapse-item title="民宿特色">
                {{stayhome.sdesc}}
            </van-collapse-item>
        </van-collapse>
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" />
            <van-goods-action-icon icon="star" text="收藏" :class="{active:isCollection}" @click="handleCollection" />
            <van-goods-action-button
                    type="danger"
                    text="立即预定"
                    @click="handleOrders"
            />
        </van-goods-action>
    </div>
</template>

<script>
    import {apiCollection, apiDetail} from "../../http/api";
    import {Swipe, SwipeItem, GoodsAction, GoodsActionIcon, GoodsActionButton, Toast,Collapse, CollapseItem} from 'vant';
    import 'vant/lib/swipe/style';
    import 'vant/lib/swipe-item/style';
    import {IMGURL} from "../../lib/base";
    import 'vant/lib/goods-action/style';
    import 'vant/lib/goods-action-button/style';
    import 'vant/lib/goods-action-icon/style';
    import 'vant/lib/toast/style'
    import 'vant/lib/collapse/style'
    import 'vant/lib/collapse-item/style'

    export default {
        name: "Detail",
        data() {
            return {
                IMGURL,
                stayhome: [],
                recommend: [],
                actives:[]
            }
        },
        computed: {
            isCollection() {
                let sid =   this.$route.query.sid;
                return  this.$store.getters.isCollection(sid);
            }
        },
        methods: {
            initData(sid) {
                apiDetail(sid).then(res => {
                    console.log(res);
                    let stayhome = res.data.stayhome;
                    stayhome.sbanner = stayhome.sbanner.map(ele => {
                        ele = IMGURL + ele;
                        return ele;
                    })
                    stayhome.stag = stayhome.stag.split(/,|，/);
                    this.stayhome = stayhome
                    this.recommend = res.data.recommend;
                }).catch(error => {
                    console.log(error);
                })
            },
            handleCollection(){
                if (this.$store.state.token){
                    apiCollection(this.$route.query.sid,this.$store.state.token).then(res=>{
                        Toast.success(res.msg)
                    }).catch(error=>{
                        Toast.fail(error.msg)
                    })
                    this.$store.commit('toggleCollection',this.$route.query.sid)
                }
            },
            handleOrders(){
                if (!this.$store.state.token){
                    Toast('请登录');
                    this.$router.push({name:'Login',query:{redirect:'Detail',params:{sid:this.$route.query.sid}}})
                }else {
                    let {sid,sthumb,sname,sdesc,sprice,snotice} = this.stayhome
                    this.$router.push({name:'orders',query:{sid,stayhome:JSON.stringify({sid,sthumb,sname,sdesc,sprice,snotice})}})
                }

            },
            goback(){
                this.$router.back()
            }
        },
        components: {
            'van-swipe': Swipe,
            'van-swipe-item': SwipeItem,
            VanGoodsAction:GoodsAction,
            VanGoodsActionIcon:GoodsActionIcon,
            VanGoodsActionButton:GoodsActionButton,
            VanCollapse:Collapse,
            VanCollapseItem:CollapseItem
        },
        mounted() {
            let sid = this.$route.query.sid
            this.initData(sid)
        }
    }
</script>

<style>
.van-goods-action-icon.active{
    color: red;
}
.van-goods-action-icon.active .van-icon-star{
    color: red;
}
</style>

<style scoped>
    @import "../../style/detail.css";
</style>