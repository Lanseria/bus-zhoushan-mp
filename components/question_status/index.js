// components/question_status/index.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    formData: {
      type: Object
    },
    questionList: {
      type: Array
    },
    isShowRightWrong: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSelectQues() {
      this.triggerEvent('showSelectQues')
    },
  }
})
