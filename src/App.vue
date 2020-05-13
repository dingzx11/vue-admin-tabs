<template>
    <div id="app">
        <div class="page-header">
            <div class="page-title">
                <p>
                    <i :class="[isCollapse?'fa fa-outdent':' fa fa-indent']" @click="switchMenuBox"></i>
                    <span>旅游管理</span>
                </p>
            </div>
            <div>
                <div class="user-box">
                    <drop-down>
                        <div class="user-head-portrait">
                            <img src="./assets/imgs/user.png" alt="">
                        </div>
                        <div slot="dropdown">
                            <ul class="select-list">
                                <li>个人设置</li>
                                <li>退出</li>
                            </ul>
                        </div>
                    </drop-down>
                </div>
            </div>
        </div>

        <div class="web-main">
            <div :class="[isCollapse?'nav-box':'nav-box short-nav']" @mouseenter="onmouseNav" @mouseleave="onmouseNav">
                <ul>
                    <li v-for="(item,index) in menuData" :key="item.name" @click.stop="switchMenu(item)"
                        :class="{'has-child':item.children,'is-open':item.height,'shrink-menu':!isCollapse}">
                        <p :class="{'ac':acMenu===item.name}" @mouseenter="mainNavEnter($event,item)" @mouseleave="mainNavLeave(item)">
                            <i :class="['fa', item.icon]"></i> <span>{{item.title}}</span>
                            <i :class="['fa fa-caret-left']" v-if="item.children"></i>
                        </p>
                        <ul :class="['child-menu']"
                            v-if="item.children"
                            :style="{'height':item.height,'top':item.top}" @mouseenter="subMenuEnter(item)" @mouseleave="mainNavLeave(item)">
                            <li v-for="(child,i) in item.children" @click.stop="switchMenu(child)">
                                <p :class="{'ac':acMenu===child.name}" >
                                    <span>{{child.title}}</span>
                                </p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="main-box">
                <ul class="tabs-nav">
                    <li v-for="(item,index) in activeRouter" :class="{'ac':index===activeTab}"
                        @click="switchMenu(item,index)" :key="item.name">
                        <span>{{item.title}}</span><i v-show="activeRouter.length>1" @click.stop="removeTab(index,item)">×</i>
                    </li>
                </ul>
                <div class="main-content-wrap">
                    <keep-alive :include="includeRoute.includeAll">
                        <router-view></router-view>
                    </keep-alive>

                  <!--  <keep-alive>
                        <router-view v-if="$route.meta.keepAlive"></router-view>
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive"></router-view>-->

                </div>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'app',
        data() {
            return {
                activeRouter: [],
                activeTab: 0,
                isCollapse: localStorage.getItem('isCollapse')==='true'?true:false,
                acMenu: '',
                menuData:[],
                includeRoute: {
                    includeAll: [],
                    childInclude: []
                },
                leaveTimer:""
            }
        },
        methods: {
            //左边菜单切换大小
            switchMenuBox(){
                this.isCollapse=!this.isCollapse;
                this.setMenuStyle(location.pathname,1);
                localStorage.setItem('isCollapse',this.isCollapse);
            },
            //移除tab页
            removeTab(index) {
                let path = "";
                if (index === 0 && this.activeRouter.length === 1) {
                    return false;
                }
                let i=this.includeRoute.includeAll.indexOf(this.activeRouter[index].name);
                let j=this.includeRoute.childInclude.indexOf(this.activeRouter[index].name);
                if(i!==-1) {
                    //清除缓存
                    this.includeRoute.includeAll.splice(i, 1);
                    //当二级菜单全部关闭，清除二级缓存
                    if(j!==-1){
                        this.includeRoute.childInclude.splice(j, 1);
                    }
                    if(!this.includeRoute.childInclude.length){
                        this.includeRoute.includeAll.splice(this.includeRoute.includeAll.indexOf('secondaryRouteGuidancePage'),1);
                    }
                    this.$store.commit('setIncludeRoute', this.includeRoute);
                    //adminVue.$emit('removeTab',this.activeRouter[index].name)
                }
                this.activeRouter.splice(index, 1);
                path = this.activeRouter[this.activeRouter.length - 1].path;
                this.activeTab = this.activeRouter.length - 1;
                this.$router.replace(path).catch(e=>e);
            },
            //获取路由文件的菜单
            initMenu(){
                this.$router.options.routes.map((item,index)=>{
                    this.menuData.push({
                        path: item.path,
                        name: item.name,
                        title:item.meta.title,
                        icon:item.meta.icon,
                        height:0
                    });
                    if(item.children){
                        let child=[];
                        item.children.map(itm=>{
                            child.push({
                                path: itm.path,
                                name: itm.name,
                                title:itm.meta.title
                            })
                        });
                        this.menuData[index].children=child;
                        this.menuData[index].height=0;
                    }
                });
                let pathname = window.location.pathname;
                if (pathname === "/") {
                    this.activeRouter.push(this.menuData[0]);
                    this.acMenu = this.menuData[0].name;
                }
            },
            //菜单切换
            switchMenu(item,index){
                if(index||index===0){
                    this.activeTab = index;
                }else{
                    if(item.children){
                        if(this.isCollapse){
                            this.setMenuStyle(item.path);
                        }
                        return false;
                    }
                }
                if(!JSON.stringify(this.activeRouter).includes(item.name)){
                    this.$router.push(item.path).catch(e=>e);
                }else if(item.name!==this.acMenu) {
                    this.$router.replace(item.path).catch(e => e);
                }
            },
            //设置左边菜单选中
            setMenuStyle(path,n){
                for (let i=0;i< this.menuData.length;i++){
                    if(!path){
                        this.menuData[i].height=0;
                    }else{
                        if(this.menuData[i].path===path&&this.menuData[i].children){
                            this.menuData[i].height=this.isCollapse?this.menuData[i].height?0:this.menuData[i].children.length*45+'px':'0px';
                        }else{
                            this.menuData[i].height=0;
                        }
                        if(this.menuData[i].children){
                            for(let j=0;j< this.menuData[i].children.length;j++){
                                let item=this.menuData[i].children[j];
                                if(item.path===path){
                                    this.menuData[i].height=this.isCollapse?this.menuData[i].children.length*45+'px':'0px';
                                    if(!n)return;
                                }
                            }
                        }
                    }
                }
            },

            mainNavEnter(e,item){

            },
            mainNavLeave(item){

            },
            subMenuEnter(item){

            },
            onmouseNav(){
                if(localStorage.getItem('isCollapse')==='false'){
                    this.isCollapse=!this.isCollapse;
                    this.setMenuStyle(location.pathname,1);
                }
            }
        },
        watch: {
            //路由切换
            $route(to, from,next) {
                let name=to.name;
                let path = to.path;
                let title = to.meta.title;
                this.acMenu = name;
                let adStatus = 0;
                if(to.meta.isChild){
                    this.setMenuStyle(to.path);
                }else{
                    this.setMenuStyle();
                }
                this.activeRouter.map((item, index) => {
                    if (item.path === path && item.name === name) {
                        this.activeTab = index;
                        adStatus = 1;
                    }
                });
                if (!adStatus) {
                    this.activeTab = this.activeRouter.length;
                    this.activeRouter.push({name: name, path: path,title:title});
                }
                if(to.meta.keepAlive&&!this.includeRoute.includeAll.includes(name)){
                    if(to.meta.isChild){
                      this.includeRoute.childInclude.push(name);
                      if(!this.includeRoute.includeAll.includes('secondaryRouteGuidancePage')){
                          this.includeRoute.includeAll.push('secondaryRouteGuidancePage');
                      }
                    }
                    this.includeRoute.includeAll.push(name);
                    this.$store.commit('setIncludeRoute',this.includeRoute);
                }
            }
        },
        mounted() {
            this.initMenu();
            //防止页面后退
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
                window.history.forward(1);
            });
        },
        created() {
        }
    }

