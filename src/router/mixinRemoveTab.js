export default {
    mounted() {
        adminVue.$on("removeTab",v=>{
            //console.log(v,this.$options.name);
            /*if(v===this.$options.name){
                //console.log(v)
                this.$destroy();
            }*/

            console.log(this.$vnode)



        });
    },
    beforeDestroy(){
        adminVue.$off("removeTab");
    }
}
