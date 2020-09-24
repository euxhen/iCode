import React from "react";
import "../css/style.css";
import url from "../components/url";
class Allusers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    fetch(`${url}/api/v1/users`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data.data.users });
      });
  }
  render() {
    var users = this.state.users;
    return (
      <div className="developersCard-container">
        {users.map((user, i) => {
          return (
            <div
              onClick={() => this.props.openUserProfile(user._id)}
              className="developersCard"
            >
              <img
                src={`https://afternoon-bayou-31759.herokuapp.com/images/user-images/${user.photo}`}
                alt="Jonas"
              />
              <p>{user.name}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Allusers;