</script>
<style lang="less">
    @import url("./assets/styles/font-awesome.min.css");
    @import url("./assets/styles/base.less");
    @import url("./assets/styles/admin-site.less");
    @import url("./assets/styles/media.less");

    .page-header {
        height: 50px;
        line-height: 50px;
        background: #414c61;
        color: #fff;
        display: flex;
        justify-content: space-between;
    }

    .page-header .page-title p {
        display: flex;
        align-items: center;
    }

    .page-header i {
        cursor: pointer;
        font-size: 20px;
        margin-right: 20px;
        padding-left: 20px;
    }
    .user-box{
        margin-right: 25px;
        .user-head-portrait{
            margin-top: 5px;
            height: 40px;
            width: 40px;
            overflow: hidden;
            border-radius: 50%;
            img{
                display: block;
                width:100%;
                height: 100%;
            }
        }
    }

    .web-main {
        display: flex;
    }

    .nav-box {
        width: 150px;
        height: 100vh;
        background: #f5f5f5;
        border-right: 1px solid #d9d9d9;
        transition: all .3s;
        flex-shrink: 0;
        overflow: hidden;
         p {
            display: flex;
            align-items: center;
            height: 45px;
            line-height: 45px;
            width: 100%;
            border-bottom: 1px solid #d9d9d9;
            color: #555;
            text-decoration: none;
             cursor: pointer;
             user-select: none;
             position: relative;
            i {
                width: 35px;
                text-align: center;
                padding-left: 10px;
                padding-top: 2px;
                flex-shrink: 0;
                &.fa-home {
                    font-size: 20px;
                }
            }
            span {
                overflow: hidden;
                flex: 0 0 105px;
                opacity: 1;
                transition: opacity .3s;
            }
            &.ac {
                background-color: #fff;
                color: #20a0ff;
            }
             &:hover {
                 background-color: #e6e6e6;
             }
             .fa-caret-left{
                 padding: 0;
                 width: auto;
                 position: absolute;
                 right: 15px;
                 top: 15px;
                 font-size: 16px;
                 transition: all .3s;
             }
        }
        &.short-nav {
            width: 50px;
            p > span {
                opacity: 0;
            }
            .fa-caret-left{
                opacity: 0;
            }
        }
        .has-child{
            >p{
                border-bottom-color: transparent;
            }
        }
        .is-open{
            background: #fff;
            .fa-caret-left{
                transform: rotate(-90deg);
            }
        }
        .child-menu{
            margin-top: -1px;
            //height: 0;
            overflow: hidden;
            transition: all .3s;
            border-bottom: 1px solid #d9d9d9;
            p{
                padding-left: 45px;
                border-bottom:none;
            }
        }

        /*.shrink-menu{
            >p{
                border-bottom-color: #d9d9d9;
            }
            .child-menu{
                position: fixed;
                background: #fff;
                z-index: 2;
                left: 50px;
                width: 150px;
                box-shadow: 0 0 5px 0 #ddd;
                border-bottom: none;
                transition: opacity .3s;
                margin-left: 5px;
                p {
                    padding-left: 10px;
                    &:hover{
                        background: transparent;
                        >span{
                            color: #20a0ff;;
                        }
                    }
                    span {
                        opacity: 1;
                    }
                }
            }
            .show-fixed-sub{
                display: block;
            }
            .hide-fixed-sub{
                display: none;
            }
            .fade-show{
                opacity: 1;
            }
            .fade-hide{
                opacity: 0;
            }
        }*/
    }

    .tabs-nav {
        display: flex;
        width: 100%;
        background: #f5f5f5;
        overflow: hidden;
        padding-top: 6px;
        padding-left: 4px;
        position: relative;
        margin-bottom: 10px;
        user-select: none;
        &:after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 3;
            width: 100%;
            border-bottom: 1px solid #d1d1d19c;
        }

        li {
            height: 25px;
            line-height: 25px;
            min-width: 120px;
            background: #e6e6e6;
            color: #3f4348;
            font-size: 13px;
            display: flex;
            justify-content: space-between;
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
            position: relative;
            z-index: 2;
            margin-left: 6px;
            padding: 0 5px 0 8px;
            border-top: 1px solid #d1d1d1cc;

            &:after {
                content: "";
                height: 28px;
                width: 8px;
                background: #e6e6e6;
                border-top-right-radius: 3px;
                transform: rotate(-20deg);
                position: absolute;
                right: -4px;
                top: 0;
                z-index: 1;
                border-right: 1px solid #d1d1d1cc;
            }

            &:before {
                content: "";
                height: 28px;
                width: 8px;
                background: #e6e6e6;
                border-top-left-radius: 3px;
                transform: rotate(17deg);
                position: absolute;
                left: -3px;
                top: 0;
                border-left: 1px solid #d1d1d1cc;
            }

            i {
                font-size: 18px;
                cursor: pointer;
                position: absolute;
                right: 3px;
                top: 6px;
                height: 15px;
                width: 15px;
                line-height: 15px;
                text-align: center;
                z-index: 2;
                border-radius: 50%;
            }

            &.ac {
                background: #fff;
                color: #000;
                z-index: 5;

                &::before {
                    background: #fff;
                }

                &::after {
                    background: #fff;
                }
            }
        }
    }

    .main-box {
        flex: 1;
        overflow: hidden;
    }

    .main-content-wrap {
        height: calc(100vh - 98px);
        overflow: hidden;
        padding-left: 20px;
        > div {
            height: 100%;
            overflow: auto;
        }
    }

</style>
