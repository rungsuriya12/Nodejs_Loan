const express = require('express');
const cors = require('cors');

require('./db'); // connect DB

const loanRoutes = require('./loan.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/loans', loanRoutes);

const server = app.listen(3000, () => {
  console.log('Server running on port 3000');

  setInterval(() => {
    console.log('Server still running on port 3000');
  }, 3000);
});




//server.js loan.routes.js loan.controller.js loan.model.js db.js