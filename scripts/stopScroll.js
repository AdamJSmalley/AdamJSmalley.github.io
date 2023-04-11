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

//prevent scrolling and run zoom animation
function preventDefault(e) {
    e.preventDefault();

    if (first) {
        first = false;
        zoom(); //start zoom animation.
    }
}

//detect if the user is using a key to scroll
function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

//start cube animation and listen for scrolling
export function startAndListen() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);

    //start cube animation
    spin();
}

//remove event listeners and run bio animation
export function animationFinished() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    oneByOne(bioText);
}