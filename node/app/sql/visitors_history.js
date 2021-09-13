module.exports = {
    createLogEntry: "insert into visit_history (visitor_id,society_id,entry_time,exit_time,action) values (?, ?, ?, ?, ?)",
    findByUser: "select * from visit_history where visitor_id = ?",
    findUserLogHistory: "select v.name, s.society_name, h.entry_time, h.exit_time, h.action " +
    " from visit_history h inner join visitors v on h.visitor_id = v.id " +
    " inner join society s on h.society_id = s.id " +
    " where h.visitor_id = ?"
}