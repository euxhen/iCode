import React from "react";
import "../css/style.css";
import url from "../components/url";
import Alert from "../components/alert";
class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adress: "",
      phone: "",
      bio: "",
      name: "",
      email: "",
      degree: "",
      experience: "",
      fb: "",
      ig: "",
      twt: "",
      git: "",
      lin: "",
      web: "",
      technologies: [],
      actualPassword: "",
      newPassword: "",
      confirmPassword: "",
      userPhoto: "",
      image: "",
      displayAlert: false,
      alertStatus: "",
      alertMessage: "",
    };
  }

  onUploadSubmit = () => {
    const data = new FormData();
    data.append("photo", this.state.image);
    data.append("upload_preset", "cfqh7evo");
    data.append("cloud_name", "devztowmv");
    fetch(`${url}/api/v1/users/updateMe`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        this.fetchMe();
        this.props.changeMe();
      });
  };
  onFileChose = (event) => {
    this.setState({ image: event.target.files[0] });
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
  onActualPasswordChange = (event) => {
    this.setState({ actualPassword: event.target.value });
  };
  onNewPasswordChange = (event) => {
    this.setState({ newPassword: event.target.value });
  };
  onConfirmPasswordChange = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };
  onTechnologiesChange = (event) => {
    if (event.target.checked) {
      this.setState({
        technologies: this.state.technologies.concat(event.target.value),
      });
    } else {
      this.setState({
        technologies: this.state.technologies.filter(
          (el) => el !== event.target.value
        ),
      });
    }
  };

  onWebChange = (event) => {
    this.setState({ web: event.target.value });
  };
  onIgChange = (event) => {
    this.setState({ ig: event.target.value });
  };
  onTwtChange = (event) => {
    this.setState({ twt: event.target.value });
  };
  onGitChange = (event) => {
    this.setState({ git: event.target.value });
  };
  onLinChange = (event) => {
    this.setState({ lin: event.target.value });
  };
  onFbChange = (event) => {
    this.setState({ fb: event.target.value });
  };
  onExpChange = (event) => {
    this.setState({ experience: event.target.value });
  };

  onAdressChange = (event) => {
    this.setState({ adress: event.target.value });
  };
  onPhoneChange = (event) => {
    this.setState({ phone: event.target.value });
  };
  onBioChange = (event) => {
    this.setState({ bio: event.target.value });
  };
  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };
  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  onDegreeChange = (event) => {
    this.setState({ degree: event.target.value });
  };
  fetchMe = () => {
    fetch(`${url}/api/v1/users/me`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          adress: data.data.user.location,
          phone: data.data.user.cel,
          bio: data.data.user.bio,
          name: data.data.user.name,
          email: data.data.user.email,
          degree: data.data.user.degree,
          experience: data.data.user.experience,
          web: data.data.user.website,
          fb: data.data.user.facebookProfile,
          ig: data.data.user.instagramProfile,
          twt: data.data.user.twitterProfile,
          git: data.data.user.githubUsername,
          lin: data.data.user.linkedInProfile,
          technologies: data.data.user.skills,
          userPhoto: data.data.user.photo,
        });
      });
  };
  componentDidMount() {
    this.fetchMe();
  }

  updateMe = () => {
    fetch(`${url}/api/v1/users/updateMe`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
      body: JSON.stringify({
        location: this.state.adress,
        bio: this.state.bio,
        cel: this.state.phone,
        name: this.state.name,
        email: this.state.email,
        degree: this.state.degree,
        experience: this.state.experience,
        website: this.state.web,
        facebookProfile: this.state.fb,
        instagramProfile: this.state.ig,
        twitterProfile: this.state.twt,
        linkedInProfile: this.state.lin,
        githubUsername: this.state.git,
        skills: this.state.technologies,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.fetchMe();
        this.props.changeMe();
      });
  };
  changePassword = () => {
    fetch(`${url}/api/v1/users/updateMyPassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
      body: JSON.stringify({
        passwordCurrent: this.state.actualPassword,
        password: this.state.newPassword,
        passwordConfirm: this.state.confirmPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          this.props.logUser(
            data.data.user,
            data.token,
            "Fjalekalimi u ndryshua me sukses"
          );
        } else {
          this.setState({
            displayAlert: true,
            alertStatus: "Gabim",
            alertMessage: "Fjalekalimet nuk perputhen",
          });
        }
      });
  };

  render() {
    return (
      <div>
        {this.state.displayAlert ? this.displayAlert() : null}
        <div class="row row-edit">
          <div className="log-sections edit-sections">
            <div class="section2 edit-section2">
              <div class="editing-info">
                <h5 class="f-title">Ndrysho Profilin</h5>

                <form method="post">
                  <div class="form-group">
                    <label>Emri Mbiemri</label>
                    <br />
                    <textarea
                      value={this.state.name}
                      onChange={this.onNameChange}
                      rows="1"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label>Email</label>
                    <br />
                    <textarea
                      value={this.state.email}
                      onChange={this.onEmailChange}
                      rows="1"
                    >
                      {this.state.email}
                    </textarea>
                  </div>
                  <div class="form-group">
                    <label>Adresa</label>
                    <br />
                    <textarea
                      value={this.state.adress}
                      onChange={this.onAdressChange}
                      rows="1"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label>Diploma</label>
                    <br />
                    <textarea
                      value={this.state.degree}
                      onChange={this.onDegreeChange}
                      rows="1"
                    >
                      {this.state.degree}
                    </textarea>
                  </div>
                  <div class="form-group">
                    <label>Eksperienca</label>
                    <br />
                    <textarea
                      value={this.state.experience}
                      onChange={this.onExpChange}
                      rows="1"
                    >
                      {this.state.experience}
                    </textarea>
                  </div>

                  <div class="form-group">
                    <label>Celular</label>
                    <br />
                    <textarea
                      value={this.state.phone}
                      onChange={this.onPhoneChange}
                      rows="1"
                    >
                      {this.state.phone}
                    </textarea>
                  </div>
                  <div class="form-group">
                    <label>Profili i Facebook</label>
                    <br />
                    <textarea
                      value={this.state.fb}
                      onChange={this.onFbChange}
                      rows="1"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label>Profili i Twitter</label>
                    <br />
                    <textarea
                      value={this.state.twt}
                      onChange={this.onTwtChange}
                      rows="1"
                    ></textarea>
                  </div>
                  <label>Profili i Instagram</label>
                  <br />
                  <textarea
                    value={this.state.ig}
                    onChange={this.onIgChange}
                    rows="1"
                  ></textarea>
                  <div class="form-group">
                    <label>Profili i LinkedIn</label>
                    <br />
                    <textarea
                      value={this.state.lin}
                      onChange={this.onLinChange}
                      rows="1"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label>Profili i GitHub</label>
                    <br />
                    <textarea
                      value={this.state.git}
                      onChange={this.onGitChange}
                      rows="1"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label>Website</label>
                    <br />
                    <textarea
                      value={this.state.web}
                      onChange={this.onWebChange}
                      rows="1"
                    ></textarea>
                  </div>

                  <div class="form-group">
                    <label>Bio</label>
                    <br />
                    <textarea
                      value={this.state.bio}
                      onChange={this.onBioChange}
                      rows="3"
                      id="textarea"
                      required="required"
                    ></textarea>
                  </div>
                  <div className="job-input-techs">
                    <label className="job-input-techs-title">
                      Teknologjite
                    </label>
                    <div>
                      <input
                        onClick={this.onTechnologiesChange}
                        type="checkbox"
                        value="node.js"
                      />
                      <label>Node.js</label>
                    </div>
                    <div>
                      <input
                        onClick={this.onTechnologiesChange}
                        type="checkbox"
                        value="css"
                      />
                      <label>CSS</label>
                    </div>
                    <div>
                      <input
                        onClick={this.onTechnologiesChange}
                        type="checkbox"
                        value="html"
                      />
                      <label>HTML</label>
                    </div>
                    <div>
                      <input
                        onClick={this.onTechnologiesChange}
                        type="checkbox"
                        value="js"
                      />
                      <label>Js</label>
                    </div>
                    <div>
                      <input
                        onClick={this.onTechnologiesChange}
                        type="checkbox"
                        value="php"
                      />
                      <label>PHP</label>
                    </div>
                    <div>
                      <input
                        onClick={this.onTechnologiesChange}
                        type="checkbox"
                        value="c#"
                      />
                      <label>C#</label>
                    </div>
                    <div>
                      <input
                        onClick={this.onTechnologiesChange}
                        type="checkbox"
                        value="java"
                      />
                      <label>Java</label>
                    </div>
                    <div>
                      <input
                        onClick={this.onTechnologiesChange}
                        type="checkbox"
                        value="ruby"
                      />
                      <label>Ruby</label>
                    </div>
                    <div>
                      <input
                        onClick={this.onTechnologiesChange}
                        type="checkbox"
                        value="Python"
                      />
                      <label>Python</label>
                    </div>
                    <div class="submit-btns">
                      <button type="reset" class="mtr-btn">
                        <span>Anullo</span>
                      </button>
                      <button
                        onClick={this.updateMe}
                        type="button"
                        class="mtr-btn"
                      >
                        <span>Konfirmo</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div class="section2 edit-section2-bottom">
              <div>
                <h5>Ndrysho Fjalekalimin</h5>

                <form method="post">
                  <div class="form-group">
                    <input
                      onChange={this.onActualPasswordChange}
                      type="password"
                      id="input"
                      required="required"
                      placeholder="Fjalekalimi Aktual"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      onChange={this.onNewPasswordChange}
                      type="password"
                      required="required"
                      placeholder="Fjalekalimi i Ri"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      onChange={this.onConfirmPasswordChange}
                      type="password"
                      required="required"
                      placeholder="Konfirmo Fjalekalimin"
                    />
                  </div>

                  <div class="submit-btns">
                    <button type="reset" class="mtr-btn">
                      <span>Anullo</span>
                    </button>
                    <button
                      onClick={this.changePassword}
                      type="button"
                      class="mtr-btn"
                    >
                      <span>Konfirmo</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="section2 aside">
            <h4 class="widget-title">{this.state.name}</h4>

            <img
              className="editpage-photo"
              alt="kjk"
              src={`https://afternoon-bayou-31759.herokuapp.com/images/user-images/${this.state.userPhoto}`}
            />

            <input
              onChange={this.onFileChose}
              type="file"
              placeholder="Ndrysho Foton"
            />
            <button onClick={this.onUploadSubmit}>Ngarko</button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
