<template>
    <div ref="dropDown" :class="{'sdp-dropDown-box':true,'sdp-dropDown-multiple-box':multiple,'not-update-title-select':noUpdateTitle}">
        <span class="sdp-dropDown-title" @click="clickTitle">
            <input type="text" @focus="onfocus" ref="inputBox" @blur="onblur">
            {{dropDownTitleTxt}}
            <i v-if="noUpdateTitle" :class="['fa fa-filter',selected?'active':'']"></i>
           <!-- <i v-else :class="['fa fa-caret-left',selected?'active':'']"></i>-->
            <em v-show="multipleConfig.listId.length>1">{{multipleConfig.listId.length}}</em>
        </span>
        <span v-if="noUpdateTitle" :class="{'sdp-dropDown-list':true,'show-arrow':openDrop}"></span>
        <ul ref="dropList" :class="{'sdp-dropDown-list':true,'show-dropDown':openDrop,'sdp-dropDown-list-multiple':multiple,'is-all-choose':multipleConfig.isAll,'show-right':dropDownRight}">
            <li v-for="(item,index) in dropDownList" :class="{'active':(!multiple&&item[values]===selected)||(multiple&&multipleConfig.listId.includes(item[values])&&item[values]!==''),
            'active is-all':multipleConfig.isAll&&item[values]===''}" :key="item[values]+index" @click="selectItem(item)">
                <i class="icon-selected" v-if="multiple"></i>{{item[label]}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "dropDown",
        props:{
            value:{},
            dropDownTitle:{
                type:String,
                default:"标题显示"
            },
            dropDownList:{
                type:Array,
                default:()=>{
                    return [
                        {value:"",label:"全部"},
                        {value:"1",label:"待发送"},
                        {value:"2",label:"发送中"},
                        {value:"3",label:"已完成"},
                        {value:"4",label:"发送失败"}
                    ]
                }
            },
            label:{
                //显示的字段名
                type:String,
                default:"label"
            },
            values:{
                //取值字段
                type:String,
                default:"value"
            },
            multiple:{
                //多选
                type:Boolean,
                default:false
            },
            noUpdateTitle:{
               //不更新标题
               type:Boolean,
               default:false
            }
        },
        data(){
            return{
                openDrop:false,
                selected:"",
                selectedItem:{},
                minWidth:0,
                dropDownTitleTxt:this.dropDownTitle,
                multipleConfig: {
                    isClick:false,
                    list:[],
                    listId:[],
                    listTwo:[],
                    isFirst:true,
                    isAll:false,
                    hasAll:false
                },
                dropDownRight:false,
                timeouter:""
            }
        },
        methods:{
            onfocus(){
                this.openDrop=true;
            },
            onblur(){
                this.timeouter = setTimeout(t=>{
                    if(this.multipleConfig.isClick){
                        this.$refs.inputBox.focus();
                        this.multipleConfig.isClick=false;
                    }else{
                        this.openDrop=false;
                        if(this.multiple){
                            this.$emit("input",this.multipleConfig.listId);
                            if(this.checkChange()){
                                this.$emit("change",this.multipleConfig.list)
                            }
                        }
                    }
                },200)
            },
            checkChange(){
                if(this.multipleConfig.listId.length!==this.multipleConfig.listTwo.length){
                    return true;
                }else if(!this.multipleConfig.listId.length&&!this.multipleConfig.listTwo.length){
                    return  false;
                }else{
                    for (let i= 0;i<this.multipleConfig.listId.length;i++){
                        let item =this.multipleConfig.listId[i];
                        if(!this.multipleConfig.listTwo.includes(item)){
                            return true;
                        }
                        if(i===this.multipleConfig.listId.length-1){
                            return  false;
                        }
                    }
                }
            },

            clickTitle(){
                if(this.openDrop)return;
                this.dropDownRight=false;
                let clientWidth=document.documentElement.clientWidth||document.body.clientWidth;
                if(this.$refs.dropDown.offsetLeft+this.$refs.dropList.offsetWidth+200>clientWidth){
                    this.dropDownRight=true;
                }
                this.$refs.inputBox.focus();
                if(this.multiple){
                    this.multipleConfig.listTwo=JSON.parse(JSON.stringify(this.multipleConfig.listId))
                }
            },

            selectItem(item){
                if(this.multiple){
                    this.multipleConfig.isClick=true;
                    if(item[this.label]==="全部"){
                        if(this.multipleConfig.isAll){
                            this.multipleConfig.listId=[];
                            this.multipleConfig.list=[];
                            this.multipleConfig.isAll=false;
                        }else{
                            this.multipleConfig.listId=[];
                            this.multipleConfig.list=[];
                            this.dropDownList.map(child=>{
                                if(child[this.label]==='全部'){
                                    this.multipleConfig.listId.push(child[this.values]);
                                    this.multipleConfig.list.push(child);
                                }
                            });
                            this.multipleConfig.isAll=true;
                        }
                    }else{
                        let index=this.multipleConfig.listId.indexOf(item[this.values]);
                        if(index>-1){
                            this.multipleConfig.listId.splice(index,1);
                            this.multipleConfig.list.splice(index,1);
                            this.multipleConfig.isAll=false;
                        }else{
                            this.multipleConfig.listId.push(item[this.values]);
                            this.multipleConfig.list.push(item);
                        }
                    }
                    this.setDropDownTitle();
                }else{
                    this.selected=item[this.values];
                    this.selectedItem=item;
                    if(this.noUpdateTitle)return;
                    if(!item[this.values]&&item[this.value!==0]){
                        this.dropDownTitleTxt=this.dropDownTitle;
                    }else{
                        this.dropDownTitleTxt=item[this.label];
                    }

                }
            },
            setDropDownTitle(){
                if(this.multipleConfig.listId.length===this.dropDownList.length-1&&this.multipleConfig.hasAll){
                    this.multipleConfig.isAll=true;
                }
                if(this.noUpdateTitle)return;
                if(this.multipleConfig.list.length===1){
                    this.dropDownTitleTxt=this.multipleConfig.list[0][this.label];
                }else{
                    this.dropDownTitleTxt=this.dropDownTitle;
                }
            },

            setDefault(){
                if(this.multiple){
                    if(this.value.length&&!this.multipleConfig.listId.length&&this.multipleConfig.isFirst){
                        this.multipleConfig.isFirst=false;
                        this.dropDownList.map(item=>{
                            if(this.value.includes(item[this.values])){
                                this.multipleConfig.listId.push(item[this.values]);
                                this.multipleConfig.list.push(item);
                            }
                        });
                        this.multipleConfig.listTwo=JSON.parse(JSON.stringify(this.multipleConfig.listId));
                        this.setDropDownTitle();
                    }
                    if(!this.value.length&&this.multipleConfig.listId.length){
                        this.multipleConfig.listId=[];
                        this.multipleConfig.list=[];
                        this.multipleConfig.listTwo=[];
                        this.setDropDownTitle();
                        this.$emit("change",this.multipleConfig.list);
                    }
                }else{
                    for(let i=0;i<this.dropDownList.length;i++){
                        let item =this.dropDownList[i];
                        if(item[this.values]===this.value){
                            this.selectedItem=item;
                            this.selected=this.value;
                            if(this.noUpdateTitle)return;
                            this.dropDownTitleTxt=!this.value&&this.value!==0?this.dropDownTitle:item[this.label];
                            return;
                        }
                    }
                }
            }
        },
        watch:{
            selected(n){
                if(this.multiple)return;
                this.$emit("input",n);
                if(Object.keys(this.selectedItem).length){
                    this.$emit("change",this.selectedItem);
                }else{
                    this.setDefault();
                }
            },
            value(){
                this.setDefault();
            }
        },
        mounted() {
            if(!this.multiple){
                this.selected=this.value;
            }else{
                this.setDefault();
            }
        }
    }
