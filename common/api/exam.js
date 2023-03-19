const { api } = require('./index')

module.exports = {
  queryExamSummary: (classId) => {
    return api({
      url: `/mp/exam/${classId}/cover`,
    })
  },
  // classId type
  postExamInfo: (data) => {
    return api({
      url: `/mp/exam/info`,
      method: 'POST',
      data
    })
  },
  /**
   *"answer": "",
    "answerArray": [],
    "examId": 0,
    "questionId": 0,
    "submitQuestionId": 0
   * @param {*} data 
   * @returns 
   */
  submitExamQuestion: (data) => {
    return api({
      url: `/mp/exam/question/submit`,
      method: 'POST',
      data
    })
  },
  submitExam: (examId) => {
    return api({
      url: `/mp/exam/${examId}/submit`,
      method: 'POST',
    })
  },
  queryExamRecordList: (classId) => {
    return api({
      url: `/mp/exam/${classId}/list`,
    })
  },

  // 获取模拟考试详情
  queryMockExamDetail: (examId) => {
    return api({
      url: `/mp/exam/${examId}/mockExam`,
    })
  },
  // 翻看试卷记录
  checkExamMock: (data) => {
    return api({
      url: `/mp/exam/mockExam/submit`,
      method: 'POST',
      data
    })
  },
}
