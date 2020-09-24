import React from "react";
import "../css/style.css";

class Alert extends React.Component {
  render() {
    var message = this.props.message;
    if (message === "jwt malformed") {
      message = "Ju duhet te hyni qe te keni akses!";
    }
    if (this.props.status === "Sukses") {
      setTimeout(this.props.onPress, 1000);
    }
    return (
      <div className="alert-full-display">
        <div className="alert-card-all">
          <p onClick={this.props.onPress} className="close-alert">
            &#10006;
          </p>
          <div className="alert-card">
            {this.props.status === "Gabim" ? (
              <p className="alert-status alert-status-red">
                {this.props.status}
              </p>
            ) : (
              <p className="alert-status">{this.props.status}</p>
            )}

            <p>{message}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Alert;
