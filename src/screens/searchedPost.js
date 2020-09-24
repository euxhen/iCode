import React from "react";
import "../css/style.css";
import PostCard from "../components/postCard";
import url from "../components/url";
class SearchedPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      actualPage: 1,
    };
  }
  fetchAllPosts = (page) => {
    fetch(
      `${url}/api/v1/posts/searchPost?category=${this.props.cat}&page=${page}`,
      {
        method: "get",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ posts: data.data.posts, actualPage: page });
      });
  };
  componentDidMount() {
    this.fetchAllPosts(1);
  }
  render() {
    var displayPosts = this.state.posts;
    return (
      <div>
        {displayPosts.length < 1 ? (
          <p className="not-found">Nuk u gjet asnje rezultat!</p>
        ) : (
          <div>
            <div className="row">
              <div className="loadMore sp">
                {displayPosts.map((post, i) => {
                  return (
                    <PostCard
                      fetch={() => this.fetchAllPosts(this.state.actualPage)}
                      onPress={this.props.openUserProfile}
                      token={this.props.token}
                      user={this.props.user}
                      post={post}
                    />
                  );
                })}
              </div>
            </div>
            <div className="pagination">
              {this.state.actualPage > 1 ? (
                <p
                  onClick={() => this.fetchAllPosts(this.state.actualPage - 1)}
                >
                  &#x2190;
                </p>
              ) : null}

              <p>{this.state.actualPage}</p>
              <p onClick={() => this.fetchAllPosts(this.state.actualPage + 1)}>
                &#x2192;
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SearchedPost;
