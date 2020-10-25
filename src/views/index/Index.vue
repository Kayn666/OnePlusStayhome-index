<template>
    <div>
        <!--  banner  -->
        <template>
            <swiper class="banner" ref="mySwiper" :options="swiperOptions">
                <swiper-slide>
                    <img src="../../assets/imgs/banner1.jpg" alt="">
                </swiper-slide>
                <swiper-slide>
                    <img src="../../assets/imgs/banner2.jpg" alt="">
                </swiper-slide>
                <swiper-slide>
                    <img src="../../assets/imgs/banner3.jpg" alt="">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </template>
        <!--  查找  -->
        <div class="find">
            <div class="findform">
                <form action="">
                    <div class="search">
                        <router-link to="/province" style="font-size: 0.3rem;color: #f8606a">
                            {{indexSearch.province}}
                        </router-link>
                        <img src="../../assets/imgs/down.png" alt="">
                        <input type="text" placeholder="景点 地址 关键词">
                        <img src="../../assets/imgs/location.png" alt="">
                        <span style="font-size: 0.3rem">定位</span>
                    </div>
                    <router-link to="/calendar" class="dateBox" tag="div">
                        <span class="date">{{indexSearch.startTime}}</span>
                        <span class="week">{{indexSearch.startDay}}</span>
                        <img src="../../assets/imgs/arrow.png" alt="">
                        <span class="date">{{indexSearch.endTime}}</span>
                        <span class="week">{{indexSearch.endDay}}</span>
                        <span class="during" style="font-size: 0.3rem">共一晚</span>
                    </router-link>
                    <router-link tag="button" to="/list" type="submit" class="searchbtn">
                        立即查找
                    </router-link>
                </form>
            </div>
            <div class="ifo">
                <img src="../../assets/imgs/creditCard.png" alt="" style="width: 0.25rem;height: auto">
                <span style="font-size: 0.2rem">信用免押金</span>
                <img src="../../assets/imgs/earphone.png" alt="" style="width: 0.25rem;height: auto">
                <span style="font-size: 0.2rem">24小时客服</span>
                <img src="../../assets/imgs/auth.png" alt="" style="width: 0.25rem;height: auto">
                <span style="font-size: 0.2rem">房源房东真实认证</span>
            </div>
        </div>
        <!--  优选pro  -->
        <div class="pro">
            <div class="title">
                <span>优选</span><span>P</span><span>RO</span>
            </div>
            <div class="subtitle" v-if="indexData.category">
<!--                每一套都是性价比优质房源-->
                {{indexData.category[0].cdesc}}
            </div>
            <template>
                <swiper class="swiper-container" ref="mySwiper" :options="swiperOptions" v-if="indexData.category">
                    <router-link :to="{name:'Detail',query:{sid:item.sid}}" class="swiper-slide" v-for="(item,index) in indexData.category[0].children" :key="index">
                        <img :src="IMGURL+item.sthumb" alt="">
                        <div class="imgword">
                            <div class="protitle">
                                {{item.sname}}
                            </div>
                            <img src="../../assets/imgs/star1.png" alt="" v-for="item in item.score" :key="item">
                            <br>
                            <div>
                                <div class="address">
                                    {{item.scity}}·{{item.sarea}}
                                </div>
                                <div class="price">
                                    <span>RMB</span><span>{{item.sprice}}</span>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </swiper>
                <div class="swiper-pagination" slot="pagination"></div>
            </template>
        </div>
        <!--  不得不睡  -->
        <div class="mustsleep">
            <div class="title">
                <span>不得不</span><span>睡</span>
            </div>
            <div class="subtitle" v-if="indexData.category">
                {{indexData.category[1].cdesc}}
