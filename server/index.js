const Koa = require('koa');
const app = new Koa();
const buslineData = require('./buslines.json')
const busstationData = require('./busstation.json')
const busnewsData = require('./busnews.json')
const { MongoClient } = require('mongodb');
const { searchStation } = require('./params');
const uri = 'mongodb://192.168.31.32:27017'; // MongoDB连接URI
const dbName = 'mydatabase'; // 数据库名称

// demo insert data
async function otherRouteHandler(ctx, db) {
  // 插入公交数据
  // const collectionName = 'bus_lines'; // 集合名称
  // const collection = db.collection(collectionName);
  // const result = await collection.insertMany(buslineData);
  // console.log(`${result.insertedCount} buslineData inserted.`);
  // ctx.body = result;
  // 插入公交站数据
  // const collectionName = 'bus_station'; // 集合名称
  // const collection = db.collection(collectionName);
  // const result = await collection.insertMany(busstationData);
  // console.log(`${result.insertedCount} busstationData inserted.`);
  // ctx.body = result;
  // 插入公交新闻数据
  const collectionName = 'bus_news'; // 集合名称
  const collection = db.collection(collectionName);
  const result = await collection.insertMany(busnewsData);
  console.log(`${result.insertedCount} busnewsData inserted.`);
  ctx.body = result;
}


async function getHotBusLines(ctx, db) {
  const collectionName = 'bus_lines'; // 集合名称
  const collection = db.collection(collectionName);
  // const result = await collection.insertMany(buslineData);

  // console.log(`${result.insertedCount} buslineData inserted.`);
  const result = await collection.find().sort({ count: -1 }).limit(10).toArray();
  ctx.body = result;
}

async function getHotBusStops(ctx, db) {
  const collectionName = 'bus_station'; // 集合名称
  const collection = db.collection(collectionName);
  // const result = await collection.insertMany(buslineData);

  // console.log(`${result.insertedCount} buslineData inserted.`);
  const result = await collection.find().sort({ count: -1 }).limit(6).toArray();
  ctx.body = result;
}

async function getLinesByStation(ctx, db) {
  console.log(ctx.query.stationName)
  const stationName = decodeURIComponent(ctx.query.stationName)
  console.log(stationName)
  const res = await searchStation(stationName)
  ctx.body = res.data
}

async function getVehicleDetails(ctx, db) {
  const lineIds = decodeURIComponent(ctx.query.lineIds)
  const stationIds = decodeURIComponent(ctx.query.stationIds)
  const res = await getVehicleDetails(lineIds, stationIds)
  ctx.body = res.data
}

async function postHotBusStop(ctx, db) {
  const collectionName = 'bus_station'; // 集合名称
  const collection = db.collection(collectionName);
  const stationName = ctx.query.stationName

  // 验证公交路线名称是否只包含中文和数字
  const reg = /^[\u4E00-\u9FA5\d]+$/
  if (!reg.test(stationName)) {
    return 'Invalid bus stop name'
  }
  if (stationName) {
    const existingDoc = await collection.where({
      stationName: stationName
    }).getOne()
    if (existingDoc.data) {
      console.log(existingDoc.data)
      await collection.doc(existingDoc.data._id).set({
        stationName: stationName,
        count: existingDoc.data.count + 1
      })
      return 'update success'
    } else {
      const newDoc = {
        stationName: stationName,
        count: 1
      }
      const result = await collection.add(newDoc)
      return 'add success'
    }
  } else {
    return 'error'
  }
}

async function postHotRoute(ctx, db) {
  const collectionName = 'bus_lines'; // 集合名称
  const collection = db.collection(collectionName);
  const busLineName = ctx.query.busLineName

  // 验证公交路线名称是否只包含中文和数字
  const reg = /^[\u4E00-\u9FA5\d]+$/
  if (!reg.test(busLineName)) {
    return 'Invalid bus line name'
  }
  if (busLineName) {
    const existingDoc = await collection.where({
      name: busLineName
    }).getOne()
    if (existingDoc.data) {
      console.log(existingDoc.data)

      await collection.doc(existingDoc.data._id).set({
        name: busLineName,
        count: existingDoc.data.count + 1
      })

      return 'update success'
    } else {
      const newDoc = {
        name: busLineName,
        count: 1
      }

      const result = await collection.add(newDoc)

      return 'add success'
    }
  } else {
    return 'error'
  }
}

async function queryBusNews(ctx, db) {
  const collectionName = 'bus_news'; // 集合名称
  const collection = db.collection(collectionName);
  // const result = await collection.insertMany(buslineData);

  // console.log(`${result.insertedCount} buslineData inserted.`);
  const result = await collection.find().sort({ count: -1 }).limit(20).toArray();
  ctx.body = result;
}

app.use(async (ctx, next) => {
  const client = new MongoClient(uri);

  try {
    await client.connect(); // 连接到MongoDB
    const db = client.db(dbName);
    const { path } = ctx.request;
    // 根据请求路径调用不同的控制器
    if (path === '/getHotBusLines') {
      await getHotBusLines(ctx, db);
    }
    else if (path === '/getHotBusStops') {
      await getHotBusStops(ctx, db)
    }
    else if (path === '/getLinesByStation') {
      await getLinesByStation(ctx, db)
    }
    else if (path === '/getVehicleDetails') {
      await getVehicleDetails(ctx, db)
    }
    else if (path === '/postHotBusStop') {
      await postHotBusStop(ctx, db)
    }
    else if (path === '/postHotRoute') {
      await postHotRoute(ctx, db)
    }
    else if (path === '/queryBusNews') {
      await queryBusNews(ctx, db)
    }
    else {
      // await otherRouteHandler(ctx, db);
    }
    await next(); // 继续处理请求

  } catch (error) {
    console.log('Error:', error);
  } finally {
    await client.close(); // 关闭MongoDB连接
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
