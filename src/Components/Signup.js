import React, { useState } from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "../Utils/style.scss";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function Signup(props) {
    const [name, setName] = useState(""),
        [mail, setMail] = useState(""),
        [userType, setUserType] = useState(""),
        [showPassword, setShowPassword] = useState(false),
        [dropdownActive,setDropdownActive]=useState(false),
        [password, setPassword] = useState("");

    const handleNameChange = e => {
        setName(e.target.value);
    };
    const handleEmailChange = e => {
        if (!/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})$/.test(e.target.value)) {
            setMail({ mail: e.target.value, error: "Please enter a valid email address" });
        } else setMail({ mail: e.target.value, error: "" });
    };
    const handleUserTypeChange = e => {
        setUserType(e.target.value);
        setDropdownActive(false);
    };
    const handlePasswordChange = e => {
        e.target.value.length < 8 ? setPassword({ password: e.target.value, errorStatus: true }) : setPassword({ password: e.target.value, errorStatus: false });
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = e => {
        e.preventDefault();
    };
    const handleSubmit = e => {
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
                    <div className="field-group">
                        <input onChange={handleNameChange} />
                        <label className={name ? "transitioned-label" : ""}>Name</label>
                    </div>
                    <div className="field-group">
                        <input onChange={handleEmailChange} />
                        <label className={mail?.mail ? "transitioned-label" : ""}>Email</label>
                        <div className="error-message">{mail?.error}</div>
                    </div>
                    <div className="field-group">
                        <input id="dropdown" className="d-none" />
                        <div onClick={()=>setDropdownActive(!dropdownActive)} onBlur={()=>setDropdownActive(false)} htmlFor="dropdown" className={`select-button ${dropdownActive ? "select-button-active" : ""}`}>
                            <div>{userType ? userType : "I would describe my user type as"}</div>
                            <ExpandMoreIcon />
                        </div>
                        <div onClick={handleUserTypeChange} className={`list-group ${dropdownActive ? "show" : ""}`}>
                            <input type="radio" id="Delveloper" name="dropdown" value="Delveloper" />
                            <label for="Delveloper" value="">
                                Developer
                            </label>
                            <input type="radio" id="Tester" name="dropdown" value="Tester" />
                            <label for="Tester">Tester</label>
                            <input type="radio" id="Engineer" name="dropdown" value="Engineer" />
                            <label for="Engineer">Engineer</label>
                        </div>
                    </div>
                    <div className="field-group">
                        <input name="password" type={showPassword ? "text" : "password"} onChange={handlePasswordChange} />
                        <label className={password?.password ? "transitioned-label" : ""}>Password</label>
                        {showPassword ? (
                            <Visibility onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} />
                        ) : (
                            <VisibilityOff onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} />
                        )}
                        <div className={`muted-text-message ${password?.errorStatus && "error-message"}`}>Minimum 8 characters</div>
                    </div>
                    <button onClick={handleSubmit} disabled={!(name && mail && userType && password && !mail?.error && !password.errorStatus)}>
                        Next
                    </button>
                    <div className="terms-and-service">
                        By clicking the “Next” button, you agree to creating a free account, and to <a href="">Terms of Service</a> and <a href="">Privacy Policy</a>.
                    </div>
                </form>
            </div>
        </div>
    );
}
