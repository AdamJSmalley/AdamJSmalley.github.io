//import { bio } from "./content.js";

export default function animatePoem(bioText) {
    var i = 0;
    var speed = 50;
    typeWriter();

    function typeWriter() {
        if (i < bioText.length) {
            document.getElementById("bio").innerHTML += bioText.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
}
