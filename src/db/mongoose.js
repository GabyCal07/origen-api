const mongoose = require('mongoose');

const uri = "mongodb+srv://GabyCal07:Rabanito01@cluster0.xtjm2.mongodb.net/origen?retryWrites=true&w=majority";

// mongoose.connect('mongodb://127.0.0.1:27017/Origen', {
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});