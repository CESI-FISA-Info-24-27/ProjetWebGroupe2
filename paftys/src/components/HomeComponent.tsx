import { Component } from "react";

export default class homecomponent extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to the Home Page</h1>
        <p>This is the home component of our application.</p>
        <p>Feel free to explore the features and functionalities we offer.</p>
        <p>
          For more information, check out our documentation or contact support.
        </p>
        <a href="/login">Login</a>
        <br />
        <a href="/signup">Sign Up</a>
      </div>
    );
  }
}
