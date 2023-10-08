db.createUser(
    {
        user: "admin",
        pwd: "password",
        roles: [
            {
                role: "readWrite",
                db: "figmaX"
            }
        ]
    }
);

db.whiteboards.drop();
db.whiteboards.insertMany([
    {
      "boardName": "voting",
      "items":  []
    },
    {
      "boardName": "meeting-notes",
      "items":  []
    }
  ])