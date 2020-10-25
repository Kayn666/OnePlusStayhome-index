<template>
    <div class="list-box">
        <div class="top">
            <i class="iconfont iconzuo" style="color: #f8606a" @click="goback"></i>
            <span>民宿列表</span>
        </div>
        <ul class="nav">
            <li v-for="(item,index) in orderArr" :key="index" :class="{active:order.field === item.field}" @click="handerOrdertype(item.field)">
                {{item.text}}
                <i :class="['iconfont',item.icon]"></i>
            </li>
        </ul>
        <div class="list">
            <van-pull-refresh v-model="isPullrefresh" @refresh="handlerPullrefresh" success-text="刷新成功">
                <div class="mustsee">
                    <van-list class="mustseebox" v-model="isUpper" :finished="upperFinished" finished-text="没有更多了" :immediate-check="false" @load="handlerUpper">
                        <router-link :to="{name:'Detail',query:{sid:item.sid}}" class="mustsee-item" v-for="item in stayhome" :key="item.sid">
                            <img :src="item.sthumb" alt="" class="mustsee-img">
                            <span class="hotelName">{{item.sname}}</span>
                            <br>
                            <span style="color: #999999">{{item.scity}}·{{item.sarea}}</span>
                            <br>
                            <img src="../../assets/imgs/star.png" alt="" class="mustsee-star" v-for="index in item.score" :key="index">
                            <br>
                            <span style="color: #f8606a">RMB</span>
                            <span class="price">{{item.sprice}}</span>
                            <span style="color: #000000">每晚</span>
                        </router-link>
                    </van-list>
                </div>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
    import {PullRefresh, List} from 'vant';
    import 'vant/lib/pull-refresh/style'
    import 'vant/lib/list/style'
    import {apiList} from "../../http/api";
    import {IMGURL} from "../../lib/base";

    export default {
        name: "List",
        components: {
            VanPullRefresh: PullRefresh,
            VanList: List
        },
        data() {
            return {
                orderArr: [
                    {text: '综合', icon: 'iconxiala', field: 'sid'},
                    {text: '评分', icon: 'iconxiala', field: 'score'},
                    {text: '时间', icon: 'iconxiala', field: 'ctime'},
                    {text: '价格', icon: 'iconxiala', field: 'sprice'},
                ],
                isPullrefresh: false,
                isUpper: false,
                upperFinished: false,
                paginate: {
                    page: 0,
                    limit: 8
                },
                // 综合 sid , 位置score  时间 ctime 价格 sprice
                order: {
                    field: 'sid',
                    type: 'desc'
                },
                stayhome: [],
                total: 0
            }
        },
        methods: {
            handlerPullrefresh() {
                this.upperFinished=false
                this.paginate.page=0
                this.stayhome=[]
                this.isPullrefresh=false
                this.handlerUpper()
            },
            handlerUpper() {
                this.paginate.page++;
                let obj = Object.assign({}, this.paginate, this.order)
                apiList(obj).then(res => {
                    if (res.data) {
                        this.isUpper = false
                        !this.total && (this.total = res.total);
                        let data = res.data.map(ele => {
                            ele.sthumb = IMGURL + ele.sthumb;
                            return ele;
                        })
                        this.stayhome = this.stayhome.concat(data);
                        // this.stayhome.push(...data)
                        if (this.stayhome.length>=this.total){
                            this.upperFinished = true
                        }
                    }
                    // console.log(res);
                }).catch(error => {
                    console.log(error);
                })
            },
            handerOrdertype(field){
                this.order.field=field;
                this.upperFinished=false;
                this.paginate.page=0;
                this.stayhome=[];
                this.total=0;
                this.handlerUpper()
            },
            goback(){
                this.$router.back()
            }
        },
        mounted() {
            this.handlerUpper()
        }
    }
</script>

<style>
    html,body{
        width: 100%;
        height: 100%;
    }
    .van-list__finished-text{
        width: 100%;
        text-align: center;
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
    .van-list{
        overflow: hidden;
    }
    @import url('../../style/list.css');
</style>