<!--                每一套都是精品特色房源-->
            </div>
            <template>
                <swiper class="swiper-container" ref="mySwiper" :options="swiperOptions1" v-if="indexData.category">
                    <router-link class="swiper-slide" :to="{name:'Detail',query:{sid:item.sid}}" v-for="(item,index) in indexData.category[1].children" :key="index">
                        <img :src="IMGURL+item.sthumb" alt="">
                        <div class="msg">
                            <div class="msg-title" style="color: #f8606a">
                                {{item.sname}}
                            </div>
                            <div class="msg-msg">
                                {{item.sdesc}}
                            </div>
                            <div class="tag">
                                <div class="tag-tag" v-for="item in initTag(item.stag)" :key="item">
                                    {{item}}
                                </div>
                            </div>
                        </div>
                    </router-link>
                    <div class="swiper-pagination"></div>
                </swiper>
            </template>
        </div>
        <!--  不得不说  -->
        <div class="mustsay">
            <div class="title">
                <span>不得不</span><span>说</span>
            </div>
            <div class="subtitle" v-if="indexData.category">
                {{indexData.category[2].cdesc}}
<!--                每一段都是我与它的爱恨情仇-->
            </div>
            <div class="sofa">
                <img src="../../assets/imgs/chair.png" alt="">
            </div>
        </div>
        <!--  不得不看  -->
        <div class="mustsee">
            <div class="title">
                <span>不得不</span><span>看</span>
            </div>
            <div class="subtitle" v-if="indexData.category">
                {{indexData.category[3].cdesc}}
            </div>
            <div class="mustseebox" v-if="indexData.category">
                <router-link class="mustsee-item" :to="{name:'Detail',query:{sid:item.sid}}" v-for="(item,index) in indexData.category[3].children" :key="index">
                    <img :src="IMGURL+item.sthumb" alt="" class="mustsee-img">
                    <span class="hotelName">{{item.sname}}</span>
                    <br>
                    <span style="color: #999999">{{item.scity}}·{{item.sarea}}</span>
                    <br>
                    <img src="../../assets/imgs/star.png" alt="" class="mustsee-star" v-for="item in item.score" :key="item">
                    <br>
                    <span style="color: #f8606a">RMB</span>
                    <span class="price">{{item.sprice}}</span>
                    <span style="color: #000000">每晚</span>
                </router-link>
            </div>
        </div>
        <!--  底部  -->
        <tabbar :index="1"></tabbar>
    </div>
</template>

<script>
    import {Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import 'swiper/swiper-bundle.min.css'
    import {IMGURL} from "../../lib/base";
    import {apiIndex} from "../../http/api";
    import tabbar from "../../components/tabbar/tabbar";


    export default {
        name: "Index",
        data() {
            return {
                indexData:[],
                IMGURL,
                swiperOptions: {
                    autoplay:true,
                    direction: 'horizontal',
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    centeredSlides:true,
                    loop:true,
                },
                swiperOptions1:{
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                    pagination: {
                        el: '.mustsleep .swiper-pagination',
                        clickable: true,
                    },
                }
            }
        },
        methods:{
            initSearch(){
                this.$store.dispatch('setTime');
                this.$store.dispatch('setProvince');
            },
            initData(){
                apiIndex().then(res=>{
                    // console.log(res.data);
                    this.indexData=res.data
                }).catch(error=>{
                    console.log(error);
                })

                // let url = URL + '/index/index';
                // axios({
                //     methods:'GET',
                //     url
                // }).then(res=>{
                //     if (res.status && res.data.code === SUCCESS){
                //         if (res.data.data){
                //             this.indexData=res.data.data;
                //             console.log(res.data);
                //         }else {
                //             this.message.info(res.data.msg)
                //         }
                //     }
                // })
            },
            initTag(tag){
                let tagArr = tag.split(/,|，/);
                return tagArr;
            }
        },
        computed: {
            indexSearch() {
                return this.$store.state.indexSearch;
            },
            swiper() {
                return this.$refs.mySwiper.$swiper
            }
        },
        components: {
            Swiper,
            SwiperSlide,
            tabbar
        },
        mounted() {
            // JSON.stringify({})==='{}'
            // this.initSearch()
            this.initData()
        }
    }
</script>

<style scoped>
    @import "../../style/index.css";
</style>