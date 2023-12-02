const env = process.env.NODE_ENV || 'net';

const config = () => {
    switch (env){
    case 'net':
    return{ 
        db_string:'',
        jwt_password: ' '
    }
    case 'loc':
    return {
        db_string:' ',
        jwt_password: ' '
    }
    
    case 'prod':
    return {
        db_string:' '

    }
    }
};

console.log('Iniciando em...', env.toLocaleUpperCase())

module.exports = config();