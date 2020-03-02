const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

// databse name file is exported here for below path
const db = require('./config/db').Database;
// database connection here
mongoose.connect(db, { useNewUrlParser: true }).then(() => {
    console.log("database Established Successfull");

}).catch(() => {
    console.log("database connection error");

})
// defining the port here
const port = process.env.port || 3000
//  initialize cors middleware
app.use(cors());
// intialize body parser middleware
app.use(bodyParser.json());
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// })

app.get('/', (req, res) => {
    res.send('hello Node Js');
});
// import router files and models files
const PostRoutes = require('./routes/apis/post');
app.use('/api', PostRoutes);

app.listen(port, () => {
    console.log('server Started..', port);

});