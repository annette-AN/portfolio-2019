import Vue from 'vue'
import Vuex from "vuex";
Vue.use(Vuex);

import { typeOptions } from  '@/constants/options';

export default new Vuex.Store({
  strict: false,
  state : ()=> ({
    postList: [],
    postIndex: 1
  }),
  //methods like
  actions: {
    add ({ state } , item) {
      state.postList.unshift({
        ...item, id: state.postIndex++
      })
    }
  },
  //computed like
  getters: {
    typeOptions (){
      return typeOptions;
    }
  }
});