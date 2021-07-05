import React, { Component } from "react";
import Erroring from "@/components/blank/error";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // 可以在这里添加日志
    console.warn("ErrorBoundary::something error:", error, info);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    return hasError ? (
      <Erroring
        noborder
        onClick={() => window.location.reload()}
        height="calc(~'100vh - 56px')"
      />
    ) : (
      children
    );
  }
}
