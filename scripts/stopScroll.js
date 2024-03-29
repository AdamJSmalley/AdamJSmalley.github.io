import { spin, zoom } from "./cube.js";
import type from "./type.js";
import { addEventListeners } from "./contact.js";

var keys = { 37: 1, 38: 1, 39: 1, 40: 1 }; //object with all keys that can be used to scroll
var first = true; //is this the first time zoom has ran
const website = document.querySelector("iframe");
const video = document.querySelector("video");
const body = document.querySelector("body");
const slide1 = document.querySelector(".container");

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

const isScrollKey = (e) => { if (keys[e.keyCode]) removeListeners() };

//remove text from bio and store it in a variable
const bio = document.querySelector("#bio");
const bioText = bio.textContent;
bio.innerHTML = "";

//start cube animation and listen for scrolling
export function startAndListen() {
    window.addEventListener('wheel', removeListeners, wheelOpt); // modern desktop
    window.addEventListener('touchmove', removeListeners, wheelOpt); // mobile
    window.addEventListener('keydown', isScrollKey, false);
}

//a function to remove event listeners
function removeListeners() {
    //remove loader div from dom
    const loader = document.getElementById("loader");
    loader.remove();

    zoom();

    window.removeEventListener('wheel', removeListeners, wheelOpt);
    window.removeEventListener('touchmove', removeListeners, wheelOpt);
    window.removeEventListener('keydown', isScrollKey, wheelOpt);
}

//remove event listeners and run bio animation
export function animationFinished() {
    //load assets
    website.loading = "eager";
    slide1.style.backgroundImage = `url('.//images/timeline/background/${slide1.dataset.org}.webp')`
    video.poster = `./videos/${video.dataset.src}Poster.webp`;
    video.preload = "auto";

    //add event listener to play and pause video
    var videoShowing = false;

    video.parentElement.addEventListener('transitionend', (event) => {
        if (event.propertyName === 'opacity') {
            if (!videoShowing) {
                videoShowing = true;
                video.play()
            }
            else {
                videoShowing = false;
                video.pause();
            }
        }
    });

    //change css to make overflow visible
    body.style.overflow = "visible";

    //start bio animation
    type(bioText);

    //add event listeners to contact buttons
    addEventListeners();
}