// 暴露
export default {
  //局部
  state: {
    menu: ""
  },
  //全局
  //提交一个东西，修改状态树
  mutations: {
    //修改导航
    setmenu(state, data) {
      if (data <= 2) {
        state.menu =
          data < 2
            ? [true, true, true, true, true, true]
            : [true, true, true, true, false, false];
      } else {
        state.menu = [true, true, true, false, false];
      }
    }
  }
};
