import { model, Schema, Model, Document } from 'mongoose';

const userSchema = new Schema({
  _id: {
    type: String,
    default: () => Math.random().toString(36).substring(2), // Generates a random string
  },
  userName: {
    type: String
  },
  phone: {
    type: String
  },

  status :{
    type :String,
    default: 'active'
  },

  userType: {
    type: String
  },

  profilePic: { type: String},
  purchasedBooks: [{ type: Schema.Types.String, ref: 'Book' }],

});

export const User = model('User', userSchema);
