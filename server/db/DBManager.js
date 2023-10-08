import {MongoClient} from "mongodb";

class DBManager {
  static getConn = async() => {
    const connectionString = process.env.MONGODB_URI || 'mongodb://admin:password@localhost:27017'
    const client = new MongoClient(connectionString);
    let conn
    try {
      conn = await client.connect();
    } catch(e) {
      console.error(e);
    }
    return conn
  }
}

export default DBManager;