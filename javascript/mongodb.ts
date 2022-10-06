const {MongoClient} = require('mongodb')
let url = 'mongodb://localhost:27017'

const main = async () => {
    //创建与mongodb数据库的连接
    const client = await new MongoClient(url)

    try {
        await client.connect();
        await listDatabases(client)
        await dbOperate(client)
    } catch (e) {
        console.error(e)
    } 
    // finally{
    //     await client.close()
    // }
}
main().catch(console.error)

const listDatabases = async (client) => {
    const dbaseList = await client.db().admin().listDatabases();
    dbaseList.databases.forEach(db => {
        console.log(`- ${db.name}`)
    })
}

const dbOperate = async (client) => {
    let dbase = client.db('myMongodb');
    /**
     * 给myMongodb数据库创建的site表插入一条数据
    */
    let myObj = {_id: 1, phone:'18315963987', password: '196@5348'}
    dbase.collection('site').insertOne(myObj, (err, res) => {
        if (err) throw err;
        console.log('文档插入成功');
    })
    /**
     * 给myMongodb数据库创建的site表插入多条数据
    */
    let userObj = [
        {phone: '17983456211', password: '23487464'},
        {phone: '17654872213', password: '2348798'},
        {phone: '17983455891', password: '274547687'},
    ]
    dbase.collection('site').insertMany(userObj, (err, res) => {
        if (err) throw err;
        console.log('插入的数量为', res.insertedCount)
    })
    /**
     * 从myMongodb数据库当中的site表查询数据
    */
    dbase.collection('site').find({'phone': '18315963987'}).toArray((err, res) => {
        if(err) throw err;
        console.log(res);
    })
}