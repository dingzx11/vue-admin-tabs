<template>
    <div class="home">
        <fixed-scroll-table v-if="view===1">
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
                <td style="width:80px"><span @click="showToast">操作</span></td>
            </tr>
            </tbody>
        </fixed-scroll-table>

        <fixed-scroll-table is-total v-else>
            <thead slot="thead">
            <tr>
                <th>活动名称</th>
                <th>活动类型</th>
                <th>发送次数</th>
                <th>实际发送量</th>
                <th>浏览量</th>
                <th>访问量</th>
            </tr>
            </thead>
            <tbody slot="tbody-total">
            <tr>
                <td>合计</td>
                <td>--</td>
                <td>123456</td>
                <td>898787</td>
                <td>565</td>
                <td>9998</td>
            </tr>
            </tbody>
            <tbody slot="tbody">
            <tr v-for="item in arrayList">
                <td>{{item.a}}</td>
                <td>{{item.b}}</td>
                <td>{{item.c}}</td>
                <td>{{item.d}}</td>
                <td>{{item.e}}</td>
                <td>{{item.f}}</td>
            </tr>
            </tbody>
        </fixed-scroll-table>
    </div>
</template>

<script>
    export default {
        name:"fixedTable",
        components: {},
        data() {
            return {
                view:1,
                arrayList:[]
            }
        },
        methods:{
            showToast(){
                this.$msgToast("这是一个弹出提示");
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

        }
    }
</script>

<style lang="less" scoped>
    .home{
    }
</style>
