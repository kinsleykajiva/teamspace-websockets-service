const {chatMessageModel} = require("./database/access");
const nameSpace = [];
const usersMap = new Map();
let connectionsMap = new Map();


function runSocketApp(io) {
    nameSpace.forEach(name => {
        connectionsMap.set(name, []);
        usersMap.set(name, []);

        io.of(name).on('connection', (socket) => {
            console.log('a user connected');

            const companyKey = (socket.handshake.query['companyKey']);
            const userId = (socket.handshake.query['userId']);

            // save users and connections
            let existingArr = usersMap.get(companyKey);
            if (existingArr) {
                if (!existingArr.includes(userId)) {
                    // not exists,save
                    existingArr.push({userId, socketId: socket.id});
                    usersMap.set(companyKey, existingArr);// update the array
                }
            }

            socket.on('onMESSAGE', message => {
                // save the message
                let save = new chatMessageModel();
                save.save().then(result=>{
                    console.log(JSON.stringify(result));

                }).error(e=> console.error(e) );
            });

            socket.on('disconnect', () => {
                console.log('user disconnected');
                try {
                    let existingArr = usersMap.get(companyKey);
                    if (existingArr) {
                        existingArr = existingArr.filter(x => x.socketId !== socket.socketId);
                        usersMap.set(companyKey, existingArr);// update the array
                        console.log("deleted user , the user is gone or removed.")
                    }

                } catch (e) {
                    console.log(e);
                }


            });
        });
    });
    console.log("########### Running Socket Connection App - runSocketApp()- ###########");
}

module.exports = runSocketApp;