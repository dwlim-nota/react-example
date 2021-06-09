import React, { Component } from "react";
import { Auth } from "../../agent";
import { withRouter, Redirect } from "react-router-dom";

import { inject, observer } from "mobx-react";

@inject("authStore", "userStore", "commonStore")
@withRouter
@observer
class Login extends Component {
  render() {
    return (
      <div>
          some variable: {this.props.authStore.someVariable}
      </div>
    );
  }
}

export default Login;
