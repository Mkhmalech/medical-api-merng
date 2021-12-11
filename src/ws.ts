import express from "express";
import expressWs from "express-ws";
import { TESTS } from "./extensions/lab-manager/src/labTests/module/labtests";
import { QUEUING } from "./extensions/queuing_system/src/module/queuing";

export const WS = (app: express.Application) => {

    let clients: any = [];
    //initialize the WebSocket server instance
    expressWs(app);

    app.ws('/ws', (ws: any, req: any) => {
        // ws.on('message', (msg: any) => {
        //     var connection = req.accept('any-protocol', req.origin);
        //     clients.push(connection);

        //     connection.on('message', function (message:any) {
        //         //broadcast the message to all the clients
        //         clients.forEach(function (client:any) {
        //             client.send(msg);
        //         });
        //     });
        // })
        // clients.push(ws);

        // const changeStream = QUEUING.watch().on('change', (change:any) => {

        //     const {updateDescription: { updatedFields }} : any = change

        //     ws.send(JSON.stringify(updatedFields[Object.keys(updatedFields)[0]].number));            
        // });

        // ws.on('close', () => {
        //     console.log('WebSocket was closed')
        // })
    })
}