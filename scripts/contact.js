const fields = {
    name: { ref: document.getElementById("name"), regex: /^[A-Za-z .'-]+$/, ok: false },
    email: { ref: document.getElementById("email"), regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, ok: false },
    message: { ref: document.getElementById("message"), regex: /^(?=(?:\s*\S){20,1000}\s*$).*$/, ok: false }
}

function sendContact() {
    console.log("sendContact() called");

    for (const key in fields) {
        const field = fields[key];
        if (!field.ok) {
            const ref = field.ref;
            ref.classList.add("error");
            ref.focus();
            return false;
        }
    }

    var container = document.getElementById("form");
    var dataString = "name=" + fields.name.ref.value + "&email=" + fields.email.ref.value + "&message=" + fields.message.ref.value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://swanleyhypnotherapist.co.uk/adam/mail.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    console.log("name=" + fields.name.ref.value + "&email=" + fields.email.ref.value + "&message=" + fields.message.ref.value);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                container.innerHTML = xhr.responseText;
            } else {
                container.innerHTML = "There was an error sending your message, please email <a src='mailto:hello@adam-smalley.com'>hello&#64;adam-smalley.com</a>.";
                console.error("Error: " + xhr.status);
            }
        }
    };
    xhr.send(dataString);
}

function addEventListeners() {
    const contactBtn = document.querySelector('#contactBtn');
    const popup = document.querySelector('.popup');
    const closeBtn = document.querySelector('#closeBtn');
    contactBtn.addEventListener('click', () => popup.classList.add('showPopup'));
    closeBtn.addEventListener('click', () => popup.classList.remove('showPopup'));

    for (const key in fields) {
        const field = fields[key];
        const ref = field.ref;
        ref.addEventListener('change', () => {
            if (ref.value == "" || !field.regex.test(ref.value)) {
                //add a class to ref
                ref.classList.add("error");
                field.ok = false;
            } else {
                ref.classList.remove("error");
                field.ok = true;
            }

        });
    };
}

export { sendContact, addEventListeners };
