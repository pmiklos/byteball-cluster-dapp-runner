/*jslint node: true */
"use strict";

const { VM } = require('vm2');
const eventBus = require("byteballcore/event_bus.js");
const config = require("byteballcore/conf.js");
const cluster = require("byteball-cluster");
const network = require("byteballcore/network.js");
require("headless-byteball");

const worker = cluster.Worker;

function readDappFromUnit(unitHash, callback) {
    network.requestFromLightVendor("get_joint", unitHash, (ws, request, response) => {
        console.log("[%s] Joint returned", unitHash);

        if (response.error) return callback(response.error);

        let validJoint = response && response.joint && response.joint.unit && response.joint.unit.messages;

        if (!validJoint) {
            return callback("Invalid unit");
        }

        let unit = response.joint.unit;
        let textMessage = unit.messages.find((message) => message.app == "text");

        if (textMessage) {
            callback(null, textMessage.payload);
        }
        else {
            callback("Not a dApp");
        }
    });
}

eventBus.once("headless_wallet_ready", function() {
    worker.join(config.coordinatorPairingCode, (err, coordinator) => {
        if (err) return Error(err);
        console.log("Joined computing cluster " + coordinator);
    });
});

eventBus.on("text", worker.listen);

worker.on("dapp", (coordinator, message, callback) => {
    console.log("[%s] Retrieving dapp source code", message.unit);

    readDappFromUnit(message.unit, (err, code) => {
        if (err) return callback(err);

        console.log("[%s] Source code retrieved: %s" + message.unit, code);

        let sandbox = {
            timeout: 1000,
            sandbox: {
                console: {
                    log: function() {}
                },
                params: message.params
            }
        };

        try {
            let vm = new VM(sandbox);
            let result = vm.run(code);

            console.log("[%s] Executed", message.unit);

            callback(null, {
                result: result
            });
        }
        catch (e) {
            callback(e);
        }
    });

});
