import Vue from "vue";
import msgToastVue from "./messageBox";
import modalConfirmVue from "./modalConfirm";

const msgToast=(content,t)=>{
    let init;
    let msgBox=Vue.extend(msgToastVue);
    //生成组件
    init=new msgBox();
    if(typeof content==="string"){
        init.content=content;
        init.timeOut=t;
    }else{
        Object.assign(init,content);
    }
    //组件挂载到dom元素上
    init.vm=init.$mount();
    document.body.appendChild(init.vm.$el);
};
const modalConfirm=(options)=>{
    let modalConfirm=Vue.extend(modalConfirmVue);
    let modalConfirmConfig= new modalConfirm();
    Object.assign(modalConfirmConfig,options);
    modalConfirmConfig.vm=modalConfirmConfig.$mount();
    document.body.appendChild(modalConfirmConfig.vm.$el);
    return  modalConfirmConfig.openModal(options.event).then(val=>{
        modalConfirmConfig=null;
        return Promise.resolve(val)
    }).catch(err=>{
        modalConfirmConfig=null;
        return Promise.reject(err)
    });
};

export {msgToast,modalConfirm}
