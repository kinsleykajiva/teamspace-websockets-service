const {chatMessageModel, userModel} = require("./access");
const amqp = require('amqplib/callback_api');
const opt = {credentials: require('amqplib').credentials.plain('test', 'test')};

const r = require('rethinkdb');

const ampUrl = 'amqp://13.246.49.140';


function runEmmits() {

    r.connect({
        host: "13.246.49.140",
        port: 28015,
        db: "teamspace"
    }, (err, conn) => {
        if (err) throw err;

        r.table('users').changes().run(conn, (err, cursor) => {
            cursor.each((err, record) => {
                // console.log(record['new_val']);
                const message = (record['new_val']);
                amqp.connect(ampUrl, opt, (error0, connection) => {
                    if (error0) {
                        throw error0;
                    }
                    connection.createChannel((error1, channel) => {
                        if (error1) {
                            throw error1;
                        }
                        const QUEUE = "QUEUE_onUserSaved";
                        channel.assertQueue(QUEUE, {durable: false});
                        channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(message)));

                    });
                });
            });

        });
        r.table('chatMessages').changes().run(conn, (err, cursor) => {
            cursor.each((err, record) => {

                const message = (record['new_val']);
                console.log(message)
                amqp.connect(ampUrl, opt, (error0, connection) => {
                    if (error0) {
                        throw error0;
                    }
                    connection.createChannel((error1, channel) => {
                        if (error1) {
                            throw error1;
                        }
                        const chatRoomId = message.fromUserId + '_to_' + message.toUserId;

                        const QUEUE = "onMessageSaved_" + chatRoomId;
                        console.log('Message to QUEUE', QUEUE)
                        channel.assertQueue(QUEUE, { durable: false});
                        channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(message)));/*fire and forget message*/
                        console.log('Message Sent', chatRoomId, JSON.stringify(message))
                    });
                });
            });

        });
    });


}

console.log('code has been run as')

module.exports = {runEmmits}







