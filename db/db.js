const pool = require('./init.js');

const query = (sql) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
}

const query_escape = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
    
}

module.exports = {
    query,
    query_escape,
    escape: pool.escape.bind(pool),
};
