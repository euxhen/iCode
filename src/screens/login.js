import React from "react";
import "../css/style.css";
import Logo from "../images/logo3.png";
import url from "../components/url";
import Alert from "../components/alert";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegisterSectionOpen: true,
      logedUserEmail: null,
      logedUserPassword: null,
      registerUserName: null,
      registerUserEmail: null,
      registerUserPass: null,
      registerUserPassConf: null,
      displayAlert: false,
      alertStatus: "",
      alertMessage: "",
    };
  }

  onRegisterNameChange = (event) => {
    this.setState({ registerUserName: event.target.value });
  };
  onRegisterEmailChange = (event) => {
    this.setState({ registerUserEmail: event.target.value });
  };
  onRegisterPassChange = (event) => {
    this.setState({ registerUserPass: event.target.value });
  };
  onRegisterPassConfChange = (event) => {
    this.setState({ registerUserPassConf: event.target.value });
  };

  onLogedUserEmailChange = (event) => {
    this.setState({ logedUserEmail: event.target.value });
  };

  onLogedUserPasswordChange = (event) => {
    this.setState({ logedUserPassword: event.target.value });
  };

  LogUser = () => {
    fetch(`${url}/api/v1/users/login`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.logedUserEmail,
        password: this.state.logedUserPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          this.props.logUser(data.data.user, data.token, "Ju hyte me sukses");
        } else {
          this.setState({
            displayAlert: true,
            alertStatus: "Gabim",
            alertMessage: data.message,
          });
        }
      });
  };
  RegisterUser = () => {
    fetch(`${url}/api/v1/users/signup`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.registerUserName,
        email: this.state.registerUserEmail,
        password: this.state.registerUserPass,
        passwordConfirm: this.state.registerUserPassConf,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          this.props.logUser(
            data.data.user,
            data.token,
            "Ju u regjistruat me sukses"
          );
        } else {
          if (data.error.errors.name) {
            this.setState({
              displayAlert: true,
              alertStatus: "Gabim",
              alertMessage: data.error.errors.name.properties.message,
            });
          } else if (data.error.errors.email) {
            this.setState({
              displayAlert: true,
              alertStatus: "Gabim",
              alertMessage: data.error.errors.email.properties.message,
            });
          } else if (data.error.errors.password) {
            this.setState({
              displayAlert: true,
              alertStatus: "Gabim",
              alertMessage: data.error.errors.password.properties.message,
            });
          } else if (data.error.errors.passwordConfirm) {
            this.setState({
              displayAlert: true,
              alertStatus: "Gabim",
              alertMessage:
                data.error.errors.passwordConfirm.properties.message,
            });
          }
        }
      });
  };
  displayAlert = () => {
    return (
      <Alert
        status={this.state.alertStatus}
        message={this.state.alertMessage}
        onPress={() => this.setState({ displayAlert: false })}
      />
    );
  };

  render() {
    return (
      <div>
        {this.state.displayAlert ? this.displayAlert() : null}
        <div className="row">
          <div className="log-sections section1">
            <div className="land-featurearea">
              <div className="land-meta">
                <h1>iCode</h1>
                <h3>Mos limitoni sfidat, por sfidoni limitet tuaja!</h3>
                <div>
                  <span>
                    <img width="150" src={Logo} alt="" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {this.state.isRegisterSectionOpen ? (
            <div className="log-sections section1-right">
              <div className="section2">
                <h2 className="log-title">Regjistrohu</h2>

                <form method="post">
                  <div className="form-group">
                    <input
                      onChange={this.onRegisterNameChange}
                      type="text"
                      required="required"
                      placeholder="Emri Mbiemri"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={this.onRegisterEmailChange}
                      type="text"
                      required="required"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={this.onRegisterPassChange}
                      type="password"
                      required="required"
                      placeholder="Fjalekalimi"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={this.onRegisterPassConfChange}
                      type="password"
                      required="required"
                      placeholder="Konfirmo Fjalekalimin"
                    />
                  </div>

                  <p
                    className="already-have"
                    onClick={() =>
                      this.setState({ isRegisterSectionOpen: false })
                    }
                  >
                    Keni tashme nje llogari?
                  </p>
                  <div className="submit-btns">
                    <button
                      onClick={this.RegisterUser}
                      className="mtr-btn signup"
                      type="button"
                    >
                      <span>Regjistrohu</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="log-sections section1-right">
              <div className="section2">
                <h2 className="log-title">Hyr</h2>

                <form method="post">
                  <div className="form-group">
                    <input
                      onChange={this.onLogedUserEmailChange}
                      type="email"
                      id="input"
                      required="required"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={this.onLogedUserPasswordChange}
                      type="password"
                      required="required"
                      placeholder="Fjalekalimi"
                    />
                  </div>

                  <div className="submit-btns">
                    <button
                      onClick={this.LogUser}
                      className="mtr-btn signin"
                      type="button"
                    >
                      <span>Hyr</span>
                    </button>
                    <button
                      onClick={() =>
                        this.setState({ isRegisterSectionOpen: true })
                      }
                      className="mtr-btn signup"
                      type="button"
                    >
                      <span>Regjistrohu</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Login;
