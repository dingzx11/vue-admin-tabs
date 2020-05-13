<template>
    <div>
        <page-info title="icon 图标库" des="用了Font Awesome，详细用法请参考<a href='https://fontawesome.dashgame.com/' target='_blank'>Font Awesome</a>"></page-info>

        <ul>
            <li  v-for="(item,index) in iconName" v-show="index>53&&index<840">
                <p class="fa" :class="item.substr(1)"></p>
                <p>{{item.substr(1)}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        name:"icons",
        data(){
            return{
                iconName:[]
            }
        },
        methods:{
            querySelectorStyle(){
                let styles=document.querySelector('style');

                let iconName=styles.textContent.match(/\.(.+?)(?=:)/g)
                //console.log(iconName)
                this.iconName=iconName;
            }
        },
        mounted() {
            this.querySelectorStyle();
        }
    }

</script>
<style lang="less" scoped>
ul{
    display: flex;
    flex-wrap: wrap;

    li{
        flex:0 0 16.4%;
        text-align: center;
        padding-bottom: 20px;
        color: #414c61;
        background-color: #f9f9f9;
        border: 1px solid #fff;
        min-width: 150px;
        flex-wrap: wrap;
        p:first-of-type{
            padding-top: 20px;
            color: #414c61;
            font-size: 24px;
            margin-bottom: 10px;
        }
    }
}
</style>
