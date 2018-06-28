import { h, render } from "./core";
export { Component } from "./core/Component.js";
console.log("Direct works");
export default {
  createElement: h,
  render
};
