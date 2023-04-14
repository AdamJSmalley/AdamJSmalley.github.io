import { startAndListen } from "./stopScroll.js";
import observeElements from "./animate.js";
import { spin, zoom } from "./cube.js";
import { addEventListeners, sendContact} from "./contact.js";

//add event listeners
addEventListeners();

//scroll to intro
const intro = document.getElementById("intro");
intro.scrollIntoView({ behavior: "smooth" });

//Show loading animation until page is loaded
window.onload = () => {
    const loader = document.getElementById("loader");
    spin();
    //loader.classList.add("hidden");
    //create a gsap timeline that fades in poem, then fades out loader and makes the h1 fade in from the top
    const tl = gsap.timeline();
    tl.fromTo("#loader", { opacity: 1, filter: 'blur(20px)' }, { opacity: 0, filter: 'blur(0px)', duration: 0.5 })
        .fromTo("#poem", { opacity: 0, filter: 'blur(20px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: Sine.easeOut }, '+=1')
        .fromTo("h1", { opacity: 0, y: '-100%', filter: 'blur(20px)' }, { opacity: 1, y: '0%', filter: 'blur(0px)', duration: 0.5, ease: Sine.easeOut }, '>')
        .fromTo(".cube-container", { opacity: 0, y: '-100%', filter: 'blur(20px)' }, { opacity: 1, y: '0%', filter: 'blur(0px)', duration: 1, ease: Bounce.easeOut }, '>')
        .eventCallback("onComplete", startAndListen);

    tl.play();

    document.getElementById("page").classList.add("show");

    //add an onclick event listener to the contactBtn and closeBtn
document.querySelector('#submit').addEventListener('click', sendContact);
//document.querySelector('#closeBtn').addEventListener('click', sendContact);

}

//block scrolling and run the cube animation
//startAndListen();

//copy skills text
const skillsList = document.querySelector('.skills');
const duplicateList = skillsList.cloneNode(true);
duplicateList.setAttribute('aria-hidden', 'true');
const marquee = document.querySelector('#marquee');
marquee.appendChild(duplicateList);

//get all animation selectors and observe them
const selectors = ['Parent', '', 'Down', 'Up', 'Left', 'Right'];

selectors.forEach(selector => observeElements(selector));