import React from "react";
import "../css/style.css";
import DeveloperIcon from "../images/code.png";
import ForumIcon from "../images/qa.png";
import JobIcon from "../images/recruitment.png";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: "node.js",
    };
  }

  onCategoryChange = (event) => {
    this.setState({ cat: event.target.value });
  };
  render() {
    return (
      <div>
        <div className="container-home">
          <div className="row">
            <div className="search-box">
              <h1>Miresevini ne iCode</h1>
              <div className="search-bar">
                <select onChange={this.onCategoryChange}>
                  <option value="node.js">Node.js</option>
                  <option value="css">CSS</option>
                  <option value="html">HTML</option>
                  <option value="js">Js</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="csharp">C#</option>
                  <option value="ruby">Ruby</option>
                  <option value="php">PHP</option>
                </select>
                <button
                  onClick={() =>
                    this.props.openSearchedPostPage(this.state.cat)
                  }
                  type="submit"
                >
                  Kerko
                </button>
              </div>
            </div>
            <div className="row know-box">
              <div
                className="home-cards"
                onClick={() => this.props.changePage("all-users")}
              >
                <img alt="img" src={DeveloperIcon} />
                <span>Zhvillues</span>
                <p>Vendi ku do te sfidoni limitet tuaja.</p>
              </div>
              <div
                className="home-cards"
                onClick={() => this.props.changePage("forum")}
              >
                <img alt="img" src={ForumIcon} />
                <span>Forumi</span>
                <p>
                  Ketu do te gjeni te gjitha pergjigjet e pyetjeve qe ju keni.
                </p>
              </div>
              <div
                className="home-cards"
                onClick={() => this.props.changePage("post-job")}
              >
                <img alt="img" src={JobIcon} />
                <span>Posto njoftim pune</span>
                <p>
                  Postoni ketu njoftimin tuaj te punes, dhe shume shpejt nje
                  aset i ri do te jete ne kompanine tuaj.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
