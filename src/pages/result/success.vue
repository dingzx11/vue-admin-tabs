<template>
    <div>
        name: "success"
<!--        <button class="btn-primary" @mouseenter="mouseenter" @mouseleave="mouseleave">click me</button>-->
<!--        <div :class="['test-box',fadeType?'fadeIn':'fadeOut',hideBox?'hide':'show']" @mouseenter="boxEnter" @mouseleave="boxLeave">-->

<!--        </div>-->
    </div>
</template>

<script>
    export default {
        name: "success",
        data(){
            return{
                fadeType:false,
                hideBox:true,
                leaveTimer:""
            }
        },
        methods:{
            mouseenter(){
                clearTimeout(this.leaveTimer);
                this.hideBox=false;
                setTimeout(t=>{
                    this.fadeType=true;
                },20);
            },
            mouseleave(){
                this.leaveTimer=setTimeout(a=>{
                    this.fadeType=false;
                    this.leaveTimer=setTimeout(t=>{
                        this.hideBox=true;
                    },200);
                },100);

            },
            boxEnter(){
                clearTimeout(this.leaveTimer);
            },
            boxLeave(){
                this.mouseleave();
            }
        }
    }
</script>

<style scoped>
.test-box{
    height: 200px;
    width: 200px;
    background: #1ec3c8;
    opacity: 0;
    transition: .3s;
}
.hide{
    display: none;
}
.show{
    display: block;
}
.fadeIn{
    /*display: block;
    animation:showBox .5s;
    animation-fill-mode: forwards;*/
    opacity: 1;
}
.fadeOut{
  /*  animation:hideBox .3s;
    animation-fill-mode: forwards;*/
    opacity: 0;
}


/*animation: name duration timing-function delay iteration-count direction;
  animation-duration 属性定义动画完成一个周期所需要的时间，以秒或毫秒计。
  animation-timing-function 规定动画的速度曲线。
  animation-delay 属性定义动画何时开始。  animation-delay: time;
  animation-iteration-count 属性定义动画的播放次数。  animation-iteration-count: n|infinite;
  animation-direction 属性定义是否应该轮流反向播放动画  animation-direction: normal|alternate;。


    动画填充模式（animation-fill-mode）
    animation-fill-mode是指给定动画播放前后应用元素的样式。
    single-animation-fill-mode = **none **| **forwards **| **backwards **| both
    animation-fill-mode: none 动画执行前后不改变任何样式
    animation-fill-mode: forwards 保持目标动画最后一帧的样式
    animation-fill-mode: backwards 保持目标动画第一帧的样式
    animation-fill-mode: both 动画将会执行 forwards 和 backwards 执行的动作。
    ————————————————

*/
@keyframes showBox{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}@keyframes hideBox{
    0%{
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
}

</style>
