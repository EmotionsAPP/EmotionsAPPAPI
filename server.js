const express = require('express');
const cors = require('cors');
require('dotenv').config()
require('./p2p/p2pserver');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(require('./routes/auth.route'));
app.use(require('./routes/app.route'));

app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})