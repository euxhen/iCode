import React from "react";
import "../css/style.css";

class ProfileCircle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isProfileClicked: false,
    };
  }
  profileClickedHandler = () => {
    if (this.state.isProfileClicked) {
      this.setState({ isProfileClicked: false });
    } else {
      this.setState({ isProfileClicked: true });
    }
  };
  render() {
    return (
      <div>
        <img
          onClick={this.profileClickedHandler}
          className="circleImg"
          src={`https://s3-us-east-2.amazonaws.com/nodeimages2/${this.props.user.photo}`}
          alt="userPhoto"
        />
        {this.state.isProfileClicked ? (
          <div className="drop-down">
            <p
              onClick={() => {
                this.props.onPress(this.props.user._id);
                this.setState({ isProfileClicked: false });
                this.props.closeMenu();
              }}
            >
              Shiko Profilin
            </p>
            <p
              onClick={() => {
                this.props.onEdit("edit-profile");
                this.setState({ isProfileClicked: false });
                this.props.closeMenu();
              }}
            >
              Ndrysho Profilin
            </p>
            <p
              onClick={() => {
                this.props.signOut();
                this.props.closeMenu();
              }}
            >
              Dil
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default ProfileCircle;
