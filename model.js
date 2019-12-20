const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mediatics', {
    useNewUrlParser: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(r => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
}).catch(err => console.error(err));

const igSchema = new mongoose.Schema({
    username: String,
    image: String,
    like: Number,
    comment: Number,
    tanggalPosting: Date
})

exports.ig = mongoose.model('ig',igSchema)
