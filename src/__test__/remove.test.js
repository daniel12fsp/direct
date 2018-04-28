import { changed, h } from "../index";
describe("Remove", () => {
    let root;
    beforeEach(()=>{
        root=document.createElement("div");
    });
    describe("Simple", () => {
        it("Non-nested vs NULL", () => {
            changed(<div/>, null, root);
            expect(root.innerHTML).toBe("<div></div>");
        });
        xit("NULL vs text", () => {
            changed(null, "good day", root);
            expect(root.innerHTML).toBe("good day");
        });
        xit("NULL vs ' '" , () => {
            changed(null, "", root);
            expect(root.innerHTML).toBe("");
        });
        xit("NULL vs NULL", () => {
            changed(null, null, root);
            expect(root.innerHTML).toBe("");
        });
       xit("NULL vs underfined", () => {
            changed(null, undefined, root);
            expect(root.innerHTML).toBe("");
        });
        xit("underfined vs underfined", () => {
            changed(null, <div/>, root);
            expect(root.innerHTML).toBe("<div></div>");
        });
    });
});