module.exports = {
    createVisitor: 'INSERT INTO visitors  (name,address,mobile_no,email_id) VALUES(?, ?, ?, ?)',
    findByMobileNo: 'SELECT* FROM visitors WHERE mobile_no = ? '

}