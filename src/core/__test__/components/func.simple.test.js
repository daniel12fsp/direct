import { update, add, h } from "../../index";
import { p } from "../utils.js";


function Child({msg}){
    return (<div> {msg} </div>);
}

function Parent({msg}){
    return <Child msg={msg}/>
}

function GrandParent(){
    return <Parent msg="Hi, Mark"/>
}
describe("Simple <Functional />", () => {
    let root;
    beforeEach(() => {
        root = document.createElement("div");
    });
    it("Child works", () => {
        update(null, <Child msg="Hi, Jackes" />, root);
        expect(p(root.innerHTML)).toBe("<div>Hi,Jackes</div>");
        update(<Child msg="Hi, Jackes" />, <Child msg="Hi, Daniel" />, root);
        expect(p(root.innerHTML)).toBe("<div>Hi,Daniel</div>");
    });
    it("Parent Works", () => {
        update(null, <Parent  msg="Hi, Mark" />, root);
        expect(p(root.innerHTML)).toBe("<div>Hi,Mark</div>");
        update(<Parent  msg="Hi, Mark" />, null, root);
        expect(p(root.innerHTML)).toBe("");
    });
    it("GrandParent Works", () => {
        update(null, <GrandParent  msg="Hi, Mark" />, root);
        expect(p(root.innerHTML)).toBe("<div>Hi,Mark</div>");
        update(<GrandParent  msg="Hi, Mark" />, null, root);
        expect(p(root.innerHTML)).toBe("");
    });
});
