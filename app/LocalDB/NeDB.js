const Datastore = require('nedb');
const path = require('node:path');
const RefreshTokenModel = require('./refreshToken.model.js');
const {validateSchema} = require("./schemaValidator");
const db = {};

db.RefreshToken = new Datastore({ filename: path.join(__dirname, './RefreshTokenDB/RefreshToken.db')});
db.RefreshToken.loadDatabase(function (err) {    // Callback is optional
    console.log(err);
  });

db.RefreshToken.createAndInsertRefreshTokenModel = (accessToken, refreshToken, callback)=>{
    const refreshTokenModel = RefreshTokenModel.createRefreshTokenModel(accessToken, refreshToken);
    validateSchema(RefreshTokenModel.RefreshTokenSchema, refreshTokenModel).then((data)=>{
        db.RefreshToken.insert(data, function (err, newDocs) {
            callback(true);
        })
    }).catch((err)=>{
        console.error(err);
        callback(false);
    })
};

db.RefreshToken.insertRefreshTokenModel = (refreshTokenModel)=>{
    validateSchema(RefreshTokenModel.RefreshTokenSchema, refreshTokenModel).then((data)=>{
        db.RefreshToken.insert(data, function (err, newDocs) {
            console.log(newDocs);
        })
    }).catch((err)=>{
        console.error(err);
    })
};
module.exports = db;