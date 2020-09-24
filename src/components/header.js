import React from "react";
import "../css/style.css";
import Logo from "../images/logo3.png";
import ProfileCircle from "./profileCircle";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }
  menuHandler = () => {
    if (this.state.isMenuOpen) {
      this.setState({ isMenuOpen: false });
    } else {
      this.setState({ isMenuOpen: true });
    }
  };
  componentDidMount() {
    this.setState({ isMenuOpen: this.props.menu });
  }
  render() {
    return (
      <div>
        <div className="theme-layout">
          <div className="responsive-header">
            <div className="res-topbar">
              <p onClick={this.menuHandler}> &#9776;</p>
              <img
                onClick={() => this.props.changePage("home")}
                src={Logo}
                alt=""
              />
            </div>
            {this.state.isMenuOpen ? (
              <nav id="menu" className="res-menu">
                <p
                  onClick={() => {
                    this.props.changePage("home");
                    this.setState({ isMenuOpen: false });
                  }}
                >
                  Kryefaqja
                </p>

                <p
                  onClick={() => {
                    this.props.changePage("forum");
                    this.setState({ isMenuOpen: false });
                  }}
                >
                  Forumi
                </p>

                <p
                  onClick={() => {
                    this.props.changePage("about-us");
                    this.setState({ isMenuOpen: false });
                  }}
                >
                  Rreth Nesh
                </p>
                {this.props.user !== "" ? (
                  <div>
                    <ProfileCircle
                      closeMenu={() => this.setState({ isMenuOpen: false })}
                      user={this.props.user}
                      onPress={this.props.openUserProfile}
                      onEdit={this.props.changePage}
                      signOut={this.props.signOut}
                    />
                  </div>
                ) : (
                  <p
                    onClick={() => {
                      this.props.changePage("login");
                      this.setState({ isMenuOpen: false });
                    }}
                    className="reg-nav"
                  >
                    Regjistrohu
                  </p>
                )}
              </nav>
            ) : null}
          </div>

          <div className="topbar stick">
            <div>
              <img
                className="logo-header"
                onClick={() => this.props.changePage("home")}
                src={Logo}
                alt="logo"
              />
            </div>

            <div className="top-area">
              <ul className="main-menu">
                <li onClick={() => this.props.changePage("home")}>Kryefaqja</li>
                <li onClick={() => this.props.changePage("forum")}>Forumi</li>

                <li onClick={() => this.props.changePage("about-us")}>
                  Rreth Nesh
                </li>
              </ul>
            </div>
            <div className="user-img">
              {this.props.user !== "" ? (
                <ProfileCircle
                  user={this.props.user}
                  onPress={this.props.openUserProfile}
                  onEdit={this.props.changePage}
                  signOut={this.props.signOut}
                  closeMenu={() => null}
                />
              ) : (
                <button
                  type="submit"
                  onClick={() => this.props.changePage("login")}
                >
                  Regjistrohu
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
