<template>
    <div>
        <div class="banner">
            <img src="../../assets/login.png" alt="">
        </div>
        <van-form @submit="handleSubmit">
            <van-field
                    v-model="registerForm.phone"
                    name="phone"
                    label="手机号"
                    placeholder="请输入手机号"
                    :rules="[{required:true,message:'请填写手机号'}]"
                    clearable
            />
            <van-field
                    v-model="registerForm.code"
                    name="code"
                    center
                    clearable
                    label="短信验证码"
                    placeholder="请输入短信验证码"
            >
                <template #button>
                    <van-button size="small" type="primary" v-show="!time" @click="getcode">发送验证码</van-button>
                    <van-button size="small" disabled type="primary" v-show="time">({{time}})s</van-button>
                </template>
            </van-field>
            <div style="margin: 16px;">
                <van-button round block native-type="submit" color="#f8606a">
                    登录
                </van-button>
            </div>
            <router-link to="/register" style="margin: 16px;" tag="div">
                <van-button round block type="info">
                    注册
                </van-button>
            </router-link>
        </van-form>
    </div>
</template>

<script>
    import {Form,Field,Button} from 'vant';
    import 'vant/lib/form/style';
    import 'vant/lib/field/style';
    import 'vant/lib/button/style';
    import 'vant/lib/checkbox/style'
    // import {apiLogin} from "../../http/api";

    export default {
        name: "Login",
        data(){
            return {
                registerForm:{
                    phone:'',
                    code:'',
                },
                time:0
            }
        },
        methods:{
            handleSubmit(value){
                let redirect = this.$route.query.redirect || 'Index'
                let query = this.$route.query.params || {}
                let obj = Object.assign({},value,{redirect},{query})
                this.$store.dispatch('handlerLogin',obj)
                // apiLogin(value).then(res=>{
                //     this.$store.commit('setToken',res.token)
                // }).catch(error=>{
                //     console.log(error);
                // })
            },
            getcode(){
                if (!this.time){
                    this.time=60;
                    this.registerForm.code=Math.floor(Math.random()*9000+1000)
                    let t = setInterval(()=>{
                        if (this.time>0){
                            this.time--
                        }else {
                            clearInterval(t)
                            this.time=0
                        }
                    },1000)
                }
            }
        },
        components:{
            VanForm:Form,
            VanField:Field,
            VanButton:Button,
        }
    }
</script>

<style scoped>
    .banner{
        width: 100%;
        height: 6rem;
    }
    .banner img{
        width: 100%;
    }
    .van-form{
        width: 80%;
        margin: 0.3rem auto;
        padding: 0.3rem;
        border-radius: 0.15rem;
        position: relative;
        bottom: 1.2rem;
        z-index: 99;
        background: #ffffff;
        box-shadow: 0 0 0.05rem rgba(100,100,100,0.3);
    }
</style>