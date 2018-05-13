import { changed, h, update } from "../index";
const p = code => code.replace(/\s/g, "");

describe("<Function />", () => {
  let root;
  const DumbFN = props => <div>Its dumb{props.beSmart}</div>;
  const SmartFN = props => <div>Its smart{props.beSmart}</div>;
  const TwoLevelFN = props => (
    <div>
      Its two<SmartFN beSmart={props.two || "Root"} />
    </div>
  );

  beforeEach(() => {
    root = document.createElement("div");
  });
  it("null vs <Function />", () => {
    const answear = p(`<div>Itsdumbfalse</div>`);
    update(null, <DumbFN beSmart={"false"} />, root);
    expect(p(root.innerHTML)).toBe(answear);
  });
  it("<Function /> vs null", () => {
    const answear = "";
    update(null, <DumbFN beSmart={"false"} />, root);
    update(<DumbFN beSmart={"false"} />, null, root);
    expect(p(root.innerHTML)).toBe(answear);
  });
  it("With props diff: <Function />  vs <Function />", () => {
    let answear = `<div>Itsdumbfalse</div>`;
    update(null, <DumbFN beSmart={"false"} />, root);
    expect(p(root.innerHTML)).toBe(answear);
    update(<DumbFN beSmart={"false"} />, <DumbFN beSmart={"true"} />, root);
    answear = "<div>Itsdumbtrue</div>";
    expect(p(root.innerHTML)).toBe(answear);
  });
  it("With props diff: <Function1 />  vs <Function2 />", () => {
    let answear = "<div>Itsdumbfalse</div>";
    update(null, <DumbFN beSmart={"false"} />, root);
    expect(p(root.innerHTML)).toBe(answear);
    update(<DumbFN beSmart={"false"} />, <SmartFN beSmart={"false"} />, root);
    answear = "<div>Itssmartfalse</div>";
    expect(p(root.innerHTML)).toBe(answear);
  });
  it("<Function />  vs 2-level <Function2 />", () => {
    update(null, <DumbFN beSmart="str1" />, root);
    let answear = "<div>Itsdumbstr1</div>";
    expect(p(root.innerHTML)).toBe(answear);
    update(<DumbFN beSmart="str1" />, <TwoLevelFN />, root);
    answear = "<div>Itstwo<div>ItssmartRoot</div></div>";
    expect(p(root.innerHTML)).toBe(answear);
  });
  it("2-level <Function1 />  vs 2-level <Function1 />", () => {
    let answear = "<div>Itstwo<div>Itssmartcool</div></div>";
    update(null, <TwoLevelFN two="cool" />, root);
    expect(p(root.innerHTML)).toBe(answear);
    update(<TwoLevelFN two="cool" />, <TwoLevelFN two="coolest" />, root);
    answear = "<div>Itstwo<div>Itssmartcoolest</div></div>";
    expect(p(root.innerHTML)).toBe(answear);
  });
});
