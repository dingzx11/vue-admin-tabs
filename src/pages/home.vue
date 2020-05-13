<template>
    <div class="home padding-right-20 padding-top-10 overflow-initial">
        <div class="padding-bottom-20">
            <ul class="panel">
                <li class="panel-body">
                    <div class="circle-icon bg-success"><i class="fa fa-microphone"></i></div>
                    <div>
                        <h4>5,268</h4>
                        <p>新留言</p>
                    </div>
                </li>
                <li class="panel-body">
                    <div class="circle-icon bg-danger"><i class="fa fa-anchor"></i></div>
                    <div>
                        <h4>127,868</h4>
                        <p>新留言</p>
                    </div>
                </li>
                <li class="panel-body">
                    <div class="circle-icon bg-default"><i class="fa fa-magnet"></i></div>
                    <div>
                        <h4>68</h4>
                        <p>总访客</p>
                    </div>
                </li>
                <li class="panel-body">
                    <div class="circle-icon bg-primary"><i class="fa fa-video-camera"></i></div>
                    <div>
                        <h4>123</h4>
                        <p>新留言</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="mod_default_box">
            <div class="mod_default_hd">平台公告</div>
            <div class="mod_default_bd">
                <ul class="info-list">
                    <li>
                        <p>小程序管理后台新增页面收录设置的开关</p>
                        <span>2019-03-26</span>
                    </li>
                    <li>
                        <p>功能上线功能上线功能上线</p>
                        <span>2018-11-05</span>
                    </li>
                    <li>
                        <p>平台公告平台公告功能上线</p>
                        <span>2018-11-05</span>
                    </li>
                </ul>
                <ul class="info-list">
                    <li>
                        <p>小程序管理后台新增页面收录设置的开关</p>
                        <span>2019-03-26</span>
                    </li>
                    <li>
                        <p>功能上线功能上线功能上线</p>
                        <span>2018-11-05</span>
                    </li>
                    <li>
                        <p class="watch-more">查看更多</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        components: {},
        data() {
            return {

            }
        },
        methods:{

        },
        mounted() {

        },
        beforeDestroy() {

        },
        deactivated(){
            //关闭标签页清除缓存
            //this.$destroy();
        }
    }
</script>

<style lang="less" scoped>
.home{
    .mod_default_box{
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 1px 4px rgba(150, 150, 150, 0.3);
        padding: 20px 30px 30px;
        .mod_default_hd{
            margin-bottom: 30px;
            font-weight: 400;
            font-size: 20px;
            display: inline-block;
            margin-right: 20px;
            padding: 0;
        }
        .mod_default_bd{
            display: flex;
            justify-content: space-between;
            position: relative;
            //flex-wrap: wrap;
            &:before{
                content: "";
                height: 100%;
                width: 1px;
                background:rgba(150, 150, 150, 0.5);
                position: absolute;
                left: 50%;
            }

            >ul{
                flex: 0 0 40%;
            }
        }
    }

}
</style>
