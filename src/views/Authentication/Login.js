import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { loginUser } from "views/Apis/BeforeLogin";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f5f5",
  },
  card: {
    width: "400px",
    paddingBottom: "20px",
    position: "relative",
    top: "-40px", // shifted up
  },
  header: {
    textAlign: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
    paddingTop: "10px",
  },
  footer: {
    justifyContent: "center",
  },
  inputSpacing: {
    marginTop: "20px",
  },
}));

export default function Login() {
  const classes = useStyles();
//   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response= await loginUser(email, password);


    console.log("Login Response:", response);

    if (response.userStatus === true && response.accessToken) {

      sessionStorage.setItem("accessToken", response.accessToken);
      sessionStorage.setItem("userId", response.userId);
      sessionStorage.setItem("userRole", response.userRole);
     


      window.location.href = "/admin/dashboard";
    } else {

      alert(response.status || "Login failed. Please try again.");
    }

  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardHeader color="primary">
          <div className={classes.header}>Login</div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody>
            <div className={classes.inputSpacing}>
              <CustomInput
                labelText="Email"
                id="email"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "email",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  required: true,
                }}
              />
            </div>
            <div className={classes.inputSpacing}>
              <CustomInput
                labelText="Password"
                id="password"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: showPassword ? "text" : "password",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  required: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </CardBody>
          <CardFooter className={classes.footer}>
            <Button type="submit" color="primary">
              LOGIN
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
