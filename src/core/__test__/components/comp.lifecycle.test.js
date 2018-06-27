import { update, h, render } from "../../index";
import { Component } from "../../Component";
import { p } from "../utils.js";

let lifecycle = [];
class DumbCompoment extends Component {
  constructor(props) {
    lifecycle.push("constructor");
    super(props);
    this.state = {
      status: `I'm dumb`
    };
  }
  componentWillReceiveProps() {
    lifecycle.push("componentWillReceiveProps");
  }
  componentWillMount() {
    lifecycle.push("componentWillMount");
  }
  componentDidMount() {
    lifecycle.push("componentDidMount");
  }
  componentWillUpdate() {
    lifecycle.push("componentWillUpdate");
  }
  componentDidUpdate() {
    lifecycle.push("componentDidUpdate");
  }
  shouldComponentUpdate() {
    lifecycle.push("shouldComponentUpdate");
    return true;
  }
  componentWillReceiveProps() {
    lifecycle.push("componentWillReceiveProps");
  }
  componentWillUnmount() {
    lifecycle.push("componentWillUnmount");
  }
  render() {
    lifecycle.push("render");
    return <div>{this.state.status}</div>;
  }
}

class Dumbest extends DumbCompoment {
  componentDidMount() {
    lifecycle.push("componentDidMount");
    this.setState({ status: "I'm brazilian" });
  }
}
let root;
let dumb;
root = document.createElement("div");
lifecycle = [];
describe("Component lifecycle", () => {
  it("Shoud these lifecycle to be called in mount stage", () => {
    const answear = p(
      `<div>
            I'm dumb
            </div>`
    );
    render(<DumbCompoment beSmart={false} ref={e => (dumb = e)} />, root);
    expect(p(root.innerHTML)).toBe(answear);
    const methods = [
      "constructor",
      "componentWillMount",
      "render",
      "componentDidMount"
    ];
    expect(lifecycle).toEqual(methods);
  });

  it("Shoud these lifecycle to be called in update stage", () => {
    lifecycle = [];

    const answear = p(
      `<div>
            I'm dumb
            </div>`
    );
    dumb.setState({ status: "I'm here" });
    expect(p(root.innerHTML)).toBe("<div>I'mhere</div>");
    const methods = [
      "componentWillReceiveProps",
      "componentWillUpdate",
      "shouldComponentUpdate",
      "render",
      "componentDidUpdate"
    ];
    expect(lifecycle).toEqual(methods);
  });
  it("Shoud setState in didmount works", () => {
    root = document.createElement("div");
    lifecycle = [];
    render(<Dumbest ref={e => (dumb = e)} />, root);
    expect(p(root.innerHTML)).toBe("<div>I'mbrazilian</div>");
  });
});
