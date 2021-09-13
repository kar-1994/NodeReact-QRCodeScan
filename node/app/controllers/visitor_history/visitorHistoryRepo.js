const mysqlPool = require('../../config/mysql');
const sql_visitors_history= require('../../sql/visitors_history');
const socityRepo = require('../society/socityRepo');


function createVisitorHistory(society, user, isLogin) {
    return new Promise((resolve, reject) => {
        let action = isLogin ? "LOGIN" : "LOGOUT";
        let loginTime = isLogin ? new Date(): null;
        let loginOut = !isLogin ? new Date(): null;
        mysqlPool.getConnection((err, con) => {
            if (err) reject(err);
            con.query(sql_visitors_history.createLogEntry,
                [user, society, loginTime, loginOut, action],
                (err, result) => {
                    if (err) reject(err);

                    con.release();
                    resolve("Visitor History Created Successfully!")
                });
        })
    });
}


function findUserLogHistory(user) {
    return new Promise((resolve, reject) => {
        mysqlPool.getConnection((err, con) => {
            if (err) reject(err);
            con.query(sql_visitors_history.findUserLogHistory, [user],
                (err, result) => {
                    if (err) reject(err);

                    con.release();
                    resolve(result)
                });
        })
    });
}

module.exports = {
    createVisitorHistory: createVisitorHistory,
    findUserLogHistory: findUserLogHistory
}