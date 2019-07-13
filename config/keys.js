if (process.env.NODE_ENV === 'production') {
    module.exports = require('./keys_prod');
} else {
    module.exports = require('./keys_dev');
}

// module.exports = {
//     mongoURI: 'mongodb+srv://Oren:12345@vacations-etuyg.mongodb.net/test?retryWrites=true',
//     secretOrKey: 'secret'
// };
