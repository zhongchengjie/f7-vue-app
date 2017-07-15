const express = require('express');
const favicon = require('serve-favicon')
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(favicon(__dirname + '/src/assets/favicon.ico'));
app.use(express.static('dist'));

app.get('/',(req,res,next) => {
	res.sendFile('./dist/index.html');
});

var userApi = require('./server/api/userApi');
var shareApi = require('./server/api/shareApi');
var favorApi = require('./server/api/favorApi');
var uploadApi = require('./server/api/uploadApi');
app.use('/api/user', userApi);
app.use('/api/share', shareApi);
app.use('/api/favor', favorApi);
app.use('/upload',uploadApi);

app.listen(port, () => {
  console.log(`服务器运行在端口:${port}`)
});

module.exports = app;