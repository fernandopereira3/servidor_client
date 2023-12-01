const env = process.env.NODE_ENV || 'net';

const config = () => {
    switch (env){
    case 'net':
    return{ 
        db_string:'mongodb+srv://admin_fernando:umbrella@usuario0-0yvr5.azure.mongodb.net/test?retryWrites=true&w=majority',
        jwt_password: 'linguica2020'
    }
    case 'loc':
    return {
        db_string:'geonosis.mongodb.umbler.com:36887',
        jwt_password: 'linguica2020'
    }
    
    case 'prod':
    return {
        db_string:'mongodb+srv://admin_fernando:umbrella@usuario0-0yvr5.azure.mongodb.net/test?retryWrites=true&w=majority'

    }
    }
};

console.log('Iniciando em...', env.toLocaleUpperCase())

module.exports = config();