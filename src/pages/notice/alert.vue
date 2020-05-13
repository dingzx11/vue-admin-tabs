<template>
    <div class="padding-right-20">
        <page-info title="Alert警告提示" des="警告提示，展现需要关注的信息。"></page-info>

        <div class="padding-bottom-30">
            <button class="btn btn-success" @click="openAlert('1')">成功提示</button>
            <button class="btn btn-danger" @click="openAlert('2')">失败提示</button>
            <button class="btn btn-info" @click="openAlert('3')">信息提示</button>
            <button class="btn btn-warning" @click="openAlert('4')">警告提示</button>
            <button class="btn btn-warning" @click="openAlert('5')">下边提示</button>
        </div>
        <div class="padding-bottom-20">
            this.$msgToast({
            content:"这是一个信息的弹出提示！",
            placement:"top",
            type:"info"
            });
        </div>

        <table class="table-default">
            <thead>
                <tr>
                    <th>参数</th>
                    <th>说明</th>
                    <th>可选值</th>
                    <th>默认值</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>content</td>
                    <td>弹框显示内容</td>
                    <td>—</td>
                    <td>—</td>
                </tr>
                <tr>
                    <td>placement</td>
                    <td>显示位置</td>
                    <td>top / bottom</td>
                    <td>bottom</td>
                </tr>
                <tr>
                    <td>type</td>
                    <td>显示的弹窗类型</td>
                    <td>success / fail / warning / info</td>
                    <td>info</td>
                </tr>
                <tr>
                    <td>timeOut</td>
                    <td>隐藏延迟，单位毫秒</td>
                    <td>—</td>
                    <td>3000</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    export default {
        name: "alert",
        data(){
            return{

            }
        },
        methods:{
            openAlert(type){
                switch (type) {
                    case "1":
                        this.$msgToast({
                            content:"这是一个成功的弹出提示！",
                            timeOut:2000,
                            placement:"top",
                            type:"success"
                        });
                        break;
                    case "2":
                        this.$msgToast({
                            content:"这是一个失败的弹出提示！",
                            placement:"top",
                            type:"fail"
                        });
                        break;
                    case "3":
                        this.$msgToast({
                            content:"这是一个信息的弹出提示！",
                            placement:"top",
                            type:"info"
                        });
                        break;
                    case "4":
                        this.$msgToast({
                            content:"这是一个警告的弹出提示！",
                            placement:"top",
                            type:"warning"
                        });
                        break;
                    case "5":
                        this.$msgToast({
                            content:"这是一个下边的弹出提示！",
                            placement:"bottom",
                            type:"success"
                        });
                        break;
                }
            }
        }
    }
</script>

<style scoped>

</style>
