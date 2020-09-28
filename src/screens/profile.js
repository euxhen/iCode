import React from "react";
import "../css/style.css";
import url from "../components/url";
import BackgroundPhoto from "../images/background.jpeg";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: "basics",
      user: {},
    };
  }
  changeDetailsHandler = (detail) => {
    this.setState({ details: detail });
  };

  displayDetails = () => {
    switch (this.state.details) {
      case "basics":
        return (
          <div class="basics">
            <p>Emri: {this.state.user.name}</p>

            <p>Adresa: {this.state.user.location}</p>

            <p>Cel: {this.state.user.cel}</p>

            <p>Email: {this.state.user.email}</p>

            <p>Website: {this.state.user.website}</p>
          </div>
        );
      case "work":
        return (
          <div class="basics">
            <div>
              <p>Eksperienca: {this.state.user.experience}</p>
              <div class="education">
                <p>Diploma: {this.state.user.degree}</p>
              </div>
            </div>
          </div>
        );
      case "pasion":
        return (
          <div class="basics">
            {this.state.user.skills.map((skill, i) => {
              return <p>{skill}</p>;
            })}
          </div>
        );
      default:
        return null;
    }
  };

  componentDidMount() {
    fetch(`${url}/api/v1/users/${this.props.userId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ user: data.data.user });
      });
  }

  render() {
    var user = this.state.user;

    return (
      <div>
        <div class="topbar-container">
          <img className="background-img" src={BackgroundPhoto} alt="" />

          <div class="user-avatar">
            <div class="">
              <div class="">
                <div class="">
                  <img
                    className="user-avatar-img"
                    src={`https://nodeimages1.s3.us-east-2.amazonaws.com/${user.photo}`}
                    alt=""
                  />
                </div>
              </div>
              <div class="">
                <div class="">
                  <h5>{user.name}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="profile-info">
          <aside class="profile-info-left">
            <div class="profile-infos-card">
              <h4 class="widget-title">Rrjetet Sociale</h4>
              <div class="socials-list">
                <a title="" href={user.facebookProfile}>
                  <span>Facebook</span>
                </a>

                <a title="" href={user.twitterProfile}>
                  <span>Twitter</span>
                </a>

                <a title="" href={user.linkedInProfile}>
                  <span>LinkedIn</span>
                </a>
                <a title="" href={user.instagramProfile}>
                  <span>Instagram</span>
                </a>
                <a title="" href={user.githubUsername}>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </aside>

          <div class="profile-info-right">
            <div class="profile-infos-card">
              <div class="about">
                <div class="personal">
                  <h5 class="widget-title">Informacione Personale</h5>
                  <p>Bio: {user.bio}</p>
                </div>
                <div class="profile-user-details">
                  <div class="nav">
                    {this.state.details === "basics" ? (
                      <p
                        class="activated"
                        onClick={() => this.changeDetailsHandler("basics")}
                      >
                        Info
                      </p>
                    ) : (
                      <p onClick={() => this.changeDetailsHandler("basics")}>
                        Info
                      </p>
                    )}

                    {this.state.details === "work" ? (
                      <p
                        class="activated"
                        onClick={() => this.changeDetailsHandler("work")}
                      >
                        Punesimi
                      </p>
                    ) : (
                      <p onClick={() => this.changeDetailsHandler("work")}>
                        Punesimi
                      </p>
                    )}

                    {this.state.details === "pasion" ? (
                      <p
                        class="activated"
                        onClick={() => this.changeDetailsHandler("pasion")}
                      >
                        Aftesite
                      </p>
                    ) : (
                      <p onClick={() => this.changeDetailsHandler("pasion")}>
                        Aftesite
                      </p>
                    )}
                  </div>
                  <div class="tab-content">{this.displayDetails()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
