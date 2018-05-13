import { update, add, h } from "../index";
describe("Replace", () => {
  let root;
  beforeEach(() => {
    root = document.createElement("div");
  });
  describe("Non-nested", () => {
    it("string vs jsx", () => {
      add("good day", root);
      expect(root.innerHTML).toBe("good day");
      update("good day", <div />, root);
      expect(root.innerHTML).toBe("<div></div>");
    });
    it(" jsx vs string", () => {
      add(<div />, root);
      expect(root.innerHTML).toBe("<div></div>");
      update(<div />, "good day", root);
      expect(root.innerHTML).toBe("good day");
    });
    it(" jsx with children vs jsx with children", () => {
      add(<div>Be : bold</div>, root);
      expect(root.innerHTML).toBe("<div>Be : bold</div>");
      update(<div>Be : bold</div>, <div>Be : smart</div>, root);
      expect(root.innerHTML).toBe("<div>Be : smart</div>");
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
