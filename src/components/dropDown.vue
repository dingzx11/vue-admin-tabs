<template>
    <div ref="dropDown" class="dropDown-box">
        <div class="dropDown-header" @click="openDropBox">
            <slot></slot>
            <input class="hidden-input" type="text" @focus="onfocus" ref="inputBox" @blur="onblur">
        </div>
        <div :class="['dropDown-main',openDrop?'show-dropDown':'',dropDownRight?'show-right':'']" ref="dropList">
            <div class="dropDown-content">
                <slot name="dropdown"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "dropDown",
        props: {},
        data() {
            return {
                openDrop: false,
                timeOuter: "",
                dropDownRight:false
            }
        },
        methods: {
            onfocus() {
                this.openDrop = true;
            },
            onblur() {
                this.timeOuter = setTimeout(t => {
                    this.openDrop = false;
                }, 100);
            },
            openDropBox() {
                clearTimeout(this.timeOuter);
                let clientWidth=document.documentElement.clientWidth||document.body.clientWidth;
                if(this.$refs.dropDown.offsetLeft+this.$refs.dropList.offsetWidth+200>clientWidth){
                    this.dropDownRight=true;
                }
                this.$refs.inputBox.focus();
            }
        },
        watch: {},
        mounted() {

        }
    }
</script>

<style scoped lang="less">
    .dropDown-box {
        display: inline-block;
        position: relative;
        .dropDown-header {
            //padding: 0 15px;
            display: flex;

            > .hidden-input {
                height: 0;
                width: 0;
                padding: 0;
                border: none;
            }
        }

        .dropDown-main {
            position: absolute;
            left: 0;
            z-index: 9;
            background: #fff;
            border: 1px solid #ebeef5;
            border-radius: 4px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
            transition: all .25s;
            opacity: 0;
            min-width: 100%;
            transform: scaleY(0);
            transform-origin: 0 0;
            padding: 6px 0;
            margin-top: 6px;
            .dropDown-content{
                max-height: 290px;
                overflow: auto;
            }
            /*&:before{
                content: "";
                position: absolute;
                right: 24px;
                top: -8px;
                height: 13px;
                width: 13px;
                background: #fff;
                border-radius: 2px;
                transform: rotate(45deg);
                border: 1px solid #ebeef5;
            }
            &:after{
                content: "";
                position: absolute;
                right: 22px;
                top: -1px;
                height: 11px;
                width: 19px;
                background: #fff;
            }*/
            &.show-dropDown {
                opacity: 1;
                transform: scaleY(1);
            }

            &.show-right {
                left: inherit;
                right: -10px;
            }

            .select-list {
                li {
                    line-height: 36px;
                    padding: 0 20px;
                    margin: 0;
                    font-size: 14px;
                    color: #606266;
                    cursor: pointer;
                    user-select: none;
                    white-space: nowrap;

                    &:hover {
                        background: #ecf5ff;
                        color: #66b1ff;
                    }

                    &.active {
                        color: #1260de;
                    }
                }
            }


        }
    }
</style>
