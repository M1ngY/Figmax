const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/whiteboard', (req, res) => {
  const { boardName } = req.query;
  
  if (!boardName) {
    return res.status(400).send({ error: 'Board name is required' });
  }
  
  const response = {
    boardName,
    message: `Whiteboard '${boardName}' created successfully`
  };
  
  res.send(response);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
