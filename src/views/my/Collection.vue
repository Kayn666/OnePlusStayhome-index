<template>
    <div v-if="collection.length">
        <div class="top">
            <i class="iconfont iconzuo" style="color: #f8606a" @click="goback"></i>
            <span>我的收藏</span>
        </div>
        <router-link :to="{name:'Detail',query:{sid:item.sid}}" v-for="(item,index) in collection" :key="index">
            <van-card
                :price="item.sprice"
                :desc="item.sdesc"
                :title="item.sname"
                :thumb="item.sthumb"
            >
                <template #tags>
                    <van-tag plain type="danger" v-for="(tag,index) in item.stag" :key="index">
                        {{tag}}
                    </van-tag>
                </template>
            </van-card>
        </router-link>
    </div>
</template>

<script>
    import {IMGURL} from "../../lib/base";
    import {apiCollectionList} from "../../http/api";
    import {Card,Tag} from 'vant';
    import 'vant/lib/card/style';
    import 'vant/lib/tag/style';

    export default {
        name: "collection",
        data(){
            return{
                collection:[],
                IMGURL
            }
        },
        methods:{
            initCollection(){
                apiCollectionList().then(res=>{
                    this.collection = res.data;
                    this.collection.map(ele=>{
                        ele.sthumb=IMGURL+ele.sthumb;
                        ele.stag=ele.stag.split(/,|，/);
                        return ele;
                    })
                    console.log(res);
                }).catch(error=>{
                    console.log(error);
                })
            },
            goback(){
                this.$router.back()
            },
        },
        components:{
            vanCard:Card,
            vanTag:Tag
        },
        mounted() {
            this.initCollection()
        }
    }
</script>

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
</style>