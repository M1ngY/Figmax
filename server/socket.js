import { Server } from 'socket.io';
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

const NEW_CONNECTION_c2s = "NEW_CONNECTION_c2s"
const NEW_CONNECTION_s2c = "NEW_CONNECTION_s2c"
const NEW_ITEMS_c2s = "NEW_ITEMS_c2s"
const NEW_ITEMS_s2c = "NEW_ITEMS_s2c"

const clients = {}

const socketServer = (server, db) => {
    const io = new Server(server, { cors: { origin: '*' } })
    const connectionString = process.env.REDIS_URI || 'redis://localhost:6379'
    const pubClient = createClient({url:connectionString});
    const subClient = pubClient.duplicate();

    Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
      io.adapter(createAdapter(pubClient, subClient));
      io.on('connection', function (socket) {
        console.log('New socket ID:', socket.id)
      
        clients[socket.id] = {
          name: 'Anonymous',
          color: '#4169e1',
          boardName: ''
        }
      
        socket.on(NEW_CONNECTION_c2s, (boardName) => {
          socket.join(boardName)
          const filter = {boardName: boardName}
          db.get(filter).then(boards => {
            if (boards[0]) {
              io.in(boardName).emit(NEW_CONNECTION_s2c, {items: boards[0].items})
            } else {
              io.in(boardName).emit(NEW_CONNECTION_s2c, {error: `whiteboard ${boardName} not found`})
            }
          }).catch((err) => {
            console.log(err)
          })
          clients[socket.id].boardName = boardName
        })

      })
    });  
};
  
export default socketServer