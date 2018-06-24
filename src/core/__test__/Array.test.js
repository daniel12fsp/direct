import { update, add, h } from "../index";
import { Component } from "../Component";

class C extends Component {
  render() {
    return <div>Component</div>;
  }
}

function F() {
  return <div>Component stateless</div>;
}

function Parent({children}) {
  return <div>{children}</div>;
}
describe("Array", () => {
  let root;
  beforeEach(() => {
    root = document.createElement("div");
  });
  it("Must array be in dom", () => {
    update(
      null,
      <div>
        {[
          <div>Div</div>,
          null,
          <span>Span</span>,
          undefined,
          <C />,
          false,
          <F />,
          true
        ]}
      </div>,
      root
    );
    expect(root.innerHTML).toBe(
      "<div><div>Div</div><span>Span</span><div>Component</div><div>Component stateless</div></div>"
    );
  });

  it("Must array be in dom", () => {
    update(
      null,
      <span>
        {[<C />, <F />]}
        {() => Here}
      </span>,
      root
    );
    expect(root.innerHTML).toBe(
      "<span><div>Component</div><div>Component stateless</div><div>Component stateless</div><div>Component</div></span>"
    );
  });

  it("Must array be in dom", () => {
    update(
      null,
      <div>
        <Parent>
          {[<C />, <F />]}
        </Parent>
        <Parent>
          {[<C />, <F />]}
        </Parent>
      </div>
      ,
      root
    );
    expect(root.innerHTML).toBe(
      ""
    );
  });
});
