const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./index.js');

dotenv.config({ path: './config.env' });


const PORT = process.env.PORT || 3001

const DB = process.env.DATABASE.replace('password', process.env.PASSWORD);
mongoose
    .connect(DB)
    .then(() => console.log('DB connection successful!'));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})