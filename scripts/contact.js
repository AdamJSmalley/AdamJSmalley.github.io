//function to send the data in name, email, and message fields via ajax to swanleyhypnotherist.co.uk/adam/contact.php when contactBtn is clicked
function sendContact() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var container = document.getElementById("form");
    var dataString = "name=" + name + "&email=" + email + "&message=" + message;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "contact.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                container.innerHTML = xhr.responseText;
            } else {
                container.textContent = "Error please try again";
                console.error("Error: " + xhr.status);
            }
        }
    };
    xhr.send(dataString);
}

function addEventListeners() {
//show popup when contactBtn is clicked
const contactBtn = document.querySelector('#contactBtn');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('#closeBtn');
contactBtn.addEventListener('click', () => popup.classList.add('showPopup'));
closeBtn.addEventListener('click', () => popup.classList.remove('showPopup'));
}

//exoport all functions
export { sendContact, addEventListeners };