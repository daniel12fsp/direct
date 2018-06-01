import { update, h, render } from "../../index";
import { Component } from "../../Component";
import { p } from "../utils.js";

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = { color: 0 };
  }

  render() {
    return (
      <div>
        <label>What needs to be done?</label>
        <div />
        <span> {this.state.color + 4}</span>
      </div>
    );
  }
}
let root = document.createElement("div");
let ref;
const comp2 = <TodoApp ref={e => (ref = e)} />;
describe("<TodoApp />", () => {
  it("mount", () => {
    render(comp2, root);
    const answear = p(`
        <div>
        <label >What needs to be done?</label>
        <div></div>
        <span > 4 </span>  
        </div>
      `);
    expect(p(root.innerHTML)).toBe(answear);
  });
  it("exec state", () => {
    let answear;
    ref.setState({ color: ref.state.color + 1 });
    answear = p(
      "<div><label>Whatneedstobedone?</label><div></div><span>5</span></div>"
    );
    expect(p(root.innerHTML)).toBe(answear);
    ref.setState({ color: ref.state.color + 1 });
    answear = p(
      "<div><label>Whatneedstobedone?</label><div></div><span>6</span></div>"
    );
    expect(p(root.innerHTML)).toBe(answear);
    ref.setState({ color: ref.state.color + 1 });
    answear = p(
      "<div><label>Whatneedstobedone?</label><div></div><span>7</span></div>"
    );
    expect(p(root.innerHTML)).toBe(answear);
    ref.setState({ color: ref.state.color + 1 });
    answear = p(
      "<div><label>Whatneedstobedone?</label><div></div><span>8</span></div>"
    );
    expect(p(root.innerHTML)).toBe(answear);
  });
});
