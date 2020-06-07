const mongoose = require('mongoose');

const timeRangeSchema = new mongoose.Schema({
    hour: {
        type: Number,
        max: 24,
        min: 8
    },
    minute: {
        type: Number,
        max: 59,
        min: 0
    },
    time: {
        type: Number,
        get() {
            return this.get('hour') * 100 + this.get('minute');
        }
    }
});

exports.courseSchema = new mongoose.Schema({
    name: String,
    weekday: String,
    startTime: timeRangeSchema, // 开始时间，采用子模型描述
    endTime: timeRangeSchema
});
