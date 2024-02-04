import {MongoClient} from 'mongodb';
import DBManager from '../../db/DBManager.js'

jest.mock('mongodb')

test('Test connect in DBManager', async () => {
    const connection = await DBManager.getConn()

    expect(MongoClient).toHaveBeenCalledTimes(1)
    expect(MongoClient).toHaveBeenCalledWith('mongodb://admin:password@localhost:27017')
    const mockMongoClientInstance = MongoClient.mock.instances[0];
    expect(mockMongoClientInstance.connect).toHaveBeenCalledTimes(1);
})