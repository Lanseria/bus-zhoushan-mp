// components/question_item/index.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isPractice: {
      type: Boolean,
      value: true
    },
    formData: {
      type: Object
    },
    params: {
      type: Object
    },
    currentNum: {
      type: Number
    },
    showParse: {
      type: Boolean
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
    handleShowParse() {
      this.triggerEvent('change', {
        showParse: true
      })
      // this.setData({
      //   showParse: true
      // })
    },
    onChange({ detail }) {
      // 1 与 3 为单选与判断题
      if (['1', '3'].includes(this.data.formData.type)) {
        this.triggerEvent('change', {
          'params.answer': detail
        })
        // this.setData({
        //   'params.answer': detail
        // })
      }
      // 2 为多选题 
      else if (this.data.formData.type === '2') {
        this.triggerEvent('change', {
          'params.answerArray': detail.sort()
        })
        // this.setData({
        //   'params.answerArray': detail.sort()
        // })
      }
    },
  }
})
