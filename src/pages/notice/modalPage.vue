<template>
    <div class="modal-page padding-right-20">
        <page-info title="Modal 对话框" des="模态对话框。"></page-info>
        <div class="padding-bottom-30 btn-box">
            <button class="btn" @click="$refs.modal.openModal($event)">模态对话框</button>
            <button class="btn" @click="$refs.modal.openModal($event)">模态对话框</button>
            <button class="btn" @click="openModal($event)">模态对话框</button>
        </div>
        <modal ref="modal" :modalTitle="modalConfig.title">
            <div slot="body">
                <div class="modal-content">
                    <p v-for="item in 10">{{item}}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn" @click="$refs.modal.closeModal()">取 消</button>
                    <button class="btn btn-primary" @click="$refs.modal.closeModal()">确 定</button>
                </div>
            </div>
        </modal>
        <div class="padding-bottom-10">参数设置：</div>
        <table class="table-default">
            <tr>
                <th>参数</th>
                <th>说明</th>
                <th>可选值</th>
                <th>默认值</th>
            </tr>
            <tr>
                <td>maskClosable</td>
                <td>点击遮罩是否关闭</td>
                <td>true / false</td>
                <td>true</td>
            </tr>
            <tr>
                <td>closable</td>
                <td>是否显示右上角的关闭按钮</td>
                <td>true / false</td>
                <td>true</td>
            </tr>
            <tr>
                <td>modalWidth</td>
                <td>弹窗的宽度</td>
                <td>数字或字符串</td>
                <td>520</td>
            </tr>
            <tr>
                <td>modalTitle</td>
                <td>弹窗的标题</td>
                <td>—</td>
                <td>温馨提示</td>
            </tr>
        </table>

        <div class="padding-bottom-10 margin-top-30">打开与关闭</div>
        <table class="table-default">
            <tr>
                <th>方法</th>
                <th>说明</th>
                <th>示例</th>
            </tr>
            <tr>
                <td>openModal</td>
                <td>打开弹窗</td>
                <td> this.$refs.modal.openModal(ev)</td>
            </tr>
            <tr>
                <td>closeModal</td>
                <td>关闭弹窗</td>
                <td> this.$refs.modal.closeModal()</td>
            </tr>
        </table>

        <div class="padding-bottom-30 btn-box margin-top-30">
            <button class="btn btn-primary" @click.stop="openConfirm($event)">模态确认框</button>
        </div>
        <p class="">
            对话确认框，用法如下：</p>
        <pre>
            openConfirm(ev) {
                this.$modalConfirm({
                    event: ev,
                    title: "123",
                    type: 'warning',
                    showIcon: true
                }).then(res => {
                        console.log(res)
                }).catch(err=>{
                    console.log(err)
                })
            }
        </pre>
        <div class="padding-bottom-10">参数设置：</div>
        <table class="table-default">
            <tr>
                <th>参数</th>
                <th>说明</th>
                <th>可选值</th>
                <th>默认值</th>
            </tr>
            <tr>
                <td>event</td>
                <td>触发事件载体</td>
                <td>—</td>
                <td>—</td>
            </tr>
            <tr>
                <td>title</td>
                <td>弹窗的标题</td>
                <td>—</td>
                <td>温馨提示</td>
            </tr>
            <tr>
                <td>content</td>
                <td>显示的内容</td>
                <td>—</td>
                <td>—</td>
            </tr>
            <tr>
                <td>type</td>
                <td>显示图标类型</td>
                <td>success/fail/warning</td>
                <td>warning</td>
            </tr>
            <tr>
                <td>showIcon</td>
                <td>是否显示内容icon</td>
                <td>true / false</td>
                <td>true</td>
            </tr>
            <tr>
                <td>showOkBtn</td>
                <td>显示确定按钮</td>
                <td>true / false</td>
                <td>true</td>
            </tr>
            <tr>
                <td>showCancelBtn</td>
                <td>显示取消按钮</td>
                <td>true / false</td>
                <td>true</td>
            </tr>
            <tr>
                <td>okText</td>
                <td>确定按钮文字</td>
                <td>—</td>
                <td>确定</td>
            </tr>
            <tr>
                <td>cancelText</td>
                <td>取消按钮文字</td>
                <td>—</td>
                <td>取消</td>
            </tr>
            <tr>
                <td>okCallback</td>
                <td>确定按钮回调</td>
                <td>true / false</td>
                <td>true</td>
            </tr>
            <tr>
                <td>cancelCallback</td>
                <td>取消按钮回调</td>
                <td>true / false</td>
                <td>false</td>
            </tr>
        </table>

    </div>
</template>

<script>
    export default {
        name: "modalPage",
        data() {
            return {
                modalConfig: {
                    title: "测试标题",
                }
            }
        },
        methods: {
            openModal(ev) {
                //console.log(ev.clientX,ev.clientY)
                this.$refs.modal.openModal(ev)
            },
            openConfirm(ev) {
                this.$modalConfirm({
                    event: ev,
                    title: "123",
                    content:"显示内容",
                    type: "warning"
                }).then(res => {
                    console.log(res)
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        mounted() {
            // this.$refs.modal.openModal();

        }
    }
</script>

<style scoped lang="less">
    .modal-page {
        padding-bottom: 50px;
        .btn-box {
            display: flex;
            justify-content: space-between;
        }
    }
</style>
