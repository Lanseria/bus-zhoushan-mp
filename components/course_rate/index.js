// components/course_rate/index.js

const { queryCourseCommentsById, postCourseComments } = require('~/common/api/course')
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    courseId: {
      type: String
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    score: 0,
    content: '',
    commentList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async handleSubmit() {
      const res = await postCourseComments({
        courseId: this.data.courseId,
        score: this.data.score,
        content: this.data.content
      })
      this.fetchData()
    },
    async fetchData() {
      const res = await queryCourseCommentsById(this.data.courseId)
      this.setData({
        commentList: res.data
      })
    }
  },

  lifetimes: {
    attached: function () {
      this.fetchData()
    }
  }
})
