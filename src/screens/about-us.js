import React from "react";
import "../css/style.css";
import CompanyPhoto from "../images/headquarter.jpg";
import Gjirafa from "../images/gjirafa.png";
import Ikub from "../images/ikub.png";
import Celesi from "../images/celesi.png";
import Soft from "../images/soft.gif";
import Atis from "../images/atis.png";
import Sign from "../images/signature.png";

class AboutUs extends React.Component {
  render() {
    return (
      <div>
        <div className="about-container">
          <div className="about-col">
            <div className="about-winku">
              <h4>Miresevini ne iCode</h4>
              <span>
                Ndihmojme zhvilluesit te kodojne skriptet dhe teknologjite e se
                ardhmes...
              </span>
              <p>
                Themeluar ne vitin 2020, iCode ju vjen ne ndihme te gjithe atyre
                qe duan te mesojne te kodojne, te shperndajne dijet e tyre, te
                bashkepunojne dhe te ndertojne karrieren. Cdo gje ne iCode eshte
                ne qender te komunitetit!
              </p>
              <div className="fonder">
                <h4>
                  Euxhen Ibi <i> Themelues</i>
                </h4>
                <div className="signature">
                  <img src={Sign} alt="signature" />
                  <i>iCode Ltd</i>
                </div>
              </div>
            </div>
          </div>
          <div className="about-col">
            <figure className="about-picture">
              <img src={CompanyPhoto} alt="" />
            </figure>
          </div>
        </div>

        <div className="sponsor">
          <h2>Bashkepunetoret</h2>

          <ul className="sponsor-logo">
            <li>
              <img alt="" src={Gjirafa} />
            </li>
            <li>
              <img alt="" src={Ikub} />
            </li>
            <li>
              <img alt="" src={Celesi} />
            </li>
            <li>
              <img alt="" src={Soft} />
            </li>
            <li>
              <img alt="" src={Atis} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default AboutUs;
