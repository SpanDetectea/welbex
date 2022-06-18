const Pool = require('pg').Pool
const pool = new Pool({
    user: 'my_user',
    host: 'localhost',
    database: 'welbex',
    password: 'root',
    port: 5432,
});
const getInfo = () => {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM tz ORDER BY id ASC', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const getCount = (head, value) => {
    if (head == 'equals') {
        return new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM tz WHERE count=$1', [value], (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        })
    } else if (head == 'more') {
        return new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM tz WHERE count > $1', [value], (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        })
    }
    else if (head == 'less') {
        return new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM tz WHERE count < $1', [value], (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        })
    }
    else if (head == 'contains') {
        return new Promise(function (resolve, reject) {
            pool.query(`SELECT * FROM tz WHERE CAST (count AS VARCHAR) LIKE $1`, [`%${value}%`], (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        })
    }
}
const getDistance = (head, value) => {
    if (head == 'equals') {
        return new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM tz WHERE distance=$1', [value], (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        })
    } else if (head == 'more') {
        return new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM tz WHERE distance > $1', [value], (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        })
    }
    else if (head == 'less') {
        return new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM tz WHERE distance < $1', [value], (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        })
    }
    else if (head == 'contains') {
        return new Promise(function (resolve, reject) {
            pool.query(`SELECT * FROM tz WHERE CAST (distance AS VARCHAR) LIKE $1`, [`%${value}%`], (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        })
    }
}
const getName = (head, value) => {
    if (head == 'equals') {
        return new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM tz WHERE name=$1', [value], (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        })
    } else if (head == 'more') {
        return new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM tz WHERE name > $1', [value], (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        })
    }
    else if (head == 'less') {
        return new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM tz WHERE name < $1', [value], (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        })
    }
    else if (head == 'contains') {
        return new Promise(function (resolve, reject) {
            pool.query(`SELECT * FROM tz WHERE CAST (name AS VARCHAR) LIKE $1`, [`%${value}%`], (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        })
    }
}
module.exports = {
    getInfo,
    getCount,
    getDistance,
    getName
}