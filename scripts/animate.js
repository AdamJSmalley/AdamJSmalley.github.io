const elements = document.getElementsByClassName('container');

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.01, //0.01
};

const observerFactory = (selector) => {
    return new IntersectionObserver((entries) => {

        entries.forEach(entry => {
            const element = entry.target;
            if (entry.isIntersecting) {
                element.classList.add(`show${selector}`);
                element.classList.remove(`hidden${selector}`);

                if (selector == 'Parent') {
                    //element.style.backgroundImage = `url('.//images/timeline/background/${element.dataset.org}.png')`;
                    for (let i = 0; i < elements.length; i++) {
                        elements[i].style.backgroundImage = `url('.//images/timeline/background/${element.dataset.org}.png')`;
                    }
                }

            } else {
                element.classList.add(`hidden${selector}`);
                element.classList.remove(`show${selector}`);
            }
        });
    }, options);
    //(selector == 'Parent') ? options : undefined
}

export default function observeElements(selector) {
    const elements = document.querySelectorAll(`.hidden${selector}`);

    const observer = observerFactory(selector);
    elements.forEach(element => observer.observe(element));
}