const test = require('../../data/test')

module.exports = (req, res, next) => {
    const testData = test()
    testData.desc = '我是自定义测试数据'
    res.success(testData)
}