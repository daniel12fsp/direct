import { path, changed, h } from "../index";
describe("Insert", () => {
    let root;
    beforeEach(()=>{
        root=document.createElement("div");
    });
    describe("Simple", () => {
        it("NULL vs Non-nested", () => {
            changed(null, <div/>, root);
            expect(root.innerHTML).toBe("<div></div>");
        });
        it("NULL vs text", () => {
            changed(null, "good day", root);
            expect(root.innerHTML).toBe("good day");
        });
        it("NULL vs ' '" , () => {
            changed(null, "", root);
            expect(root.innerHTML).toBe("");
        });
        it("NULL vs NULL", () => {
            changed(null, null, root);
            expect(root.innerHTML).toBe("");
        });
        it("NULL vs underfined", () => {
            changed(null, undefined, root);
            expect(root.innerHTML).toBe("");
        });
        it("underfined vs underfined", () => {
            changed(null, <div/>, root);
            expect(root.innerHTML).toBe("<div></div>");
        });
    });
    xdescribe("Nested", () => {

    })
});