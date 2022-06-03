const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const http = require('http');
require('dotenv').config();
const indexRouter = require('./routes/index');
const runSocketApp = require("./socketApp");
const {uModel, companyModel, userModel} = require("./database/access");
const {runEmmits} = require("./database/Emmiters");
// const {userModel} = require("./database/access");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);
const port = process.env.PORT;
const socketPort = process.env.SOCKET_PORT;
app.set('port', port);

const server = http.createServer(app);
const io = require('socket.io')(http,  { cors: { origin: '*' } });

runSocketApp(io);
 runEmmits();

io.listen(socketPort);
server.listen(port);

/*var sa = new userModel({

    email: "22wandtyut1yta111@shoprite.com",
    password: "12eeee345",
    fullName: "1Wanda111",
    profilePictureUrl: null,
    isActive: true,
    isIsVerified: true,
    companyClientId: "a146fe34-c3e1-43b9-8d2e-3abf2ad4dbb9"
});*/
// sa.save();


//  {profilePictureUrl=null, createdAt=2022-05-20T15:47:51.028Z, password=12eeee345, companyClientId=a146fe34-c3e1-43b9-8d2e-3abf2ad4dbb9, fullName=1Wanda111, id=5584b9, isActive=true, isIsVerified=true}


