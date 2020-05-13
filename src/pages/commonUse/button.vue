<template>
    <div>
        <page-info title="Button 按钮" des="button样式：只需要更改样式"></page-info>

        <p class="padding-bottom-10">正常按钮：</p>
        <div class="padding-bottom-30">
            <button class="btn btn-default">默认按钮</button>
            <button class="btn btn-primary">主要按钮</button>
            <button class="btn btn-success">成功按钮</button>
            <button class="btn btn-info">信息按钮</button>
            <button class="btn btn-warning">警告按钮</button>
            <button class="btn btn-danger">危险按钮</button>
            <button class="btn btn-danger" disabled>禁用按钮</button>
        </div>
        <p class="padding-bottom-10">small按钮： 添加样式btn-small即可</p>
        <div>
            <button class="btn btn-default btn-small">默认按钮</button>
            <button class="btn btn-primary btn-small">主要按钮</button>
            <button class="btn btn-success btn-small">成功按钮</button>
            <button class="btn btn-info btn-small">信息按钮</button>
            <button class="btn btn-warning btn-small">警告按钮</button>
            <button class="btn btn-danger btn-small">危险按钮</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "buttons",
        /* beforeRouteLeave(to,from,next){
            var key = this.$vnode.key == null
                ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
                : this.$vnode.key;
            var cache = this.$vnode.parent.componentInstance.cache;
            var keys  = this.$vnode.parent.componentInstance.keys;
            delete cache[key];
            var index = keys.indexOf(key);
            keys.splice(index, 1);
            next();
        }*/

        beforeDestroy() {
            console.log('buttons destroy')
        }
    }
</script>

<style scoped lang="less">

</style>
