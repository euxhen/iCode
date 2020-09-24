import React from "react";
import "../css/style.css";
import Logo from "../images/logo3.png";

class Footer extends React.Component {
  render() {
    return (
      <div>
        <div className="row footer">
          <div className="footer-columns">
            <div className="foot-logo">
              <div>
                <img src={Logo} alt="" />
              </div>
              <p>
                iCode mori nje ide te thjeshte por shume inovatore dhe e
                transformoi
                <p>ne platformen teknologjike me te avancuar ne Shqiperi!</p>
              </p>
            </div>
            <div className="">
              <p>
                <b>Adresa</b>&nbsp;&nbsp;Tirane, Albania
              </p>

              <p>
                <b>Telefon</b>&nbsp;&nbsp;+1-56-346 345
              </p>

              <p>
                <b>Email</b>&nbsp;&nbsp;
                <a href="mailto:icode@icode.al">icode@icode.al</a>
              </p>
            </div>
          </div>
          <div className="footer-columns">
            <div className="">
              <h4>Na Ndiqni</h4>
            </div>

            <a
              href="https://web.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>

            <a
              href="https://plus.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google+
            </a>
          </div>
          <div className="footer-columns">
            <h4>Menu</h4>
            <div className="footer-nav">
              <p onClick={() => this.props.changePage("home")}>Kryefaqja</p>

              <p onClick={() => this.props.changePage("forum")}>Forumi</p>

              <p onClick={() => this.props.changePage("about-us")}>
                Rreth Nesh
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Footer;
