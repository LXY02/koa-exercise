const {Course} = require('./modal');

const getCourseList = async () => {
   return await Course.find().sort({
       'startTime.time': 1
   }).limit(2);
};

const getCourseById = async (id) => {
    return await Course.findById(id);
};

const getCourseByTime = async (start, end, weekday) => {
    return await
        Course
            .find({
                weekday
            })
            .where('startTime.time').gte(start.hour * start.minute)
            .where('endTime.time').lte(end.hour * end.minute);

};

const addCourse = async (course) => {
    const {weekday, startTime, endTime} = course;
    // const item = await getCourseByTime(startTime, endTime, weekday);
    // if (item) throw new Error('当前时间段已经安排了课程');
    return await Course.create(course);
};

// 更新
const updateCourse = async (id, course) => {
    return await Course.update({
        _id: id,
    }, course);
};

// 删除
const removeCourse = async (id) => {
    return await Course.remove({
        _id: id
    });
};

module.exports = {
    getCourseList,
    getCourseById,
    getCourseByTime,
    addCourse
};
