import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        includeRoute:{
            includeAll:[],
            childInclude:[]
        }
    },
    mutations:{
        setIncludeRoute(state,data){
            state['includeRoute']=data;
        }
    },
    getters:{
        getIncludeRoute: state => state.includeRoute
    },
    actions:{
        add:(context,value)=>{
            context.commit('setNum',value);
        }
    }
});

//this.$store.commit('setDemoValue', value);
//this.$store.getters.getDemoValue
//this.$store.dispatch('add', 5);
