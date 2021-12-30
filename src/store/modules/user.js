export default {
  state: {
    info: ""
  },
  //修改当前用户信息
  mutations: {
    setInfo(state, data) {
      state.info = data;
    }
  }
};
