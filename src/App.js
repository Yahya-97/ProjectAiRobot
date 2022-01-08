import React, { Component,useEffect } from "react";
import './App.css';
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./Menu";
import Mlearning from './Mlearning'


class App extends Component {
  state = {
    users: [],
  };
  componentDidMount() {
    // axios.get("/users.json").then((response) => {
    //   this.setState({ users: response.data });
    // });
    this.getdata()

}
getdata = async () => {
  const response = await fetch("/");
  const data = await response.json();

  console.log(data)
}



  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/Mleraning">
              <Mlearning />
            </Route>
          <Menu />
          </Switch>
        </div>
        </Router>
    );
  }
}

export default App;

