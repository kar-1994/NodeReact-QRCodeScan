import React, { useState, useRef } from "react";
import QrReader from "react-qr-reader";
import AuthService from "../services/auth.service";

const QRCodeScanner = props => {
  const [scanned, setScanned] = useState(false);
  const [message, setMessage] = useState("");


  const handleError = err => {
    console.log(err);
  };
  const handleScan = result => {
    //console.log(result)
    if (result) {
      setScanned(true);
      const societyInfo = JSON.parse(result);
      
      AuthService.logentry({
          society: societyInfo[0].id,
          isLogin: props.isLogin
      });

      if (props.isLogin) {
        setMessage("Welcome to " + societyInfo[0].society_name);
      } else {
        setMessage("Please visit again " + societyInfo[0].society_name);
      }
    }
  };
  return (
    <div className="col-md-12">
      <div className="card card-container">
        {!scanned && (
          <div>
            <QrReader
              delay={1000}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
            />
          </div>
        )}
        {message && (
          <div className="form-group">
            <div
              className={
                props.isLogin ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default QRCodeScanner;
