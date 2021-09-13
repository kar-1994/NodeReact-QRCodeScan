module.exports = {
    createSociety: "insert into society (society_name, address, pincode) values (?, ?, ?)",
    findAll: "select * from society",
    findById: "select * from society where  id = ?"
}