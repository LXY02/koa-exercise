const mongoose = require('mongoose');

const {courseSchema} = require('./schema');

exports.Course = mongoose.model('Course', courseSchema);


