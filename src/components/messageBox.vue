<!--created by dingzx on 2020.03.13-->
<template>
    <div class="toast-message"
         :class="[
             placement==='top'?'toast-message-top':'toast-message-bottom',
             `${type}-toast`
             ]"
         @mouseenter="onMouseEnter" @mouseleave="onMouseLeave"
         :style="styleObj">
        <i class="fa" :class="{
            'fa-check-circle':type==='success',
            'fa-info-circle':type==='info'||type==='warning',
            'fa-times-circle':type==='fail',
        }"></i>
        <span v-html="content"></span>
    </div>
</template>

<script>
    export default {
        name: "messageBox",
        props: {
            "content":{},
            "timeOut":{
                type:String||Number
            },
            "placement":{
                type:String,
                default:'bottom'
            },
            'type':{
                type:String,
                default:'info'
            }
        },
        data() {
            return {
                timeOutLeave: "",
                timeOutDestroy: "",
                styleObj: {
                    opacity: 0
                }
            }
        },
        methods: {
            destroy() {
                this.$destroy();
                document.body.removeChild(this.$el);
            },
            showMsgDom() {
                this.styleObj.opacity = 1;
                if (this.placement === "top") {
                    this.styleObj.top = 10 + 'px';
                    this.styleObj.bottom = 'initial';
                } else {
                    this.styleObj.bottom = 75 + 'px';
                    this.styleObj.top = 'initial';
                }
                this.destroyMsgDom();
            },
            destroyMsgDom() {
                let duration = this.timeOut ? this.timeOut * 1 : 3000;
                this.timeOutLeave = setTimeout(t => {
                    if (this.placement === "top") {
                        this.styleObj.top = -66 + 'px';
                        this.styleObj.bottom = 'initial';
                    } else {
                        this.styleObj.bottom = -75 + 'px';
                        this.styleObj.top = 'initial';
                    }
                    this.styleObj.opacity = 0;
                }, duration);
                this.timeOutDestroy = setTimeout(t => {
                    this.destroy();
                }, duration + 100);
            },
            onMouseEnter() {
                clearTimeout(this.timeOutLeave);
                clearTimeout(this.timeOutDestroy);
            },
            onMouseLeave() {
                setTimeout(t => {
                    this.showMsgDom();
                }, 200)
            }
        },
        mounted() {
            setTimeout(t => {
                this.showMsgDom();
            }, 200);
        }
    }
</script>

<style scoped lang="less">



/*    .message-box {
        max-width: 800px;
        transition: all .3s;
        opacity: 0;

        span {
            opacity: 1;
            color: #fff;
            word-break: break-all;
        }
    }*/
</style>
