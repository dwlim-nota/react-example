import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";

@inject("userStore", "authStore")
@observer
class Main extends Component {
    constructor(props) {
        super(props);
        this.handleSomeVariable = this.handleSomeVariable.bind(this)
    }
    handleSomeVariable = (e) => {
        this.props.authStore.setSomeVariable(e.target.value);
        console.log(e.target.value)
    };
    render() {
        return <div>
            <input type="button" onClick={(e) => {this.handleSomeVariable(e)}} value="click" />
            <Link to="/login">login</Link>
        </div>
    }
}

export default Main;