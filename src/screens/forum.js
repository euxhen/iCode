import React from "react";
import "../css/style.css";
import url from "../components/url";
import PostCard from "../components/postCard";
import Alert from "../components/alert";
class Forum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      posts: [],
      problem: "",
      problemCat: "node.js",
      actualPage: 1,
      displayAlert: false,
      alertStatus: "",
      alertMessage: "",
    };
  }
  displayAlert = () => {
    return (
      <Alert
        status={this.state.alertStatus}
        message={this.state.alertMessage}
        onPress={() => this.setState({ displayAlert: false })}
      />
    );
  };

  onProblemChange = (event) => {
    this.setState({ problem: event.target.value });
  };
  onProblemCatChange = (event) => {
    this.setState({ problemCat: event.target.value });
  };

  fetchAllPostsAndJobs = (page) => {
    fetch(`${url}/api/v1/posts/forum?page=${page}`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          jobs: data.data.jobs,
          posts: data.data.posts,
          actualPage: page,
        });
      });
  };
  componentDidMount() {
    this.fetchAllPostsAndJobs(1);
  }

  onProblemPost = () => {
    if (this.props.token === "guest") {
      this.setState({
        displayAlert: true,
        alertStatus: "Gabim",
        alertMessage: "Ju duhet te hyni qe te postoni",
      });
    } else {
      fetch(`${url}/api/v1/posts`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.token}`,
        },
        body: JSON.stringify({
          text: this.state.problem,
          category: this.state.problemCat,
          postedBy: this.props.user._id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status === "success") {
            this.setState({
              displayAlert: true,
              alertStatus: "Sukses",
              alertMessage: "Postimi u krye me sukses",
            });
            this.fetchAllPostsAndJobs(this.state.actualPage);
          } else {
            this.setState({
              displayAlert: true,
              alertStatus: "Gabim",
              alertMessage: "Ju duhet te hyni qe te postoni",
            });
          }
        });
    }
  };

  render() {
    var displayArray = this.state.jobs;
    var displayPosts = this.state.posts;
    let photo = process.env.PUBLIC_URL + `/user-images/avatar.jpg`;
    if (this.props.token !== "guest") {
      photo = `https://s3-us-east-2.amazonaws.com/nodeimages2/${this.props.user.photo}`;
    }
    console.log(this.props.user.photo);
    return (
      <div>
        {this.state.displayAlert ? this.displayAlert() : null}
        <div className="row row-post">
          <div className="posts-section">
            <div className="new-post">
              <img src={photo} alt="" />

              <div className="post-input">
                <textarea
                  onChange={this.onProblemChange}
                  rows="3"
                  placeholder="Posto problemin... "
                ></textarea>
                <div className="attachments">
                  <div>
                    <label>Tematika</label>
                    <select onChange={this.onProblemCatChange}>
                      <option value="node.js">Node.js</option>
                      <option value="js">Js</option>
                      <option value="html">HTML</option>
                      <option value="java">Java</option>
                      <option value="python">Python</option>
                      <option value="php">PHP</option>
                      <option value="css">CSS</option>
                      <option value="ruby">Ruby</option>
                      <option value="csharp">C#</option>
                    </select>
                  </div>

                  <button onClick={this.onProblemPost} type="submit">
                    Post
                  </button>
                </div>
              </div>
            </div>

            <div className="loadMore">
              {displayPosts.map((post, i) => {
                return (
                  <PostCard
                    fetch={() =>
                      this.fetchAllPostsAndJobs(this.state.actualPage)
                    }
                    onPress={this.props.openUserProfile}
                    token={this.props.token}
                    user={this.props.user}
                    post={post}
                  />
                );
              })}
            </div>
          </div>

          <div className="jobs-section">
            {displayArray.map((card, i) => {
              return (
                <div
                  className="job-card"
                  onClick={() => this.props.jobPage(card._id)}
                  key={i}
                >
                  <p className="job-card-title">{card.company}</p>
                  <p className="job-card-position">{card.jobTitle}</p>
                  <div className="job-card-techs">
                    {card.technologies.map((tech, i) => {
                      return <p key={i}>{tech}</p>;
                    })}
                  </div>
                  <p className="job-card-salary">Pagesa: ${card.salary}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="pagination">
          {this.state.actualPage > 1 ? (
            <p
              onClick={() =>
                this.fetchAllPostsAndJobs(this.state.actualPage - 1)
              }
            >
              &#x2190;
            </p>
          ) : null}

          <p>{this.state.actualPage}</p>
          <p
            onClick={() => this.fetchAllPostsAndJobs(this.state.actualPage + 1)}
          >
            &#x2192;
          </p>
        </div>
      </div>
    );
  }
}
export default Forum;
