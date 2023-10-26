const {Types, Validators} = require("./schemaValidator");
const { v4: uuidv4 } = require('uuid');

const RefreshTokenSchema = {
    id: {
        type: Types.String,
        validators:[Validators.notNull]
    },
    accessToken: {
        type: Types.String
    },
    refreshToken: {
        type: Types.String
    }
}

const createRefreshTokenModel = (accessToken, refreshToken) => {
    const refreshTokenModel = {
        id: uuidv4(),
        accessToken:accessToken,
        refreshToken:refreshToken
    }
    return refreshTokenModel;
}

module.exports ={
    RefreshTokenSchema,
    createRefreshTokenModel
}