const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://abhiownsad:NDn3MgA235qfJdfs@revisioncluster.s19tk.mongodb.net/');

const userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String
})

const accountSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    balance: {
        type: Number,
        required: true
    }
})

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
	Account,
    User
}