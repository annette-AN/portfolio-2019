import Vue from 'vue'
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: false,
  state : ()=> ({
    postList: [
      {
        "title": "1프론트엔드 신입에 지원하는 안미례입니다.",
        "type": "use-information",
        "desc": "asdfasdf",
        "file": "",
        "img": ""
      }
    ],
    postIndex: 1
  }),
  actions: {
    add ({ state }, item){
      state.postList.unshift({
        ...item, id: state.postIndex++
      })
    }
  }
});