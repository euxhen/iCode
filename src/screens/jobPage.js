import React from "react";
import "../css/style.css";
import url from "../components/url";
class JobPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: {},
      technologies: [],
    };
  }

  componentDidMount() {
    fetch(`${url}/api/v1/posts/jobs/${this.props.jobId}`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          job: data.data.jobs,
          technologies: data.data.jobs.technologies,
        });
      });
  }

  render() {
    var job = this.state.job;
    var techs = this.state.technologies;
    return (
      <div>
        <div>
          <div>
            <div class="row">
              <div>
                <div class="employer-info">
                  <h2>{job.jobTitle}</h2>
                  <ul>
                    <li>
                      <span>Telefoni:</span> <i>{job.phone}</i>
                    </li>
                    <li>
                      <span>Email:</span> <i>{job.email}</i>
                    </li>

                    <li>
                      <span>Adresa:</span> <i>{job.adress}</i>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div>
                  <h4>${job.salary}</h4>
                  <span>Rroga minimale</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div class="row">
              <div>
                <div class="job-detail">
                  <h3>Pershkrimi i punes</h3>
                  <p>{job.jobDescription}</p>

                  <h4>Teknologjite</h4>
                  <ul>
                    {techs.map((tech, i) => {
                      return (
                        <li>
                          <span>&#10004; {tech}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div>
                    <a className="apply-btn" href={`mailto:${job.email}`}>
                      Apliko
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JobPage;
