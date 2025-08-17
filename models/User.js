const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  hashedPassword: { type: String, required: true },
});

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
    return returnedObject;
  }
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema); // check for user vs. User 