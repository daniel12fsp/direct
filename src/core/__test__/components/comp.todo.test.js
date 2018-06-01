import { update, h, render } from "../../index";
import { Component } from "../../Component";
import { p } from "../utils.js";

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 0
    };
  }

  render() {
    return <button className="Hi">Add {this.state.color}</button>;
  }
}
let root = document.createElement("div");
let ref;
const comp2 = <TodoApp ref={e => (ref = e)} />;
describe("<TodoApp />", () => {
  it("mount", () => {
    render(comp2, root);
    const answear = p('<buttonclass="Hi">Add0</button>');
    expect(p(root.innerHTML)).toBe(answear);
  });
  it("exec state", () => {
    let answear;
    ref.setState({ color: ref.state.color + 1 });
    answear = p('<buttonclass="Hi">Add1</button>');
    expect(p(root.innerHTML)).toBe(answear);
    ref.setState({ color: ref.state.color + 1 });
    answear = p('<buttonclass="Hi">Add2</button>');
    expect(p(root.innerHTML)).toBe(answear);
    ref.setState({ color: ref.state.color + 1 });
    answear = p("<button>Add3</button>");
    ref.setState({ color: ref.state.color + 1 });
    answear = p('<buttonclass="Hi">Add4</button>');
    expect(p(root.innerHTML)).toBe(answear);
  });
});
