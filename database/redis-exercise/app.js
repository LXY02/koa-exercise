const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');

client.on('error', (err) => {
    console.log('err ', err);
});

client.set('name', 'ikcamp', redis.print); // redis.print 作用是打印设置数据的结果
client.get('name', (err, value) => {
    if (err) throw err;
    console.log('Name: ', value);
});

client.hmset('ik', {
    'a': 'aaa',
    'age': 20
});
client.hgetall('ik', (err, obj) => {
    console.log('ik: ', obj);
});
