import { changed, h } from "../index";

describe("Changed", () => {
  it(" simple div vs null || undefined", () => {
    let prev, next;
    prev = <div />;
    next = null;
    expect(changed(prev, next)).toBe(true);
    prev = <div />;
    next = undefined;
    expect(changed(prev, next)).toBe(true);
  });
  it(" same div but children", () => {
    let prev, next;
    prev = (
      <div>
        <p />
      </div>
    );
    next = (
      <div>
        <p />
        <p />
      </div>
    );
    expect(changed(prev, next)).toBe(true);
  });
  it(" div vs span", () => {
    let prev, next;
    prev = (
      <span>
        <p />
      </span>
    );
    next = (
      <div>
        <p />
        <p />
      </div>
    );
    expect(changed(prev, next)).toBe(true);
  });
  it(" string vs div", () => {
    let prev, next;
    prev = "good day";
    next = (
      <div>
        <p />
        <p />
      </div>
    );
    expect(changed(prev, next)).toBe(true);
  });
});
