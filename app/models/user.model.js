const mongoose = require("mongoose");
const { roleNames, defaultRoleName } = require("../roles/roles.js")
const {
  randomBytes,
} = require('node:crypto');

const buf = randomBytes(256);

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true
    },
    id: {
      type: String,
      required: true,
      default: () => randomBytes(15).toString('hex'),
      unique: true
    },
    email: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
      enum: roleNames,
      default: defaultRoleName
    },
  },
);

UserSchema.methods.hasRoleAccess = function (role_access_level) {
  if (!role_access_level) {
    return false;
  }

  return role_access_level === this.role;
}

/*UserSchema.pre('save', function(next){
  const user = this;
  const buf = randomBytes(15);
  user.id = buf.toString('hex');
  console.log(user.id);
  next();
})*/

const User = mongoose.model('User', UserSchema

);



module.exports = User;