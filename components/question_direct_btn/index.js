// components/question_direct_btn/index.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    currentNum: {
      type: Number
    },
    questionList: {
      type: Array
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
    handlePrev() {
      if (this.data.currentNum <= 1) {
        return
      } else {
        const nextQuesNum = this.data.currentNum - 1
        const nextQues = this.data.questionList.find(m => m.num === nextQuesNum)
        if (nextQues) {
          this.triggerEvent('change', {
            currentNum: nextQuesNum,
            'params.questionId': nextQues.id,
          })
        }
      }
    },
    handleNext() {
      const nextQuesNum = this.data.currentNum + 1
      const nextQues = this.data.questionList.find(m => m.num === nextQuesNum)
      if (nextQues) {
        this.triggerEvent('change', {
          currentNum: nextQuesNum,
          'params.questionId': nextQues.id,
        })
      }
    }
  }
})
