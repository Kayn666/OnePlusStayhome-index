<template>
    <div>
        <p @click="handleclick">
            {{msg}}
        </p>
    </div>
</template>

<script>
    import store from "../store/store";

    export default {
        name: 'Home',
        data(){
            return{

            }
        },
        computed:{
            msg(){
                return store.msg
            }
        },
        methods:{
            handleclick(){
                store.msg = '修改后的值'
            }
        }
    }
</script>
