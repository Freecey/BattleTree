/* becodeorg/mwenbwa
 *
 * /src/client/app.js - Client entry point
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

//import * as React from "react";
//import ReactDOM from "react-dom";
//import HelloWorld from "./components/hello";

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url =
    "mongodb+srv://botanistes:kkYos247aWNYxb0j@botanistes.tjvkg.mongodb.net";

// Database Name
const dbName = "botanistes";
const insertDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection("documents");
    // Insert some documents
    collection.insertMany([{a: 1}, {a: 2}, {a: 3}], (err, result) => {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
};
// Use connect method to connect to the server
MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertDocuments(db, () => {
        client.close();
    });
});