var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://admin:safeTesting@ds159033.mlab.com:59033/quartets';

module.exports = {
    getBasses: () => {
        MongoClient.connect(url, function(err, db) {
            console.log("Connected successfully to server");
            db.close();
        });
    }
}

