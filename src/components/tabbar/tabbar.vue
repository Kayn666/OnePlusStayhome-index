<template>
    <div class="bottom">
        <router-link to="/" id="index" :class="[ index === 1 ? 'active':'']">
            <img src="../../assets/imgs/index.png" alt="">
            <div>首页</div>
        </router-link>
        <router-link to="/world" id="view" :class="[ index === 2 ? 'active':'']">
            <img src="../../assets/imgs/view.png" alt="">
            <div>视界</div>
        </router-link>
        <router-link to="/my" id='my' :class="[ index === 3 ? 'active':'']">
            <img src="../../assets/imgs/my.png" alt="">
            <div>我的</div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "tabbar",
        props:{
            index:{
                type:Number,
                default:1
            }
        }
    }
</script>

<style scoped>
    /*底部*/
    .bottom{
        position: fixed;
        z-index: 999;
        bottom: 0;
        width: 100%;
        background: rgb(255,255,255);
        height: 1.2rem;
        padding: 0 0.55rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .bottom > a{
        width: 0.5rem;
        text-align: center;
        font-size: 0.2rem;
        color: #f8606a;
        opacity: 0.5;
    }
    .bottom > a.active{
        opacity: 1;
    }
    .bottom > a > img{
        width: 0.5rem;
        height: auto;
    }
    .bottom > a:nth-child(2) > img{
        margin: 0.07rem 0;
    }
</style>