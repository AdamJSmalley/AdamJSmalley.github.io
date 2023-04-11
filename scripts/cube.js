import { animationFinished } from "./stopScroll.js";

const spintl = gsap.timeline({ repeat: -1 }); //create a timeline to run animate the spinning of the cube
var imgNum = 2; // Variable to keep track of the current index in the images array
const box = document.querySelector('.cube'); //get the cube element

const faces = new Map(); //create a map to store the faces of the cube
box.querySelectorAll('*').forEach(element => {
    faces.set(element.id, element);
});

//get all children of skills list, add the innerHTML to array and then insert a break after the close of the icon tag for each item
const skillsList = document.querySelector('.skills');
const skillsListItems = skillsList.querySelectorAll('li');
const skillsListItemsArray = Array.from(skillsListItems);
const cubeContent = skillsListItemsArray.map(item => {
    const copiedItem = item.cloneNode(true);
    copiedItem.innerHTML = copiedItem.innerHTML.replace(/<\/i>/g, '</i><br>');
    return copiedItem.innerHTML;
});

//callback to change image each time the square rotates
function updateface(faceId) {

    const face = faces.get(faceId);
    face.innerHTML = cubeContent[imgNum];
    imgNum = (imgNum + 1) % cubeContent.length; // Increment index and wrap around if necessary
}

//spinning animation
export function spin() {
    //set up the images on the first 2 cube faces
    faces.get("front").innerHTML = cubeContent[0];
    faces.get("left").innerHTML = cubeContent[1];

    spintl.to(box, 2, { rotateY: '90deg', ease: "power3.out" })
        .add(() => updateface('back'))

        .to(box, 2, { rotateY: '180deg', ease: "power3.out" })
        .add(() => updateface('right'))

        .to(box, 2, { rotateY: '270deg', ease: "power3.out" })
        .add(() => updateface('front'))

        .to(box, 2, { rotateY: '360eg', ease: "power3.out" })
        .add(() => updateface('left'))

    spintl.play();
};

//zoom animation
export function zoom() {

    //lazy load image of myself
    const me = document.querySelector('#me');
    me.src = me.dataset.src;

    //set background colour of body to white
    document.body.style.backgroundColor = 'white';
    
    //stop the spinning animation
    spintl.kill();

    const growTl = gsap.timeline({ onComplete: animationFinished });

    //common parameters for the expand animation
    const expandParam = { duration: 1, ease: "expo.out" };

    //calculate the new size of the cube and the offset of the faces
    const size = 80;
    const sizeStr = size + 'vmin';
    const offset = (size / 2) + 'vmin';

    growTl.to('.text', { duration: 1, color: 'transparent', ease: "expo.inOut" });
    growTl.to('.text', { duration: 1, width: 0, height: 0, margin: 0, ease: "circ.out" }, '>');
    growTl.to('.cube-container', { duration: 1, height: '100vh', width: '100vw', ease: "circ.out" }, '<');
    growTl.to(['#right', '#top', '#bottom', '#left'], { duration: 1, borderColor: 'black' }, '<');
    growTl.to(box, { duration: 1, rotateX: '90deg' , rotateY: '360deg' }, '>'); //rotateX: '90deg'
    growTl.to(['.cube-face', '.cube'], { width: sizeStr, height: sizeStr, ...expandParam }, '<');
    growTl.to('#left', { right: offset, ...expandParam }, "<");
    growTl.to('#right', { left: offset, ...expandParam }, "<");
    growTl.to('#top', { bottom: offset, ...expandParam }, "<");
    growTl.to('#bottom', { top: offset, ...expandParam }, "<");
    growTl.to('.cube-container', { margin: 0, ...expandParam }, "<");
    growTl.to('.cube-face', { duration: 1, backgroundColor: 'white', ease: "expo.out" }, '<');
    growTl.to('#me', { duration: 1, opacity: 1, ease: "circ.out" }, '>.5');
    growTl.to(['.cube-face', '.cube'], { width: '100vw', height: '100vh', ...expandParam }, '>');
    growTl.to('.cube-face', { duration: 0.2, backgroundColor: 'white', border: 0, ease: "expo.out" }, '<0.5');

    growTl.play();
}