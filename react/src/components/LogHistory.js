import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";

const LogHistory = () => {
    const [logs, setLogs] = useState([]);
    useEffect(() => {
        AuthService.getLogEntries().then( (res) => {
            setLogs(res.data)
        }).catch((err) => {
            setLogs([])
        })
    }, [])
  return (
    <div className="container">
      <h2>Entry and Exit Log</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            
            <th>Socity Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {
                logs.map((log, i) => {
                   return <tr key={i}>
                        <td>MS. {log.name}</td>
                        <td>
                            <div>
                                <p>{log.society_name}</p>
                                <p>{log.action == 'LOGIN'? log.entry_time : log.exit_time}</p>
                            </div>
                        </td>
                        <td>{log.action}</td>
                  </tr>
                })
            }
        </tbody>
      </table>
    </div>
  );
};

export default LogHistory;