import { addProps } from "../index";

describe("Props to attributes", () => {
  let root;
  beforeEach(() => {
    root = document.createElement("div");
  });
  it("Shoud add in dom", () => {
    addProps(root, { tabIndex: 0, visible: false });
    expect(root.hasAttribute("tabindex")).toBe(true);
    expect(root.hasAttribute("visible")).toBe(true);
  });
  it("Shoud add event in dom", () => {
    let callback;
    addProps(root, { onClick: () => (callback = "onclick") });
    root.click();
    expect(callback).toBe("onclick");
  });
  it("Shoud className be class", () => {
    addProps(root, { className: "clasz" });
    expect(root.hasAttribute("class")).toBe(true);
    expect(root.getAttribute("class")).toBe("clasz");
  });
  it("Shoud don't exist ref", () => {
    addProps(root, { ref: () => {} });
    expect(root.hasAttribute("ref")).toBe(true);
  });
});
