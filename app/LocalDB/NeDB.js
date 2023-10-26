const Datastore = require('nedb');
const db = new Datastore({ filename: 'RefreshToken.db', autoload: true });
const config = require("../config/auth.config");
const { v4: uuidv4 } = require('uuid');
const RefreshToken = db;

saveToken = async function (user) {
    const expiredAt = new Date();

    expiredAt.setSeconds(
        expiredAt.getSeconds() + config.jwtRefreshExpiration
    );

    //const refreshToken = uuidv4();

    /*const _object = new this({
        token: _token,
        user: user.id,
        expiryDate: expiredAt.getTime(),
    });*/

    console.log(refreshToken);

    //const refreshToken = await _object.save();
    //return refreshToken.token;
    const model = {
        id: () => randomBytes(15).toString('hex')
        , refreshToken: refreshToken
        , accessToken: new Date()
    };
}

const verifyExpiration = (refreshToken) => {
    return token.expiryDate.getTime() < new Date().getTime();
}

module.exports = RefreshToken;