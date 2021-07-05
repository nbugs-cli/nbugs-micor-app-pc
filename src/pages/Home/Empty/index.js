import React, { Component } from "react";
import Container from "@/components/Container";

export default class Empty extends Component {
  render() {
    return (
      <Container breStates>
        <div style={{ textAlign: "center", marginTop: "13%" }}>
          <img
            style={{ width: "16%", marginBottom: 10 }}
            src="https://s.xiaoyuanhao.com/file/b3f8262c-35f9-4a1b-b607-26e4df789e0a.png"
          />
          <div
            style={{
              color: "rgba(0, 0, 0, 0.25)",
              "font-size": 14
            }}
          >
            功能开发中···
          </div>
        </div>
      </Container>
    );
  }
}
