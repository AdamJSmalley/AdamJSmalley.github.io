import * as cube from "./cube.js";
import oneByOne from "./oneByOne.js";

const spintl = gsap.timeline({ repeat: -1 });

export function spin() {
  let index = 2; // Variable to keep track of the current index in the images array

  const content = [
    { icon: 'fab fa-square-js', skill: 'JavaScript' },
    { icon: 'fab fa-html5', skill: 'HTML' },
    { icon: 'fab fa-css3-alt', skill: 'CSS' },
    { icon: 'fab fa-php', skill: 'PHP' },
    { icon: 'fab fa-wordpress', skill: 'Wordpress' },
    { icon: 'fas fa-database', skill: 'MySQL' },
    { icon: 'fab fa-git', skill: 'Git' },
    { icon: 'fas fa-people-group', skill: 'Teamwork' },
    { icon: 'fas fa-comment', skill: 'Communication' },
    { icon: 'fas fa-puzzle-piece', skill: 'Problem-solving' },
    { icon: 'fas fa-eye', skill: 'Attention<br />to detail' },
    { icon: 'fas fa-lightbulb', skill: 'Creativity' }
  ];

  //callback to change image each time the square rotates
  function updateface(faceId) {

    const face = cube.faces.get(faceId);
    const item = content[index];
    face.innerHTML = `<i class="${item.icon}"></i><br>${item.skill}`;
    index = (index + 1) % content.length; // Increment index and wrap around if necessary
  }

  //set up the images on the first 2 fas cube.faces
  cube.faces.get("front").innerHTML = `<i class="${content[0].icon}"></i><br>${content[0].skill}`;
  cube.faces.get("left").innerHTML = `<i class="${content[1].icon}"></i><br>${content[1].skill}`;

  spintl.to(cube.box, 2, { rotateY: '90deg', ease: "power3.out" })
    .add(() => updateface('back'))

    .to(cube.box, 2, { rotateY: '180deg', ease: "power3.out" })
    .add(() => updateface('right'))

    .to(cube.box, 2, { rotateY: '270deg', ease: "power3.out" })
    .add(() => updateface('front'))

    .to(cube.box, 2, { rotateY: '360eg', ease: "power3.out" })
    .add(() => updateface('left'))

  spintl.play();
};

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
var first = true; //is this the first time zoom has ran

function zoom() {
  first = false;
  //console.log(`spintl is ${spintl}`);
  spintl.kill();

  const growTl = gsap.timeline({onComplete: enableScroll});

  const expandParam = { duration: 1, ease: "expo.out" };
  /* const width = 40;
  const height = 90;
  const Xoffset = (width / 2) + 'vw';
  const Yoffset = (height / 2) + 'vh';
  const heightStr = height + 'vh';
  const widthStr = width + 'vw'; */

  function onTextFade() {
    document.querySelector('#intro').style.gridTemplateAreas = 'cube';
  }

  const size = 80;
  const sizeStr = size + 'vmin';
  const offset = (size / 2) + 'vmin';
  //const backOffset = (-1 * offset);

  growTl.to('.text', { duration: 1, color: 'transparent', ease: "expo.inOut" });
  growTl.to('.text', { duration: 1,  width: 0, height: 0, margin: 0, ease: "circ.out"}, '>');
  growTl.to('.cube-container', { duration: 1, height: '100vh',  width: '100vw', ease: "circ.out"}, '<');
  growTl.to(['#right', '#top', '#bottom', '#left'], { duration: 1, borderColor: 'black' }, '<');
  growTl.to(cube.box, { duration: 1, rotateX: '90deg', rotateY: '360deg' }, '>');
  growTl.to(['.cube-face', '.cube'], { width: sizeStr, height: sizeStr, ...expandParam }, '<');
  growTl.to('#left', { right: offset, ...expandParam }, "<");
  growTl.to('#right', { left: offset, ...expandParam }, "<");
  growTl.to('#top', { bottom: offset, ...expandParam }, "<");
  growTl.to('#bottom', { top: offset, ...expandParam }, "<");
  growTl.to('.cube-container', { margin: 0, ...expandParam }, "<");
  growTl.to('.cube-face', { duration: 1, backgroundColor: 'white', ease: "expo.out" }, '<');
  //growTl.to('#front', { transform: 'translateZ(' + offset + ')', ...expandParam }, "<");
  //growTl.to('#back', { transform: 'translateZ(' + backOffset + ')', ...expandParam }, "<");
  growTl.to('#me', { duration: 1, opacity: 1, ease: "circ.out" }, '>.5');
  growTl.to(['.cube-face', '.cube'], { width: '100vw', height: '100vh', ...expandParam }, '>');
  growTl.to('.cube-face', { duration: 0.2, backgroundColor: 'white', border: 0, ease: "expo.out" }, '<0.5');
  growTl.play(); 


}

function preventDefault(e) {
  e.preventDefault();

  if (first) zoom(); //start zoom animation.
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; }
  }));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
export function watchForScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
  oneByOne();
}
