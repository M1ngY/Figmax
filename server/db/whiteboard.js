import DBManager from "./DBManager.js";

class Whiteboard {
  get = async(filter) => {
    const connection = await DBManager.getConn()
    let whiteboards = await connection.db("figmaX").collection('whiteboards').find(filter).toArray();
    return whiteboards;
  }

  add = async(whiteboard) => {
    const connection = await DBManager.getConn()
    let result = await connection.db("figmaX").collection('whiteboards').insertOne(whiteboard);
    return result;
  }

  getById = async(id) => {
    const connection = await DBManager.getConn();
    let whiteboard = await connection.db("figmaX").collection('whiteboards').findOne({ _id: new DBManager.ObjectId(id) });
    return whiteboard;
  }

  deleteById = async(id) => {
    const connection = await DBManager.getConn();
    let result = await connection.db("figmaX").collection('whiteboards').deleteOne({ _id: new DBManager.ObjectId(id) });
    return result;
  }

}

export default Whiteboard;