import { changed, h } from "../index";

describe("Changed", () => {
  it(" simple div vs null || undefined", () => {
    let prev, next;
    prev = <div />;
    next = null;
    expect(changed(prev, next)).toBe(true);
    expect(changed(prev, prev)).toBe(false);
    expect(changed(next, next)).toBe(false);

    prev = <div />;
    next = undefined;
    expect(changed(prev, next)).toBe(true);
    expect(changed(prev, prev)).toBe(false);
    expect(changed(next, next)).toBe(false);
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
    expect(changed(prev, next)).toBe(false);
    expect(changed(prev, prev)).toBe(false);
    expect(changed(next, next)).toBe(false);
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
    expect(changed(prev, prev)).toBe(false);
    expect(changed(next, next)).toBe(false);
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
    expect(changed(prev, prev)).toBe(false);
    expect(changed(next, next)).toBe(false);
  });
});
