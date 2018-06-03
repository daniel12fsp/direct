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
  it("Shoud style to be string", () => {
    addProps(root, { style: {top:'0', backgroundImage: 'lightblue', boxShadow: '0 0 1px 1px red', marginLeft: 8}});
    expect(root.hasAttribute("style")).toBe(true);
    expect(root.getAttribute("style")).toBe("");
  });
  it("Shoudn't exist reserved props", () => {
    addProps(root, { ref: () => {}, key: '1', __self:{}, __source: {}});
    expect(root.hasAttribute("ref")).toBe(false);
    expect(root.hasAttribute("key")).toBe(false);
    expect(root.hasAttribute("__self")).toBe(false);
    expect(root.hasAttribute("__source")).toBe(false);
  });
});
