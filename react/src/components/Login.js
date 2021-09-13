import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  const onChangeMobileNo = (e) => {
    setMobile(e.target.value);
  };


  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(mobile).then(
        () => {
          props.history.push("/profile");
          window.location.reload();
        },
        (error) => {
          setMessage("Error Login");
        }
      );
    } else {
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="mobile" className="left">Mobile Number</label>
            <Input
              type="text"
              placeholder="Enter Mobile Number"
              className="form-control"
              name="mobile"
              value={mobile}
              onChange={onChangeMobileNo}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block">
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
