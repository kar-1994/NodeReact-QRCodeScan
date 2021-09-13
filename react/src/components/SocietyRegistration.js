import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
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



const vsociety_name = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const vpincode = value => {
  if (value.length != 6) {
    return (
      <div className="alert alert-danger" role="alert">
        The pincode must be of 7 numbers.
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

const SocietyRegistration = props => {
  const form = useRef();
  const checkBtn = useRef();

  const [society_name, setSociety_name] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const onChangeName = e => {
    setSociety_name(e.target.value);
  };

  const onChangeAddress = e => {
    setAddress(e.target.value);
  };
  const onChangePincode = e => {
    setPincode(e.target.value);
  };

  const handleRegister = e => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.societyregister(society_name, address, pincode).then(
        response => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        error => {
          setMessage("Error registering society!");
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
                  <label htmlFor="name" class="left">Society Name:</label>
                  <Input
                    type="text"
                    placeholder="Enter Name"
                    className="form-control"
                    name="name"
                    value={society_name}
                    onChange={onChangeName}
                    validations={[required, vsociety_name]}
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
                <div className="col-md-12 form-group">
                  <label htmlFor="name" class="left">Pincode:</label>
                  <Input
                    type="text"
                    placeholder="Enter Pincode"
                    className="form-control"
                    value={pincode}
                    onChange={onChangePincode}
                    validations={[required, vpincode]}
                  />
                </div>
              </div>
              <div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Register</button>
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

export default SocietyRegistration;