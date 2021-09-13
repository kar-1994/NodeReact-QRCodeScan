const mysqlPool = require('../../config/mysql');
const sql_visitors = require('../../sql/visitors');

function createVisitor(visitor) {
    return new Promise((resolve, reject) => {
        mysqlPool.getConnection((err, con) => {
            if (err) reject(err);
            con.query(sql_visitors.createVisitor,
                [visitor.name, visitor.address, visitor.mobileNo, visitor.email],
                (err, result) => {
                    if (err) reject(err);

                    con.release();
                    resolve("Visitor Created Successfully!")
                });
        })
    });
}
function findByMobileNo(loginInfo){
return new Promise((resolve,reject)=>{
    mysqlPool.getConnection((err,con)=>{
        if(err) reject(err);
        con.query(sql_visitors.findByMobileNo, [loginInfo.mobileNo],
            (err,result)=>{
                if (err) reject(err);

                con.release();
                resolve(result)  
            })
    })
})
}

module.exports = {
    createVisitor:createVisitor,
    findByMobileNo:findByMobileNo
}