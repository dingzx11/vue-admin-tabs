<template>
   <div class="modal-confirm">
      <modal ref="modalConfirm" :maskClosable="false" :modalTitle="title" @closeModal="destroyDom">
          <div slot="body">
              <div class="modal-content">
                  <div v-show="showIcon" :class="{'icon-box':true,'success':type==='success','fail':type==='fail','warning':type==='warning'}">
                        <i :class="{'fa':true,'fa-check-circle':type==='success','fa-times-circle':type==='fail','fa-exclamation-circle':type==='warning'}"></i>
                  </div>
                  <div class="content-box" v-html="content"></div>
              </div>
              <div class="modal-footer">
                  <button class="btn" v-show="showCancelBtn" @click.stop="closeModal(0)">{{cancelText}}</button>
                  <button class="btn btn-primary" v-show="showOkBtn" @click.stop="closeModal(1)">{{okText}}</button>
              </div>
          </div>
      </modal>
   </div>
</template>

<script>

    export default {
        name: "modalConfirm",
        props:{
            title:{
                type:String,
                default:"温馨提示"
            },
            type:{
                type:String,
                default:"success"
            },
            showIcon:{
              type:Boolean,
              default:true
            },
            showOkBtn:{
                type:Boolean,
                default:true
            },
            okText:{
                type:String,
                default:"确 定"
            },
            okCallback:{
                type:Boolean,
                default:true
            },
            showCancelBtn:{
                type:Boolean,
                default:true
            },
            cancelText:{
                type:String,
                default:"取 消"
            },
            cancelCallback:{
                type:Boolean,
                default:false
            },
            content:{
                type:String,
                default:"内容"
            }
        },
        data(){
            return{
                resolve:"",
                reject:"",
                promise:""
            }
        },
        methods:{
            openModal(e){
                this.$refs.modalConfirm.openModal(e);
                this.promise=new Promise((resolve,reject)=>{
                    this.resolve=resolve;
                    this.reject=reject;
                });
                //返回promise对象
                return this.promise;
            },
            closeModal(n){
                if(n){
                    //确定按钮
                    if(this.okCallback){
                        this.resolve('ok');
                    }
                }else{
                    //取消按钮
                    if(this.cancelCallback){
                        this.reject('cancel');
                    }
                }
                this.$refs.modalConfirm.closeModal();
            },
            destroyDom(n){
                if(n===2){
                    this. closeModal(0);
                    return;
                }
                setTimeout(t=>{
                    this.$destroy();
                    document.body.removeChild(this.$el);
                },300);
            }
        },
        mounted() {

        }
    }
</script>
