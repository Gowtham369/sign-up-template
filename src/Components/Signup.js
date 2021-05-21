import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Button, IconButton, InputAdornment, OutlinedInput } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "../Utils/style.scss";

export default function Signup() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [userType, setUserType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    if (!/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})$/.test(e.target.value)) {
      setMail({ ...mail, error: "Please enter a valid email address" });
    } else setMail({ mail: e.target.value, error: "" });
  };
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };
  const handlePasswordChange = (e) => {
    (e.target.value.length < 8)
      ? setPassword({ ...password, errorStatus: true })
      : setPassword({ password: e.target.value, errorStatus: false });
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <div className="signup-wrapper">
      <div className="on-step">
        Step 1 of 3<span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      <div className="title">Let’s set up your account</div>
      <div className="description">
        Already have an account? <a href="">Sign in</a>
      </div>
      <div className="form-wrapper">
        <form noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Name" onChange={handleNameChange} variant="outlined" />
          <div>
            <TextField
              id="outlined-basic"
              error={mail?.error ? true : false}
              helperText={mail?.error}
              label="Email"
              onChange={handleEmailChange}
              variant="outlined"
            />
          </div>
          <FormControl variant="outlined">
            <Select value={userType} onChange={handleUserTypeChange} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value="" disabled>
                I would describe my user type as
              </MenuItem>
              <MenuItem value="Developer">Developer</MenuItem>
              <MenuItem value="Tester">Tester</MenuItem>
              <MenuItem value="Engineer">Engineer</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={handlePasswordChange}
              error={password.errorStatus}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
            <div className={`muted-text-message ${password.errorStatus && "error-message"}`}>Minimum 8 characters</div>
          </FormControl>
          <Button disabled={!(name && mail && userType && password && !mail?.error && !password.errorStatus)} variant="contained" color="primary">
            Next
          </Button>
          <div className="terms-and-service">
            By clicking the “Next” button, you agree to creating a free account, and to <a href="">Terms of Service</a> and{" "}
            <a href="">Privacy Policy</a>.
          </div>
        </form>
      </div>
    </div>
  );
}
