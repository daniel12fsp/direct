import { update, add, h } from "../index";
describe("Replace", () => {
  let root;
  beforeEach(() => {
    root = document.createElement("div");
  });
  describe("Non-nested", () => {
    it("string vs jsx", () => {
      update(null, "good day", root);
      expect(root.innerHTML).toBe("good day");
      update("good day", <div />, root);
      expect(root.innerHTML).toBe("<div></div>");
    });
    it(" jsx vs string", () => {
      update(null, <div />, root);
      expect(root.innerHTML).toBe("<div></div>");
      update(<div />, "good day", root);
      expect(root.innerHTML).toBe("good day");
    });
    it(" jsx with children vs jsx with children", () => {
      const tree1 = <div>Be : bold</div>;
      const tree2 = <div>Be : smart</div>;
      update(null, tree1, root);
      expect(root.innerHTML).toBe("<div>Be : bold</div>");
      update(tree1, tree2, root);
      expect(root.innerHTML).toBe("<div>Be : smart</div>");
    });
    it(" jsx with children vs jsx with children", () => {
      const tree1 = (
        <div>
          {"Be"} : {"bold"}
        </div>
      );
      const tree2 = (
        <div>
          {"Be"} : {"smart"}
        </div>
      );
      update(null, tree1, root);
      expect(root.innerHTML).toBe("<div>Be : bold</div>");
      update(tree1, tree2, root);
      expect(root.innerHTML).toBe("<div>Be : smart</div>");
    });
    it(" Replace tag not leave", () => {
      const tree1 = (
        <div>
          <span/>
        </div>
      );
      const tree2 = (
        <h1>
          <span/>
        </h1>
      );
      update(null, tree1, root);
      expect(root.innerHTML).toBe("<div><span></span></div>");
      update(tree1, tree2, root);
      expect(root.innerHTML).toBe("<h1><span></span></h1>");
    });
    it(" Replace array", () => {
      const tree1 = [];
      const tree2 = [<div />];
      update(null, tree1, root);
      expect(root.innerHTML).toBe("");
      update(tree1, tree2, root);
      expect(root.innerHTML).toBe("<div></div>");
      update(tree2, [<span />], root);
      expect(root.innerHTML).toBe("<span></span>");
    });
  });
  describe("Nested", () => {
    it("One-level tree vs One-level tree ", () => {
      const oldTree = <div> 1 </div>;
      const newTree = <div> 2 </div>;
      update(null, oldTree, root);
      expect(root.innerHTML).toBe("<div> 1 </div>");
      update(oldTree, newTree, root);
      expect(root.innerHTML).toBe("<div> 2 </div>");
    });
  });
});
