const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/koa');
const db = mongoose.connection;
db.on('error', err => {
    console.log('fail ', err);
});
db.on('open', () => {
    console.log('success');

    const categorySchema = new mongoose.Schema({
        name: {
            type: String
        },

        desc: {
            type: String
        }
    });

    const Category = mongoose.model('Category', categorySchema);

    const category = new Category({
        name: 'test-111',
        desc: 'this is a description'
    });

    category.save(err => {
        if (err) console.log('save fail');
        else console.log('save success');
    });

    return;
    const list = Category
        .where('createdAt')
        .limit(10)
        .exec();
    console.log('----- ', list);
});


