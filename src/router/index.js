import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: resolve => require(['@/pages/home'], resolve),
            meta: {
                keepAlive: true, // 需要被缓存,有输入框建议设为true
                title: "首页",
                icon: "fa-home"
            }
        },
        {
            path: '/commonUse',
            name: 'commonUse',
            //component:  r => require.ensure([], () => r(require('@/pages/secondaryRouteGuidancePage')), 'commonUse'),
            component: resolve => require(['@/pages/secondaryRouteGuidancePage'], resolve),
            //redirect: '/commonUse/button',//默认子路由
            meta: {
                //keepAlive: true,
                title: "通用",
                icon: "fa-road"
            },
            children: [
                {
                    path: '/commonUse/button',
                    name: 'buttons',
                    component: r => r(require('@/pages/commonUse/button')),
                    meta: {
                        keepAlive: true,
                        isChild: true,
                        title: "按钮"
                    }
                }, {
                    path: '/commonUse/icons',
                    name: 'icons',
                    component: r => r(require('@/pages/commonUse/icons')),
                    meta: {
                        isChild: true,
                        title: "图标库"
                    }
                },
            ]
        },
        {
            path: '/table',
            name: 'table',
            component: r => require.ensure([], () => r(require('@/pages/table')), 'table'),
            meta: {
                title: "表格",
                icon: "fa-table"
            }
        },
        {
            path: '/result',
            name: 'result',
            component: resolve => require(['@/pages/secondaryRouteGuidancePage'], resolve),
            //redirect: '/commonUse/button',//默认子路由
            meta: {
                title: "结果页",
                icon: "fa-road"
            },
            children: [
                {
                    path: '/result/success',
                    name: 'success',
                    component: r => r(require('@/pages/result/success')),
                    meta: {
                        isChild: true,
                        title: "成功页"
                    }
                }, {
                    path: '/result/icons',
                    name: 'fail',
                    component: () => import('@/pages/result/fail'),
                    meta: {
                        keepAlive: true,
                        isChild: true,
                        title: "失败页"
                    }
                },
            ]
        },
        {
            path: '/notice',
            name: 'notice',
            component: resolve => require(['@/pages/secondaryRouteGuidancePage'], resolve),
            meta: {
                title: "反馈",
                icon: "fa-th-large"
            },
            children: [
                {
                    path: '/notice/alert',
                    name: 'alert',
                    component: r => r(require('@/pages/notice/alert')),
                    meta: {
                        isChild: true,
                        title: "Alert警告提示"
                    }
                },
                {
                    path: '/notice/modalPage',
                    name: 'modalPage',
                    component: r => r(require('@/pages/notice/modalPage')),
                    meta: {
                        isChild: true,
                        title: "Modal对话框"
                    }
                },
                {
                    path: '/notice/dropDownPage',
                    name: 'dropDownPage',
                    component: r => r(require('@/pages/notice/dropDownPage')),
                    meta: {
                        isChild: true,
                        title: "下拉选择"
                    }
                },
            ]
        }
    ]
})

// 全局混入，关闭tab时清除组件缓存
/*Vue.mixin({
    beforeRouteLeave(to, from, next) {
        let flag = true
        console.log(this.$vnode)
        if(flag && this.$vnode.parent && this.$vnode.parent.componentInstance.cache) {
            let key = this.$vnode.key   // 当前关闭的组件名
            let cache = this.$vnode.parent.componentInstance.cache  // 缓存的组件
            let keys = this.$vnode.parent.componentInstance.keys  // 缓存的组件名
            console.log(key,cache,keys)
            if(cache[key] != null) {
                delete cache[key]
                let index = keys.indexOf(key)
                if(index > -1) {
                    keys.splice(index, 1)
                }
            }
        }
        next()
    }
})*/

