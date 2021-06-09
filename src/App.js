import './App.css';

import { Switch, Route, withRouter } from "react-router-dom";
import { observer, inject, Provider} from "mobx-react";
import React from "react";

// pages
// import Auth from "./pages/auth/Auth";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";

@inject("userStore", "commonStore")
@withRouter
@observer
class App extends React.Component {
  componentWillMount() {
    if (!this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    if (this.props.commonStore.token) {
      this.props.userStore.pullUser().finally(() => {
        this.props.commonStore.setAppLoaded();
      });
    }
  }
  render() {
    return (
      <div className="App">
        {/* TODO: common style refactoring */}
        <Provider>
          <Switch>
            <Route exact path="/login/" component={Login} />
            {/* <Route exact path="/auth/" component={Auth} /> */}
            <Route exact path="/" component={Main} />
          </Switch>
        </Provider>
      </div>
    );
  }
}

export default App;
