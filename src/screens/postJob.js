import React from "react";
import "../css/style.css";
import url from "../components/url";

class PostJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      companyName: "",
      jobTitle: "",
      salary: 0,
      email: "",
      phone: "",
      adress: "",
      technologies: [],
    };
  }
  onDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };
  onCompanyNameChange = (event) => {
    this.setState({ companyName: event.target.value });
  };
  onJobTitleChange = (event) => {
    this.setState({ jobTitle: event.target.value });
  };
  onSalaryChange = (event) => {
    this.setState({ salary: event.target.value });
  };
  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  onPhoneChange = (event) => {
    this.setState({ phone: event.target.value });
  };
  onAdressChange = (event) => {
    this.setState({ adress: event.target.value });
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

  saveJob = () => {
    fetch(`${url}/api/v1/posts/postJob`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company: this.state.companyName,
        jobTitle: this.state.jobTitle,
        salary: this.state.salary,
        jobDescription: this.state.description,
        technologies: this.state.technologies,
        email: this.state.email,
        phone: this.state.phone,
        adress: this.state.adress,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.changePage("forum");
      });
  };

  render() {
    return (
      <div className="row row-job-input">
        <div class="post-input job-input-details">
          <textarea
            onChange={this.onDescriptionChange}
            rows="4"
            placeholder="Pershkrimi i punes "
          ></textarea>
          <input
            onChange={this.onCompanyNameChange}
            type="text"
            placeholder="Emri i kompanise"
          />
          <input
            onChange={this.onJobTitleChange}
            type="text"
            placeholder="Titulli i punes"
          />
          <input
            onChange={this.onSalaryChange}
            type="number"
            placeholder="Pagesa"
          />
          <input
            onChange={this.onEmailChange}
            type="email"
            placeholder="Email"
          />
          <input
            onChange={this.onPhoneChange}
            type="number"
            placeholder="Telefon"
          />
          <input
            onChange={this.onAdressChange}
            type="text"
            placeholder="Adresa"
          />
          <div class="attachments">
            <div className="job-input-techs">
              <label className="job-input-techs-title">Teknologjite</label>
              <div>
                <input
                  onClick={this.onTechnologiesChange}
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="node.js"
                />
                <label for="vehicle1">Node</label>
              </div>
              <div>
                <input
                  onClick={this.onTechnologiesChange}
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="css"
                />
                <label for="vehicle1">Css</label>
              </div>
              <div>
                <input
                  onClick={this.onTechnologiesChange}
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="html"
                />
                <label for="vehicle1">Html</label>
              </div>
              <div>
                <input
                  onClick={this.onTechnologiesChange}
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="js"
                />
                <label for="vehicle1">Js</label>
              </div>
            </div>
          </div>
          <button onClick={this.saveJob} type="submit">
            Posto
          </button>
        </div>
      </div>
    );
  }
}
export default PostJob;
