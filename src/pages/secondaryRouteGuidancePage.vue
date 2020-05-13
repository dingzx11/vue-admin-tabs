<template>
<div class="secondary-page">
    <keep-alive :include="includeRoute.includeAll">
        <router-view></router-view>
    </keep-alive>
</div>
</template>
<!--二级路由导引页-->
<!--created by dingzx on 2020.04.16-->
<script>
    export default {
        name: "secondaryRouteGuidancePage",
        data(){
            return{
                includeRoute:this.$store.getters.getIncludeRoute
            }
        },
        mounted() {

        },
        created() {
            this.includeRoute=this.$store.getters.getIncludeRoute;
        },
        beforeDestroy() {
            //adminVue.$off("removeTab")
        }
    }
</script>

<style scoped>

</style>
