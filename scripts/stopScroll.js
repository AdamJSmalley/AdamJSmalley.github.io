import { spin, zoom } from "./cube.js";
import oneByOne from "./oneByOne.js";

var keys = { 37: 1, 38: 1, 39: 1, 40: 1 }; //object with all keys that can be used to scroll
var first = true; //is this the first time zoom has ran

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

//remove text from bio and store it in a variable
const bio = document.querySelector("#bio");
const bioText = bio.textContent;
bio.innerHTML = "";

//start cube animation and listen for scrolling
export function startAndListen() {
    window.addEventListener('wheel', removeListeners, wheelOpt); // modern desktop
    window.addEventListener('touchmove', removeListeners, wheelOpt); // mobile
    window.addEventListener('keydown', () => {if (keys[e.keyCode]) removeListeners()}, false);

    //start cube animation
    spin();
}

//a function to remove event listeners
function removeListeners() {
    zoom();
    window.removeEventListener('wheel', removeListeners, wheelOpt);
    window.removeEventListener('touchmove', removeListeners, wheelOpt);
    window.removeEventListener('keydown', removeListeners, wheelOpt);
}

//remove event listeners and run bio animation
export function animationFinished() {
    //get body
    const body = document.querySelector("body");
    //change css to make overflow visible
    body.style.overflow = "visible";
    //start bio animation
    oneByOne(bioText);
}