</script>

<style scoped lang="less">
.sdp-dropDown-box{
    position: relative;
    z-index: 100;
    display: inline-block;
    .sdp-dropDown-title{
        background: #fff;
        display: flex;
        align-items: center;
        cursor: pointer;
        user-select: none;
        position: relative;
        height: 40px;
        line-height: 40px;
        min-width: 200px;
        border:1px solid #ddd;
        padding: 0 15px;
        >input{
            padding: 0;
            width: 0;
            height: 0;
            border: none;
        }
        .fa{
            margin-left: 5px;
            font-size: 12px;
            &.active{
              color: #1260de;
            }
        }
        >em{
            background: #1260de;
            width: 16px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 50%;
            position: absolute;
            color: #fff;
            font-size: 12px;
            right: 15px;
            top: 12px;
        }

    }
    .sdp-dropDown-list{
        position: absolute;
        left: 0;
        top: 42px;
        background: #fff;
        border:1px solid #ebeef5;
        border-radius:4px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        transition: all .25s;
        opacity: 0;
        min-width: 100%;
        transform: scaleY(0);
        transform-origin: 0 0;
        max-height: 290px;
        overflow: auto;
        padding: 10px 0;
        &.show-dropDown{
            opacity: 1;
            transform: scaleY(1);
        }
        &.show-right{
            left:inherit;
            right: 0;
        }
        >li{
            line-height: 36px;
            padding: 0 15px;
            margin: 0;
            font-size: 14px;
            color: #606266;
            cursor: pointer;
            user-select: none;
            white-space: nowrap;
            &:hover{
                background: #ecf5ff;
                color: #66b1ff;
            }
            &.active{
                color: #1260de;
            }
        }
        &.sdp-dropDown-list-multiple{
            >li{
                display: flex;
                align-items: center;
                padding: 0 15px;
                i{
                    margin-right: 5px;
                    color: #929292;
                    font-size: 13px;
                }
                &:hover i{
                    color: #66b1ff;
                }
                &.active{
                    i{
                        color: #1260de;
                    }
                    i:before{
                        content: "!@";
                    }
                }
            }
        }

        &.is-all-choose{
            >li.active{
                i{
                    color: #c6cacc;
                }
                color: #c6cacc;
            }
            li.is-all{
                i{
                    color: #1260de;
                }
                color: #1260de;
            }
        }
    }

    &.not-update-title-select{
        .not-update-select-arrow{
            position: absolute;
            top: 16px;
            right: -8px;
            z-index: 1;
            width: 26px;
            height: 14px;
            background: transparent;
            overflow: hidden;
            transition: all .3s;
            opacity: 0;
            &:before{
                content: "";
                height: 14px;
                width: 14px;
                box-shadow: 0 0 12px 0 rgba(0,0,0,.15);
                transform: rotate(45deg);
                position: absolute;
                top: 6px;
                left: 6px;
                background: #fff;
            }
            &.show-arrow{
                opacity: 1;
            }
        }
        .sdp-dropDown-list{
            top: 28px;
            right: -25px;
            left: unset;
        }
    }

    &.sdp-dropDown-multiple-box{
        .sdp-dropDown-title{
            min-width: 120px !important;
        }
    }
}
</style>
