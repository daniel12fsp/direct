import { update, h, add } from "../index";
// import Prettier from 'prettier';
// const prettier = require('prettier');

const p = code => code.replace(/\s/g, "");
const tree1L0C = <div />;
const tree1L1C = (
  <div>
    <span />
  </div>
);
const tree1L2C = (
  <div>
    <span />
    <p />
  </div>
);

const tree1L3C = (
  <div>
    <span />
    <p />
    <h1 />
  </div>
);

const tree2L1C = (
  <div>
    <span>
      <h1 />
    </span>
    <p>
      <span />
    </p>
    <h1>
      <div />
    </h1>
  </div>
);
describe("Tree Level Tree", () => {
  let root;

  beforeEach(() => {
    root = document.createElement("div");
  });
  describe("null vs tree without leaf", () => {
    it("tree - oneLevel", () => {
      update(null, tree1L0C, root);
      expect(root.innerHTML).toBe("<div></div>");
    });
    it("tree - twoLevel - one child", () => {
      const answear = p(`
                <div>
                    <span></span>
                </div>
            `);
      update(null, tree1L1C, root);
      expect(p(root.innerHTML)).toBe(answear);
    });
    it("tree - twoLevel - two children", () => {
      const answear = p(`
                <div>
                    <span></span>
                    <p></p>
                </div>
            `);
      update(null, tree1L2C, root);
      expect(p(root.innerHTML)).toBe(answear);
    });
    it("tree - twoLevel - three children", () => {
      const answear = p(`
                <div>
                    <span> </span>
                    <p></p>
                    <h1></h1>
                </div>
            `);
      update(null, tree1L3C, root);
      expect(p(root.innerHTML)).toBe(answear);
    });
    it("tree - three level - three children", () => {
      const answear = p(`
                <div>
                    <span>
                      <h1></h1>
                    </span>
                    <p >
                      <span> </span>
                    </p>
                    <h1 >
                      <div></div>
                    </h1>
                </div>
            `);
      update(null, tree2L1C, root);
      expect(p(root.innerHTML)).toBe(answear);
    });
  });
  describe("tree vs null", () => {
    it("tree - oneLevel", () => {
      update(null, tree1L0C, root);
      update(tree1L0C, null, root);
      expect(root.innerHTML).toBe("");
    });
    it("tree - twoLevel - one child", () => {
      update(null, tree1L1C, root);
      update(tree1L1C, null, root);
      expect(p(root.innerHTML)).toBe("");
    });
    it("tree - twoLevel - two children", () => {
      update(null, tree1L2C, root);
      update(tree1L2C, null, root);
      expect(p(root.innerHTML)).toBe("");
    });
    it("tree - twoLevel - three children", () => {
      update(null, tree1L3C, root);
      update(tree1L3C, null, root);
      expect(p(root.innerHTML)).toBe("");
    });
    it("tree - three level - three children", () => {
      update(null, tree2L1C, root);
      update(tree2L1C, null, root);
      expect(p(root.innerHTML)).toBe("");
    });
  });
  describe("tree vs tree", () => {
    it("tree1L0C vs tree1L1C", () => {
      const answear = p(`
                <div>
                    <span></span>
                </div>`);
      update(null, tree1L0C, root);
      update(tree1L0C, tree1L1C, root);
      expect(p(root.innerHTML)).toBe(answear);
    });
    it("tree1L1C vs tree1L0C", () => {
      const answear = p(`<div > </div>`);
      update(null, tree1L1C, root);
      update(tree1L1C, tree1L0C, root);
      expect(p(root.innerHTML)).toBe(answear);
    });
    it("tree1L1C vs tree1L2C", () => {
      const answear = p(`
                <div>
                  <span></span>
                  <p></p>
                </div>
              `);
      update(null, tree1L1C, root);
      expect(p(root.innerHTML)).toBe("<div><span></span></div>");
      update(tree1L1C, tree1L2C, root);
      expect(p(root.innerHTML)).toBe(answear);
    });
    it("tree1L2C vs tree1L1C", () => {
      const answear = p(`
            <div>
              <span></span>
            </div>
          `);
      update(null, tree1L2C, root);
      expect(p(root.innerHTML)).toBe("<div><span></span><p></p></div>");
      update(tree1L2C, tree1L1C, root);
      expect(p(root.innerHTML)).toBe(answear);
    });
    it("tree1L2C vs tree1L3C", () => {
      const answear = p(`
                <div>
                    <span></span>
                    <p></p>
                    <h1></h1>
                </div>
                    `);
      update(null, tree1L2C, root);
      expect(p(root.innerHTML)).toBe("<div><span></span><p></p></div>");
      update(tree1L2C, tree1L3C, root);
      expect(p(root.innerHTML)).toBe(answear);
    });
    it("tree1L3C vs tree1L2C", () => {
      const answear = p(`
                <div>
                  <span></span>
                  <p></p>
                </div>
                    `);
      update(null, tree1L3C, root);
      expect(p(root.innerHTML)).toBe(
        "<div><span></span><p></p><h1></h1></div>"
      );
      update(tree1L3C, tree1L2C, root);
      expect(p(root.innerHTML)).toBe(answear);
    });
    it("tree1L3C vs tree2L1C", () => {
      const tree1 = (
        <div>
          <span />
        </div>
      );

      const tree2 = (
        <div>
          <span>
            <h1 />
          </span>
          <p>
            <a />
          </p>
        </div>
      );
      const answear = p(`
          <div>
            <span>
              <h1></h1>
            </span>
            <p>
              <a></a>
            </p>
        </div>
      `);
      update(null, tree1L1C, root);
      update(tree1, tree2, root);
      expect(p(root.innerHTML)).toBe(answear);
    });
    it("string vs tree", () => {
      const tree1 = "string";
      const tree2 = (
        <div>
          <span />
        </div>
      );
      const answear = p(`
        <div>
            <span></span>       
      </div>
      `);
      update(null, tree1, root);
      update(tree1, tree2, root);
      expect(p(root.innerHTML)).toBe(answear);
    });
    it("tree vs string", () => {
      const tree1 = (
        <div>
          <span />
        </div>
      );
      const tree2 = "string";
      const answear = p(`
        string
      `);
      update(null, tree1, root);
      update(tree1, tree2, root);
      expect(p(root.innerHTML)).toBe(answear);
    });
  });
});
