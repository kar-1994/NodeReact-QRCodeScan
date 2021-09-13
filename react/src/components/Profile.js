import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h3 className="left">Hey, {currentUser ? currentUser.name : 'There'}</h3>
        <div className="row mb-5">
          <div className="col-ms-6 mr-5">
            <button className="btn btn-success"><a className="white" href="logentry/welcome">Log Entry</a></button>
          </div>
          <div className="col-ms-6 ml-5">
            <button className="btn btn-danger"><a className="white" href="logexit/goodbye">Log Exit</a></button>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-ms-6 mr-5">
            <button className="btn btn-info"><a className="white" href="log/history">View Log</a></button>
          </div>
          <div className="col-ms-6 ml-5">
            <button className="btn btn-secondary">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
