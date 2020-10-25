<template>
    <div>
        <van-search
                v-model="searchValue"
                shape="round"
                background="rgb(235,102,107)"
                placeholder="关键词  景点"
        />
        <van-tabs swipeable>
            <van-tab title="故事">
                <img src="../../assets/banner1.png" alt="">
            </van-tab>
            <van-tab title="攻略">
                <img src="../../assets/banner2.png" alt="">
            </van-tab>
            <van-tab title="美景">
                <img src="../../assets/banner3.png" alt="">
            </van-tab>
            <van-tab title="美食">
                <img src="../../assets/banner4.png" alt="">
            </van-tab>
        </van-tabs>
        <div class="rank">
            <h2>
                <span>热门景点</span>
                <span>·排行</span>
            </h2>
            <van-swipe :loop="false" :width="180" :show-indicators="false">
                <van-swipe-item>
                    <img src="../../assets/imgs/banner1.jpg" alt="">
                    <div class="word">TOP1 故宫</div>
                </van-swipe-item>
                <van-swipe-item>
                    <img src="../../assets/imgs/banner2.jpg" alt="">
                    <div class="word">TOP2 颐和园</div>
                </van-swipe-item>
                <van-swipe-item>
                    <img src="../../assets/imgs/banner3.jpg" alt="">
                    <div class="word">TOP3 天坛公园</div>
                </van-swipe-item>
            </van-swipe>
            <div class="watch">
                <a class="watch-item" href="">
                    <div class="watch-left">
                        <span>你所不知道的北京</span>
                        <br>
                        <span>带你打卡你不知道的拍照圣地</span>
                    </div>
                    <img src="../../assets/img-d/watch1.jpg" alt="">
                </a>
                <a class="watch-item" href="">
                    <div class="watch-left">
                        <span>探索最文艺景点</span>
                        <br>
                        <span>北京最文艺景点 798艺术园区</span>
                    </div>
                    <img src="../../assets/img-d/watch2.jpg" alt="">
                </a>
            </div>
        </div>
        <tabbar :index="2"></tabbar>
    </div>
</template>

<script>
    import tabbar from "../../components/tabbar/tabbar";
    import {Search,Tab,Tabs,Swipe,SwipeItem} from 'vant';
    import 'vant/lib/search/style';
    import 'vant/lib/tab/style';
    import 'vant/lib/tabs/style';
    import 'vant/lib/swipe/style';
    import 'vant/lib/swipe-item/style';

    export default {
        name: "World",
        data(){
            return{
                searchValue:'',
            }
        },
        components:{
            tabbar,
            vanSearch:Search,
            vanTab:Tab,
            vanTabs:Tabs,
            vanSwipe:Swipe,
            vanSwipeItem:SwipeItem
        },
    }
</script>

<style scoped>
    .van-tab__pane{
        width: 90%;
        height: 3rem;
        margin: 0.2rem auto;
    }
    .van-tab__pane img{
        width: 100%;
        border-radius: 0.1rem;
    }
    .rank{
        width: 90%;
        margin: 0.7rem auto;
    }
    .rank h2 span:first-child{
        color: #5e5e5e;
    }
    .rank h2 span:last-child{
        color: #f8606a;
    }
    .van-swipe-item{
        width: 90%;
        height: 2rem;
        margin: 0.2rem auto;
        overflow: hidden;
    }
    .van-swipe-item img{
        width: 3rem;
        height: 100%;
        border-radius: 0.1rem;
    }
    .van-swipe-item .word{
        position: relative;
        bottom: 2rem;
        color: #ffffff;
        font-weight: bold;
        width: 50%;
        text-align: left;
        background: rgb(249,170,0);
        border-radius: 0.3rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .watch{
        width: 90%;
        height: 6rem;
        margin: 0.3rem auto;
    }
    .watch-item{
        width: 100%;
        height: 2rem;
        border-bottom: 1px solid rgb(247,247,247);
        overflow: hidden;
        margin-top: 0.5rem;
        display: block;
    }
    .watch-left{
        width: 3.5rem;
        height: 100%;
        float: left;
    }
    .watch-left span:first-child{
        font-size: 0.4rem;
        color: #f8606a;
    }
    .watch-left span:last-child{
        font-size: 0.3rem;
        color: #999999;
    }
    .watch img{
        width: 1.7rem;
        height: 1.7rem;
        float: right;
        border-radius: 0.1rem;
    }
</style>