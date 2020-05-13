<template>
    <div :class="['dingding-fixed-table',isTotal?'is-total-table':'']">
        <div :class="['left-table-box',scrollLeft>0?'show-border-right':'']" :style="fixedStyle"
             v-if="fixedStyle.flexBasic">
            <div :class="['table-header-fixed']">
                <table class="dingding-table" ref="hiddenTableTh">
                    <slot name="thead"></slot>
                    <slot name="tbody-total"></slot>
                </table>
            </div>
            <div class="table-body-main">
                <table class="dingding-table" :style="{'transform':`translateY(-${scrollTop}px)`}">
                    <slot name="tbody"></slot>
                </table>
            </div>
        </div>
        <div class="right-table-box">
            <div class="table-header-fixed" :style="{'transform':`translateX(-${scrollLeft}px)`}">
                <table class="dingding-table">
                    <slot name="thead"></slot>
                    <slot name="tbody-total"></slot>
                </table>
            </div>
            <div class="table-body-main" ref="scrollTable" @scroll="scrollEvent">
                <table class="dingding-table">
                    <slot name="tbody"></slot>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "fixedScrollTable",
        props: {
            "isTotal": {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                scrollLeft: 0,
                scrollTop: 0,
                fixedStyle: {
                    flexBasic: 150
                }
            }
        },
        methods: {
            scrollEvent(ev) {
                //console.log(ev.target.scrollLeft, ev.target.scrollTop)
                this.scrollLeft = ev.target.scrollLeft;
                this.scrollTop = ev.target.scrollTop;
            },
            getFixedTh() {
                let trs = this.$refs.hiddenTableTh.children[0].children[0].children;
                this.fixedStyle.flexBasic = 0;
                for (let i = 0; i < trs.length; i++) {
                    let item = trs[i];
                    if (item.dataset.set === "fixed") {
                        this.fixedStyle.flexBasic = item.offsetWidth;
                        break;
                    }
                }
                if (this.fixedStyle.flexBasic) {
                    this.fixedStyle.flexBasic += 'px';
                }
            }
        },
        mounted() {
            this.getFixedTh();
        }
    }
</script>

<style scoped lang="less">
    .dingding-fixed-table {
        display: flex;
        background: #fff;
        width: 100%;
        overflow: hidden;
        max-height: 100%;

        .right-table-box, .left-table-box {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            max-height: 100%;

            .table-header-fixed {
                min-height: 52px;
                flex-shrink: 0;
                padding-right: 6px;
            }

            .table-body-main {
                overflow: auto;
            }
        }

        .left-table-box {
            flex-shrink: 0;
            flex-grow: 0;
            flex-basis: 150px;
            //flex: 0 0 150px;
            overflow: hidden;

            .table-header-fixed {
                padding-right: 0;
            }

            .table-body-main {
                overflow: hidden;
            }

            &.show-border-right {
                border-right: 1px solid rgba(203, 203, 203, .5);
            }
        }

        .right-table-box {
            .table-header-fixed, .table-body-main {
                .dingding-table {
                    thead th[data-set="fixed"], tbody td[data-set="fixed"] {
                        display: none;
                    }
                }
            }

            .table-header-fixed {
                .dingding-table {
                    position: relative;

                    thead {
                        &:after {
                            content: "";
                            height: 100%;
                            width: 6px;
                            background: #fff;
                            position: absolute;
                            right: -6px;
                            top: -2px;
                            border-bottom: 2px solid #f3f3f5;
                        }
                    }
                }
            }
        }
    }

    .is-total-table {
        .left-table-box, .right-table-box {
            .table-header-fixed {
                table.dingding-table thead {
                    &:after {
                        border: 0
                    }

                    th {
                        border-bottom: 0;
                    }
                }

                table.dingding-table tbody {
                    &:after {
                        content: "";
                        height: 52px;
                        width: 6px;
                        background: #f3f3f5;
                        position: relative;
                        right: -6px;
                        top: 50px;
                        border-bottom: 2px solid #f3f3f5;
                    }

                    td {
                        color: #1260de;
                        border-bottom: 2px solid #f3f3f5;
                    }
                }
            }

            .table-body-main {
                table.dingding-table tbody tr:nth-child(odd) td {
                    background: #fff;
                }

                table.dingding-table tbody tr:nth-child(even) td {
                    background: #F8F8FA;
                }
            }
        }
    }
</style>
