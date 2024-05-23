import mongoose from 'mongoose'


const Schema = new mongoose.Schema({
    address:{
        type:String,
        required:true
    },
    transactionCount: {
        type: Number,
    },
    transactionsValue: {
        type: Number,
    },
    ens: {
        type: String,
    },
    nftCount: {
        type: Number,
    },
    twitterHandle:{
        type:String,
    },
    total: {
        type: Number,
    }
})

const AccountsModel =  mongoose.models.accounts ||mongoose.model('accounts',Schema);

export default AccountsModel;