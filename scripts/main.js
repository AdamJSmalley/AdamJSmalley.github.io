import { startAndListen } from "./stopScroll.js";
import observeElements from "./animate.js";

//Show loading animation until page is loaded
window.onload = () => {
    const loader = document.getElementById("loader");
    loader.classList.add("hidden");
    //delete loader
    setTimeout(() => {
        loader.remove();
    }, 1000);

    document.getElementById("page").classList.add("show");
    
    //scroll to intro
    const intro = document.getElementById("intro");
    intro.scrollIntoView({ behavior: "auto" });
}

//block scrolling and run the cube animation
startAndListen();

//copy skills text
const skillsList = document.querySelector('.skills');
const duplicateList = skillsList.cloneNode(true);
duplicateList.setAttribute('aria-hidden', 'true');
const marquee = document.querySelector('#marquee');
marquee.appendChild(duplicateList);

//get all animation selectors and observe them
const selectors = ['Parent', '', 'Down', 'Up', 'Left', 'Right'];

selectors.forEach(selector => observeElements(selector));