import React from "react";
import "../css/style.css";
import url from "./url";
import Like from "../images/like (1).png";
import FilledLike from "../images/like (2).png";
import Alert from "./alert";

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false,
      isEditedClicked: false,
      modifiedPost: "",
      comment: "",
      displayAlert: false,
      alertStatus: "",
      alertMessage: "",
    };
  }
  onModifiedPostChange = (event) => {
    this.setState({ modifiedPost: event.target.value });
  };
  onCommentChange = (event) => {
    this.setState({ comment: event.target.value });
  };
  onUpdatePost = () => {
    fetch(`${url}/api/v1/posts/${this.props.post._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
      body: JSON.stringify({
        text: this.state.modifiedPost,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ isEditedClicked: false });
        this.props.fetch();
      });
  };
  onDeletePost = () => {
    fetch(`${url}/api/v1/posts/${this.props.post._id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
    }).then((data) => {
      if (data.status === 204) {
        this.setState({
          displayAlert: true,
          alertStatus: "Sukses",
          alertMessage: "Postimi u fshi me sukses",
        });
        this.props.fetch();
      }
    });
  };
  onCommentPost = () => {
    fetch(`${url}/api/v1/posts/comment/${this.props.post._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
      body: JSON.stringify({
        text: this.state.comment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== "success") {
          this.setState({
            displayAlert: true,
            alertStatus: "Gabim",
            alertMessage: "Ju duhet te hyni qe te komentoni",
          });
        } else {
          this.props.fetch();
        }
      });
  };
  onDeleteComment = (commentId) => {
    fetch(
      `${url}/api/v1/posts/deleteComment/${this.props.post._id}/${commentId}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          this.setState({
            displayAlert: true,
            alertStatus: "Sukses",
            alertMessage: "Komenti u fshi me sukses!",
          });
          this.props.fetch();
        }
      });
  };
  onLikeClicked = () => {
    if (this.state.isLiked) {
      fetch(`${url}/api/v1/posts/unlike/${this.props.post._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({ isLiked: false });
          this.props.fetch();
        });
    } else {
      fetch(`${url}/api/v1/posts/like/${this.props.post._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            this.setState({
              isLiked: false,
              displayAlert: true,
              alertMessage: data.message,
              alertStatus: "Gabim",
            });
          } else {
            this.setState({
              isLiked: true,
            });
            this.props.fetch();
          }
        });
    }
  };
  componentDidMount() {
    this.setState({
      isLiked: this.props.post.likes.includes(this.props.user._id),
    });
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

  render() {
    var post = this.props.post;
    var comments = this.props.post.comments;
    let data = new Date(post.date);
    let displayLike = Like;
    if (this.state.isLiked) {
      displayLike = FilledLike;
    }
    var photo = process.env.PUBLIC_URL + `/user-images/avatar.jpg`;
    if (this.props.user && this.props.token !== "guest") {
      photo = `https://nodeimages1.s3.us-east-2.amazonaws.com/${this.props.user.photo}`;
    }

    return (
      <div className="central-item">
        {this.state.displayAlert ? this.displayAlert() : null}
        <div className="user-post">
          <div>
            <div className="user-info">
              <img
                src={`https://nodeimages1.s3.us-east-2.amazonaws.com/${post.postedBy.photo}`}
                alt="userphoto"
              />

              <div className="user-name">
                <p
                  onClick={() => this.props.onPress(post.postedBy._id)}
                  className="user-title"
                >
                  {post.postedBy.name}
                </p>
                <p>
                  {data.toLocaleString("en-GB", {
                    month: "long",
                    year: "numeric",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="post-contents">
              {this.props.user._id === post.postedBy._id ? (
                <div className="post-actions">
                  <p
                    className="modifier"
                    onClick={() => this.setState({ isEditedClicked: true })}
                  >
                    Modifiko &#9998;
                  </p>
                  <p onClick={this.onDeletePost} className="modifier">
                    Fshi postimin &#10006;
                  </p>
                </div>
              ) : null}

              {this.state.isEditedClicked ? (
                <div className="post-input edited-input">
                  <textarea
                    onChange={this.onModifiedPostChange}
                    className="edit-post"
                    rows="3"
                    placeholder="posto problemin... "
                  >
                    {post.text}
                  </textarea>
                  <button className="save-btn" onClick={this.onUpdatePost}>
                    Ruaj
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => this.setState({ isEditedClicked: false })}
                  >
                    X
                  </button>
                </div>
              ) : (
                <p>{post.text}</p>
              )}

              <div className="like-meta">
                <img onClick={this.onLikeClicked} alt="img" src={displayLike} />
                <p>{post.likes.length}</p>
              </div>
            </div>
          </div>
          <div className="coment-area">
            {comments.map((comment, i) => {
              return (
                <div className="user-info other-user">
                  {this.props.user._id === comment.postedBy._id ? (
                    <button
                      onClick={() => this.onDeleteComment(comment._id)}
                      className="cancel-btn circle"
                    >
                      x
                    </button>
                  ) : null}

                  <div className="profile-img">
                    <img
                      src={`https://nodeimages1.s3.us-east-2.amazonaws.com/${comment.postedBy.photo}`}
                      alt=""
                    />
                  </div>

                  <div className="user-name">
                    <p
                      onClick={() => this.props.onPress(comment.postedBy._id)}
                      className="user-title"
                    >
                      {comment.postedBy.name}
                    </p>

                    <div>{comment.text}</div>
                  </div>
                </div>
              );
            })}

            <div className="new-post new-post-coment">
              <img src={photo} alt="userphoto" />

              <div className="post-input">
                <textarea
                  onChange={this.onCommentChange}
                  rows="3"
                  placeholder="Komento"
                ></textarea>
                <div className="attachments">
                  <button onClick={this.onCommentPost} type="reset">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostCard;
