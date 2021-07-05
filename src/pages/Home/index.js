import React, { Component } from "react";
import { connect, history } from "umi";

@connect(({ user }) => ({
  currentUser: user.currentUser
}))
class Home extends Component {
  componentDidMount() {
    const {
      currentUser: { orgId }
    } = this.props;

    // mark:区县一体化demo
    if (orgId === "330108-S000249") {
      history.replace("/");
    }
  }

  render() {
    return <div />;
  }
}

export default Home;
