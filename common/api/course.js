const { ReportModule } = require('~/common/utils')
const { api, } = require('~/common/api/index')
module.exports = {
  queryCourseList: (classId) => {
    return api({
      url: `/mp/course/${classId}/list`,
    })
  },

  queryCourseFaceList: (classId) => {
    return api({
      url: `/mp/course/face/${classId}/list`,
    })
  },

  queryCourseCommentsById: (courseId) => {
    return api({
      url: `/mp/course/comments/${courseId}`,
      method: 'GET',
    })
  },

  postCourseComments: (data) => {
    return api({
      url: `/mp/course/comments`,
      method: 'POST',
      data
    })
  },
}
