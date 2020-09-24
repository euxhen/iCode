import React from "react";
import "./App.css";

import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./screens/home";
import AboutUs from "./screens/about-us";
import Login from "./screens/login";
import EditProfile from "./screens/editProfile";
import Profile from "./screens/profile";
import Forum from "./screens/forum";
import PostJob from "./screens/postJob";
import JobPage from "./screens/jobPage";
import SearchedPost from "./screens/searchedPost";
import Allusers from "./screens/allUsers";
import Alert from "./components/alert";
import url from "./components/url";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "home",
      userToken: "",
      logedUser: "",
      userClicked: "",
      jobClicked: "",
      cat: "",
      displayAlert: false,
      alertStatus: "",
      alertMessage: "",
    };
  }

  signOut = () => {
    this.setState({
      userToken: "",
      logedUser: "",
      page: "home",
      displayAlert: true,
      alertStatus: "Sukses",
      alertMessage: "Ju dolet me sukses",
    });
  };

  getMe = () => {
    fetch(`${url}/api/v1/users/me`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.userToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          logedUser: data.data.user,
        });
      });
  };

  openSearchedPostPage = (cat) => {
    this.setState({ cat: cat, page: "searchPost" });
  };

  openUserProfile = (userId) => {
    this.setState({ page: "profile", userClicked: userId });
  };

  logUser = (user, token, message) => {
    this.setState({
      userToken: token,
      logedUser: user,
      page: "home",
      displayAlert: true,
      alertStatus: "Sukses",
      alertMessage: message,
    });
  };

  pageChanger = (page) => {
    this.setState({ page: page, isMenuOpen: false });
  };
  jobPage = (job) => {
    this.setState({ page: "job-page", jobClicked: job });
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

  displayPage = () => {
    switch (this.state.page) {
      case "home":
        return (
          <Home
            openSearchedPostPage={this.openSearchedPostPage}
            changePage={this.pageChanger}
          />
        );
      case "about-us":
        return <AboutUs />;
      case "login":
        return <Login logUser={this.logUser} />;
      case "edit-profile":
        return (
          <EditProfile
            logUser={this.logUser}
            changeMe={this.getMe}
            token={this.state.userToken}
          />
        );
      case "profile":
        return <Profile userId={this.state.userClicked} />;
      case "forum":
        let forumUser;
        let forumToken;
        if (this.state.userToken) {
          forumUser = this.state.logedUser;
          forumToken = this.state.userToken;
        } else {
          forumUser = "guest";
          forumToken = "guest";
        }
        return (
          <Forum
            openUserProfile={this.openUserProfile}
            user={forumUser}
            token={forumToken}
            changePage={this.pageChanger}
            jobPage={this.jobPage}
          />
        );
      case "post-job":
        return <PostJob changePage={this.pageChanger} />;
      case "all-users":
        return <Allusers openUserProfile={this.openUserProfile} />;
      case "job-page":
        return <JobPage jobId={this.state.jobClicked} />;
      case "searchPost":
        let user;
        let token;
        if (this.state.userToken) {
          user = this.state.logedUser;
          token = this.state.userToken;
        } else {
          user = "guest";
          token = "guest";
        }
        return (
          <SearchedPost
            openUserProfile={this.openUserProfile}
            cat={this.state.cat}
            user={user}
            token={token}
          />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="App">
        {this.state.displayAlert ? this.displayAlert() : null}
        <Header
          signOut={this.signOut}
          openUserProfile={this.openUserProfile}
          user={this.state.logedUser}
          changePage={this.pageChanger}
        />

        {this.displayPage()}
        <Footer changePage={this.pageChanger} />
      </div>
    );
  }
}

export default App;
