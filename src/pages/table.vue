<template>
    <div class="padding-right-20">
        <page-info title="table 表格" des="更改table样式，增加相应样式即可"></page-info>
        <p class="padding-bottom-10">正常表格：样式添加table-default</p>
        <div class="padding-bottom-20">
            <table class="table-default table-hover">
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
                    <td>显示内容</td>
                    <td>—</td>
                    <td>—</td>
                </tr>
                <tr>
                    <td>content</td>
                    <td>显示内容</td>
                    <td>—</td>
                    <td>—</td>
                </tr>
                </tbody>
            </table>
        </div>

        <p class="padding-bottom-10">带边框表格：样式添加table-border</p>
        <div class="padding-bottom-20">
            <table class="table-border table-hover">
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
                    <td>显示内容</td>
                    <td>—</td>
                    <td>—</td>
                </tr>
                <tr>
                    <td>content</td>
                    <td>显示内容</td>
                    <td>—</td>
                    <td>—</td>
                </tr>
                </tbody>
            </table>
        </div>

        <p class="padding-bottom-10">斑马纹：样式添加table-stripe</p>
        <div class="padding-bottom-20">
            <table class="table-default table-stripe table-header-transparent">
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
                    <td>显示内容</td>
                    <td>—</td>
                    <td>—</td>
                </tr>
                <tr>
                    <td>content</td>
                    <td>显示内容</td>
                    <td>—</td>
                    <td>—</td>
                </tr>
                <tr>
                    <td>content</td>
                    <td>显示内容</td>
                    <td>—</td>
                    <td>—</td>
                </tr>
                <tr>
                    <td>content</td>
                    <td>显示内容</td>
                    <td>—</td>
                    <td>—</td>
                </tr>
                <tr>
                    <td>content</td>
                    <td>显示内容</td>
                    <td>—</td>
                    <td>—</td>
                </tr>
                </tbody>
            </table>
        </div>

        <p class="padding-bottom-10">固定列表格：fixed-scroll-table自定义组件</p>
        <div style="height: 400px">
            <fixed-scroll-table>
                <thead slot="thead">
                <tr>
                    <th style="width:150px" data-set="fixed">任务名称</th>
                    <th style="width:100px">发送量</th>
                    <th style="width:100px">发送时间</th>
                    <th style="width:80px">成功率</th>
                    <th style="width:80px">成功量</th>
                    <th style="width:80px">失败量</th>
                    <th style="width:80px">失败率</th>
                    <th style="width:100px">有效回复数</th>
                    <th style="width:80px">退订数</th>
                    <th style="width:80px">点击数</th>
                    <th style="width:80px">提交数</th>
                    <th style="width:80px">任务状态</th>
                    <th style="width:80px">操作</th>
                </tr>
                </thead>
                <tbody slot="tbody">
                <tr v-for="item in arrayList">
                    <td style="width:150px" data-set="fixed">{{item.a}}</td>
                    <td style="width:100px">{{item.b}}</td>
                    <td style="width:100px">{{item.c}}</td>
                    <td style="width:80px">{{item.d}}</td>
                    <td style="width:80px">{{item.e}}</td>
                    <td style="width:80px">{{item.f}}</td>
                    <td style="width:100px">{{item.g}}</td>
                    <td style="width:80px">{{item.h}}</td>
                    <td style="width:80px">{{item.i}}</td>
                    <td style="width:80px">{{item.j}}</td>
                    <td style="width:80px">{{item.k}}</td>
                    <td style="width:80px">{{item.l}}</td>
                    <td style="width:80px"><span>操作</span></td>
                </tr>
                </tbody>
            </fixed-scroll-table>

        </div>

    </div>
</template>

<script>
    export default {
        name: "tablePage",
        data(){
            return{
                arrayList:[]
            }
        },
        mounted() {
            for(let i=0;i<20;i++){
                this.arrayList.push({
                    a: "任务名称"+(i+1),
                    b:i*10+15,
                    c:"2020.03.13",
                    d:"30",
                    e:100-i,
                    f:120+i*6,
                    g:20-i,
                    h:78,
                    i:23+i,
                    j:24*i,
                    k:7*i+1,
                    l:12*i,
                    m:12345
                })
            }

        },
        created() {

        }
    }
</script>

<style scoped>

</style>
