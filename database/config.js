const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_DNNS);
        console.log('DB online');
    } catch (error) {
        console.log(error)
        throw new Error('No se puedo conectar a la base de datos, revisar logs');
    }

};

module.exports = {
    dbConnection
}

/*await mongoose.connect('', {
            userNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
        });
*/