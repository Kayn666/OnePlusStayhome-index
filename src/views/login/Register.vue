<template>
    <div>
        <div class="banner">
            <img src="../../assets/login.png" alt="">
        </div>
        <van-form @submit="handleSubmit">
            <van-field
                    v-model="registerForm.nickname"
                    name="nickname"
                    label="用户名"
                    placeholder="请输入用户名"
                    :rules="[{required:true,message:'请填写用户名'}]"
                    left-icon="smile-o"
                    clearable
                    autocomplete="off"
            />
            <van-field
                    v-model="registerForm.password"
                    name="password"
                    label="密码"
                    placeholder="请输入密码"
                    :rules="[{required:true,message:'请填写密码'}]"
                    type="password"
            />
            <van-field
                    v-model="registerForm.phone"
                    name="phone"
                    label="手机号码"
                    placeholder="请输入手机号码"
                    :rules="[{required:true,message:'请填写手机号码'}]"
                    clearable
            />
            <van-field
                    v-model="registerForm.code"
                    center
                    clearable
                    label="短信验证码"
                    placeholder="请输入短信验证码"
                    autocomplete="off"
            >
                <template #button>
                    <van-button size="small" type="primary" v-show="!time" @click="getcode">发送验证码</van-button>
                    <van-button size="small" disabled type="primary" v-show="time">({{time}})s</van-button>
                </template>
            </van-field>
            <van-field name="checkbox" label="同意协议">
                <template #input>
                    <van-checkbox v-model="registerForm.isagree" shape="round" />
                </template>
            </van-field>
            <div style="margin: 16px;">
                <van-button round block color="#f8606a" native-type="submit">
                    提交注册
                </van-button>
            </div>
            <router-link to="/login" tag="div" style="margin: 16px;">
                <van-button round block type="info">
                    返回登录
                </van-button>
            </router-link>
        </van-form>
    </div>
</template>

<script>
    import {Form,Field,Button,Checkbox,Toast} from 'vant';
    import 'vant/lib/form/style';
    import 'vant/lib/field/style';
    import 'vant/lib/button/style';
    import 'vant/lib/checkbox/style'
    import 'vant/lib/toast/style'
    import {apiRegister} from "../../http/api";

    export default {
        name: "Register",
        data(){
            return {
                registerForm:{
                    nickname:'',
                    code:'',
                    password:'',
                    isagree:false,
                },
                time:0
            }
        },
        methods:{
            handleSubmit(value){
                apiRegister(value).then(res=>{
                    Toast.success(res.msg)
                    console.log(res);
                }).catch(error=>{
                    console.log(error);
                })
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
            VanCheckbox:Checkbox
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
        position: absolute;
        left: 6%;
        bottom: 1.2rem;
        z-index: 99;
        background: #ffffff;
        box-shadow: 0 0 0.05rem rgba(100,100,100,0.3);
    }
</style>