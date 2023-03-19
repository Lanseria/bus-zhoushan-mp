// components/question_record_popup/index.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    questionList: {
      type: Array,
    },
    currentNum: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showSelectQues: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setShow() {
      this.setData({ showSelectQues: true });
    },
    onClose() {
      this.setData({ showSelectQues: false });
    },
    handleDetail({ currentTarget }) {
      this.triggerEvent('detail', {
        currentNum: currentTarget.dataset.num,
        'params.questionId': currentTarget.dataset.id,
      })
      this.onClose()
    },
  }
})
