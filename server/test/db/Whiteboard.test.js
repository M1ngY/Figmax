import DBManager from "../../db/DBManager.js";
import Whiteboard from "../../db/whiteboard.js";

const mockConnection = {
    db: jest.fn().mockReturnThis(),
    collection: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnThis(),
    toArray: jest.fn().mockReturnThis(),
    insertOne: jest.fn().mockReturnThis()
}

DBManager.getConn = jest.fn().mockResolvedValue(
    mockConnection
)

afterEach(() => {
    jest.clearAllMocks()
});

test('Test get', async () => {
    const db = new Whiteboard()
    const filter = {boardName: 'testName'}
    const whiteboard = await db.get(filter)

    expect(mockConnection.db).toBeCalledWith('figmaX')
    expect(mockConnection.collection).toBeCalledWith('whiteboards')
    expect(mockConnection.find).toBeCalledWith(filter)
    expect(mockConnection.toArray).toBeCalled()
})

test('Test add', async () => {
    const db = new Whiteboard()
    const filter = {boardName: 'testName'}
    const whiteboard = await db.add(filter)

    expect(mockConnection.db).toBeCalledWith('figmaX')
    expect(mockConnection.collection).toBeCalledWith('whiteboards')
    expect(mockConnection.insertOne).toBeCalledWith(filter)
})