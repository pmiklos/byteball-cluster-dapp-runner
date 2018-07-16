/*jslint node: true */
"use strict";

const fs = require('fs');
const objectHash = require('byteballcore/object_hash.js');
const headlessWallet = require("headless-byteball");
const eventBus = require('byteballcore/event_bus.js');
const composer = require('byteballcore/composer.js');

function onError(err) {
    throw Error(err);
}

function createDapp(payerAddress, dappSource, onDone) {
    var network = require('byteballcore/network.js');
    var callbacks = composer.getSavingCallbacks({
        ifNotEnoughFunds: onError,
        ifError: onError,
        ifOk: function(objJoint) {
            network.broadcastJoint(objJoint);
            console.error(JSON.stringify(objJoint));
            onDone();
        }
    });

    composeTextJoint(payerAddress, dappSource, headlessWallet.signer, callbacks);
}

function composeTextJoint(from_address, text, signer, callbacks) {
    var objMessage = {
        app: "text",
        payload_location: "inline",
        payload_hash: objectHash.getBase64Hash(text),
        payload: text
    };
    composer.composeJoint({
        paying_addresses: [from_address],
        outputs: [{ address: from_address, amount: 0 }],
        messages: [objMessage],
        signer: signer,
        callbacks: callbacks
    });
}

eventBus.on('headless_wallet_ready', () => {
    headlessWallet.readFirstAddress((address) => {
        if (process.argv.length < 3) {
            throw Error("DApp file name must be the first argument");
        }

        fs.readFile(process.argv[2], (err, source) => {
            if (err) throw Error(err);
            createDapp(address, source.toString("utf-8"), () => process.exit(0));
        });

    });
});
