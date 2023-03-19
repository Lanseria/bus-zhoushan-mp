// components/classes_item/index.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object
    },
    type: {
      type: String,
      // classes 全部班级
      // userform 报名单
      value: "classes"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showQrCode: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickShow() {
      this.setData({
        showQrCode: true
      })
    },
    onClickHide() {
      this.setData({ showQrCode: false });
    },
  }
})
