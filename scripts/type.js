export default function type(bioText) {
    var bio = document.getElementById('bio');
    bio.innerHTML = bioText;
    //create css variable n and set it to the length of the string
    bio.style.setProperty('--n', bioText.trim().length);
    //start the animation by adding the type class
    bio.classList.add('type');
}
