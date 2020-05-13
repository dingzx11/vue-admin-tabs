import vue from "vue";

import pageInfo from "./pageInfo";
import fixedScrollTable from "./fixedScrollTable";
import modal from "./modal"
import dropDown from "./dropDown"

/*注册为公共组件*/
vue.component('pageInfo',pageInfo);
vue.component('fixedScrollTable',fixedScrollTable);
vue.component('modal',modal);
vue.component('dropDown',dropDown);

import {msgToast,modalConfirm} from "./index"
/*原型绑定组件*/
vue.prototype.$msgToast = msgToast;
vue.prototype.$modalConfirm = modalConfirm;
