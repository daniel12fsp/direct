import { update, h, add } from "../index";
describe("Insert and Replace", () => {
    let root;
    beforeEach(()=>{
        root=document.createElement("span");
    });
    describe("Non-nested", () => {
        it("Non-nested vs NULL", () => {
            update(null, <div/>, root);
            expect(root.innerHTML).toBe("<div></div>");
            update(<div/>, null, root);
            expect(root.innerHTML).toBe("");
        });
        it(" text vs NULL", () => {
            update(null, "good day", root);
            expect(root.innerHTML).toBe("good day");
            update("good day", null, root);
            expect(root.innerHTML).toBe("");
        });
        it("NULL vs ' '" , () => {
            update(null, "", root);
            expect(root.innerHTML).toBe("");
            update("", null, root);
            expect(root.innerHTML).toBe("");
        });
        it("NULL vs NULL", () => {
            update(null, null, root);
            expect(root.innerHTML).toBe("");
        });
       it("NULL vs underfined", () => {
            update(null, undefined, root);
            expect(root.innerHTML).toBe("");
            update(undefined, null , root);
            expect(root.innerHTML).toBe("");
        });
        it("undefined vs undefined", () => {
            update(undefined, undefined, root);
            expect(root.innerHTML).toBe("");
        });
    });

    describe("Nested Tree", () => {
        it("Empty Tree vs One-level tree", ()=>{
            const oldTree = <div></div>;
            const newTree = <div> 1 </div>;
            add(oldTree, root);
            expect(root.innerHTML).toBe("<div></div>");
            update(oldTree, newTree, root);
            expect(root.innerHTML).toBe("<div> 1 </div>");
        });
        it("One-level tree vs Empty Tree ", ()=>{
            const oldTree = <div> 1 </div>;
            const newTree = <div></div>;
            update(null, oldTree, root);
            expect(root.innerHTML).toBe("<div> 1 </div>");
            update(oldTree, newTree, root);
            expect(root.innerHTML).toBe("<div></div>");
        })
 
    })
});