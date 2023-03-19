const { api } = require('./index')

module.exports = {
  queryPracticeSummary: (classId) => {
    return api({
      url: `/mp/practice/${classId}/question/cover`,
    })
  },
  queryPracticeListByQueue: (classId) => {
    return api({
      url: `/mp/practice/${classId}/question/by/queue`,
    })
  },

  queryPracticeListByRandom: (classId) => {
    return api({
      url: `/mp/practice/${classId}/question/by/random`,
    })
  },

  queryPracticeListByWrong: (classId) => {
    return api({
      url: `/mp/practice/${classId}/question/by/wrong`,
    })
  },

  submitPracticeQuestion: (data) => {
    return api({
      url: `/mp/practice/question/submit`,
      method: 'POST',
      data
    })
  },
}
