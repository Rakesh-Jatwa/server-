const mongoose = require('mongoose');

const PostSchema = mongoose.Schema([{
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    mobile: {
        type: Number,
        require: true
    },
}]);

module.exports = mongoose.model('post', PostSchema);