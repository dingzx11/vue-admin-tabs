<template>
    <div class="padding-right-20 padding-top-10 overflow-initial">
        <page-info title="dropDown 下拉选择" des="下拉选择"></page-info>

        <drop-down>
            <p>这是个标题</p>
            <div slot="dropdown">
                <ul class="select-list">
                   <li>和经济环境和</li>
                   <li>老款归属感</li>
                   <li>olkks</li>
                </ul>
            </div>
        </drop-down>

        <div class="ims">
            <drop-down>
                <div>
                    <img src="../../assets/imgs/user.png" alt="">
                </div>
                <div slot="dropdown">
                    <ul class="select-list">
                        <li>和经济环境和</li>
                        <li>老款归属感</li>
                        <li>olkks</li>
                    </ul>
                </div>
            </drop-down>
        </div>
    </div>
</template>

<script>
    export default {
        name: "dropDownPage",
        data(){
            return{
                fileType:{
                    text:"文件类型",
                    value:"",
                    dropDownList:[
                        {value:"",label:"全部"},
                        {value:"1",label:"上传"},
                        {value:"2",label:"下载"}
                    ]
                }
            }
        }
    }
</script>

<style scoped>
.ims{
    display: flex;
    justify-content: flex-end;
}
</style>
