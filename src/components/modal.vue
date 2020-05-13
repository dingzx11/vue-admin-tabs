<template>
    <div :class="{'modal-layer':true,'open-modal':isOpen}" ref="modalLayer">
        <div :class="['modal-mask',isShow?'show-modal-mask':'']" @click.stop="closeModal(1)"></div>
        <div :class="['modal-wrap',isShow?'show-modal-wrap':'hide-modal-wrap']" :style="{width:modalWidth+'px','left':translateLocation.left,'top':translateLocation.top}">
            <div class="modal-header">
                <p class="modal-title">{{modalTitle}}</p>
                <span v-if="closable" class="modal-close-btn" @click.stop="closeModal(2)">×</span>
            </div>
            <div class="modal-body">
                <slot name="body"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "modal",
        props: {
            /*点击遮罩是否关闭，默认为true*/
            maskClosable:{
                type:Boolean,
                default:true
            },
            /*是否显示右上角的关闭按钮*/
            closable:{
                type:Boolean,
                default:true
            },
            /*弹窗的宽度*/
            modalWidth:{
                type:String|Number,
                default:520
            },
            /*弹窗的标题*/
            modalTitle:{
                type:String,
                default:"温馨提示"
            }
        },
        data() {
            return {
                open:false,
                isShow: false,
                isOpen: false,
                timer:"",
                defaultLocation:{
                    top:"200px",
                    left:"40%"
                },
                translateLocation:{
                    top:"200px",
                    left:"50%"
                }
            }
        },
        watch:{
            open:function(v){
                clearTimeout(this.timer);
                if(v){
                    this.isOpen=v;
                    this.timer=setTimeout(t=>{
                        this.isShow=v;
                        this.translateLocation={
                           top:"250px",
                           left:"50%"
                       };
                        clearTimeout(this.timer);
                    },50);
                }else{
                    this.isShow=v;
                     this.translateLocation={
                       top:this.defaultLocation.top,
                       left:this.defaultLocation.left
                   };
                    this.timer=setTimeout(t=>{
                        this.isOpen=v;
                        clearTimeout(this.timer);
                    },200);
                }
            }
        },
        methods: {
            closeModal(n){
                if(!this.maskClosable&&n===1)return;
                this.open=false;
                this.$emit('closeModal',n?n:false);
                //window.removeEventListener('keyup',this.onKeyUp);
            },
            openModal(ev){
                ev.preventDefault();
                if(!ev.clientX&&!ev.clientY)return;
                if(ev){
                    this.translateLocation=this.defaultLocation={
                        top:ev.clientY+'px',
                        left:ev.clientX+'px'
                    }
                }
                this.open=true;
                window.addEventListener("keyup",this.onKeyUp)
            },
            onKeyUp(ev){
                ev.preventDefault();
                if(ev.keyCode===27){
                    this.closeModal();
                }else{
                    return false;
                }
            }
        },
        created() {

        },
        mounted() {
        },
        beforeDestroy() {

        }
    }
</script>

<style scoped lang="less">
    .modal-layer {
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        display: none;
        &.open-modal{
            display: block;
        }
        .modal-mask {
            height: 100vh;
            width: 100vw;
            background: rgba(0, 0, 0, 0);
            opacity: 0;
            transition: all .3s;
            &.show-modal-mask{
                opacity: 1;
                background: rgba(0, 0, 0, .4);
            }
        }

        .modal-wrap {
            width: 520px;
            min-height: 180px;
            background: #fff;
            position: fixed;
            top: 300px;
            left: 50%;
            transform: translate(-30%,-58%) scale(.3);
            box-shadow: 0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05);
            pointer-events: auto;
            border-radius: 2px;
            transition: all .3s;
            &.show-modal-wrap{
                opacity: 1;
                transform: translateX(-50%) scale(1);
            }
            &.hide-modal-wrap{
                transition: all .2s;
                opacity: 0;
                transform: translate(-30%,-58%) scale(0);
            }
            .modal-header {
                padding: 16px 24px;
                border-bottom: 1px solid #f0f0f0;
                border-radius: 2px 2px 0 0;
                line-height: 22px;
                position: relative;
                .modal-title {
                    color: rgba(0, 0, 0, .85);
                    font-weight: 500;
                    font-size: 16px;
                }

                .modal-close-btn {
                    position: absolute;
                    right: 0;
                    top: 0;
                    height: 56px;
                    line-height: 56px;
                    width: 56px;
                    text-align: center;
                    cursor: pointer;
                    color: rgba(0, 0, 0, .5);
                    font-size: 30px;
                    user-select: none;
                }
            }
            .modal-content{
                min-height: 80px;
                max-height: 500px;
                overflow: auto;
                padding: 10px 24px;
            }
            .modal-footer{
                padding: 10px 16px;
                display: flex;
                justify-content: flex-end;
                border-top: 1px solid #f0f0f0;
                .btn{
                    height: 32px;
                    line-height: 32px;
                    padding: 0 20px;
                    margin-left: 10px;
                }
            }
        }
    }
</style>
