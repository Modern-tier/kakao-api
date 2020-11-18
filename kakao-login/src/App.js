import { Component } from "react";
import Login from "./Components/Login";

export default class App extends Component {
  componentDidMount() {
    console.log("Kakao");
  }

  render() {
    return (
      <div>
        Hello, kakao-login
        <Login />
      </div>
    );
  }
}
