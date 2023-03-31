import { spin } from "./cube.js";
import { blockScroll } from "./stopScroll.js";
import observeElements from "./animate.js";


//document.addEventListener('DOMContentLoaded', () => {
//display current year in footer
/* var currentYear = new Date().getFullYear();
  document.getElementById("currentYear").innerHTML = currentYear; */

spin();

blockScroll()

//copy skills text
const skillsList = document.querySelector('.skills');
const duplicateList = skillsList.cloneNode(true);
duplicateList.setAttribute('aria-hidden', 'true');
const marquee = document.querySelector('#marquee');
marquee.appendChild(duplicateList);


//show popup when contactBtn is clicked
const contactBtn = document.querySelector('#contactBtn');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('#closeBtn');
contactBtn.addEventListener('click', () => popup.classList.add('showPopup'));
closeBtn.addEventListener('click', () => popup.classList.remove('showPopup'));



//get all animation selectors and observe them
const selectors = ['Parent', '', 'Down', 'Up', 'Left', 'Right'];

selectors.forEach(selector => observeElements(selector));

//});

/* //a function to create scrolling text across skills div populated by cubeContent
function scrollText() {
    //const skills = document.querySelector('.skills');
    const skillsText = document.querySelector('.skills');
    const skillsTextContent = document.querySelector('.skills-text');
    const skillsTextContentClone = skillsTextContent.cloneNode(true);
    skillsText.appendChild(skillsTextContentClone);

    let scroll = 0;

    function scrollText() {
        scroll++;
        skillsText.style.transform = `translateX(${-scroll}px)`;
        if (scroll > skillsTextContent.clientWidth) {
            scroll = 0;
        }
    }

    setInterval(scrollText, 10);
} */