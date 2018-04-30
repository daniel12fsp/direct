import { update, add, h } from "../index";

describe("Evaluation", () => {
  let root;
  beforeEach(() => {
    root = document.createElement("div");
  });
  describe("Simple 1-level tree", () => {
    it("string to string", () => {
      update(null, <div>{"good day"}</div>, root);
      expect(root.innerHTML).toBe("<div>good day</div>");
    });
    it("true boolean", () => {
      update(null, <div>{true}</div>, root);
      expect(root.innerHTML).toBe("<div></div>");
    });
    it("false boolean", () => {
      update(null, <div>{false}</div>, root);
      expect(root.innerHTML).toBe("<div></div>");
    });
    it("number to string", () => {
      update(null, <div>{2}</div>, root);
      expect(root.innerHTML).toBe("<div>2</div>");
    });
    it("0", () => {
      update(null, <div>{0}</div>, root);
      expect(root.innerHTML).toBe("<div>0</div>");
    });
    it("object", () => {
      const fn = () => update(null, <div>{{ a: 1, b: 1 }}</div>, root);
      expect(fn).toThrowError("Type of object is not evaluaty");
    });
    it("null", () => {
      update(null, <div>{null}</div>, root);
      expect(root.innerHTML).toBe("<div></div>");
    });
    it("undefined", () => {
      update(null, <div>{undefined}</div>, root);
      expect(root.innerHTML).toBe("<div></div>");
    });
    it("func called", () => {
      const fn = () => "this is a function";
      update(null, <div>{fn()}</div>, root);
      expect(root.innerHTML).toBe("<div>this is a function</div>");
    });
    it("func not called", () => {
      const fn = () => "this is a function";
      update(null, <div>{fn}</div>, root);
      expect(root.innerHTML).toBe("<div></div>");
    });
    it("array to string", () => {
      update(null, <div>{[1, "1", true, "d", false]}</div>, root);
      expect(root.innerHTML).toBe("<div>11d</div>");
    });
    //TODO waiting for =
    xit("func component to dom", () => {});
    xit("component to dom", () => {});
  });
});
