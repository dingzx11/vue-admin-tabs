<template>
    <div class="page-main-header">
        <h2 class="page-title">{{title}}</h2>
        <p class="page-des" v-html="des"></p>
    </div>
</template>

<script>
    export default {
        name: "pageInfo",
        props:{
            title:{
                type:String,
                default:"tab页标题"
            },
            des:{
                type:String,
                default: "tab页简介"
            }
        }
    }
</script>

<style scoped>

</style>
