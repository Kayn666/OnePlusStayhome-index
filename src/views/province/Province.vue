<template>
    <div>
        <van-index-bar>
            <van-index-anchor v-for="item in provinceKeys" :key="item">
                {{item}}
                <van-cell v-for="(city,index) in province[item]" :key="index" @click="handleProvince(city.city)">
                    {{city.city}}
                </van-cell>
            </van-index-anchor>
        </van-index-bar>
    </div>
</template>

<script>
    import city from '../../lib/city.json'
    import {IndexBar, IndexAnchor,Cell} from 'vant';
    import 'vant/lib/index-bar/style'
    import 'vant/lib/index-anchor/style'
    import 'vant/lib/cell/style'

    export default {
        name: "Province",
        data() {
            return {
                province: {},
            }
        },
        computed: {
            provinceKeys() {
                let arr = [];
                // if (JSON.stringify(this.province) != '{}') {
                    arr = Object.keys(this.province).sort();
                // }
                return arr;
            }
        },
        methods: {
            initProvince() {
                city.province.forEach(ele => {
                    let firstChar = ele.en.charAt(0).toUpperCase();
                    if (!this.province[firstChar]) {
                        this.$set(this.province, firstChar, [])
                        // this.province[firstChar]=[]
                    }
                    this.province[firstChar].push(ele)
                })
            },
            handleProvince(province) {
                this.$store.commit('setProvince',province)
                this.$router.back()
            }
        },
        components: {
            'van-index-bar': IndexBar,
            'van-index-anchor':IndexAnchor,
            'van-cell':Cell
        },
        mounted() {
            this.initProvince()
        }
    }
</script>

<style scoped>

</style>