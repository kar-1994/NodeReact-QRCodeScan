import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vname = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vmobile = value => {
  if (value == undefined || value == null || value == "" || value.length < 10) {
    return (
      <div className="alert alert-danger" role="alert">
        Mobile number is mandatory for login process
      </div>
    );
  }
};

const vaddress = value => {
  if (value == undefined || value == null || value == "") {
    return (
      <div className="alert alert-danger" role="alert">
        Address is a mandatory field.
      </div>
    );
  }
};

const RegisterUser = props => {
  const form = useRef();
  const checkBtn = useRef();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangeMobile = e => {
    setMobile(e.target.value);
  };

  const onChangeAddress = e => {
    setAddress(e.target.value);
  };

  const handleRegister = e => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(name, email, mobile, address).then(
        response => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        error => {
          setMessage("Error registering user!");
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h3>Register Here!</h3>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div className="container">
              <div className="row">
                <div className="col-md-12 form-group">
                  <label htmlFor="name" class="left">Name:</label>
                  <Input
                    type="text"
                    placeholder="Enter Name"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={onChangeName}
                    validations={[required, vname]}
                  />
                </div>

                <div className="col-md-12 form-group">
                  <label htmlFor="mobile" class="left">Mobile:</label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Mobile Number"
                    name="mobile"
                    value={mobile}
                    onChange={onChangeMobile}
                    validations={[required, vmobile]}
                  />
                </div>

                <div className=" col-md-12 form-group">
                  <label htmlFor="email"  class="left">Email:</label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Email Address"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  />
                </div>

                <div className="col-md-12 form-group">
                  <label htmlFor="address" class="left">Address:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder="Enter Address"
                    value={address}
                    onChange={onChangeAddress}
                    validations={[required, vaddress]}
                  />
                </div>
              </div>
              <div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
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

export default RegisterUser;
