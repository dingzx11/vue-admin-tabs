<template>
    <div>
        name: "fail"
<!--        <input type="text">-->
    </div>
</template>

<script>
    export default {
        name: "fail",
        beforeDestroy() {
            console.log("fail destroy!")
        }
    }
</script>

<style scoped>

</style>
