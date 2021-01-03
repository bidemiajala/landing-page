/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

// Define Global Variables

const sections = document.querySelectorAll('section');
const navbarList = document.getElementById('navbar__list');
scrollButton = document.getElementById("toTop");

// Build menu 
sections.forEach(element => {
    const navlistElement = `<li class='menu__link ${element.className}' data-link=${element.id}><a href="#${element.id}">${element.dataset.nav}</li>`;
    navbarList.insertAdjacentHTML('beforeend', navlistElement);
});

// Set sections as active using intersections observer api
const callback = entries => {
    entries.forEach(entry => {
        const navListElement = document.querySelector(`.menu__link[data-link='${entry.target.id}']`);
        const section = document.querySelector(`#${entry.target.id}`);

        if (entry && entry.isIntersecting) {
            navListElement.classList.add('active');
            section.classList.add('active');
        } else {
            if (navListElement.classList.contains('active')) {
                navListElement.classList.remove('active');
            }

            if (section.classList.contains('active')) {
                section.classList.remove('active');
            }
        }
    });
};

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7,
};

let observer = new IntersectionObserver(callback, options);
sections.forEach(element => {
    observer.observe(document.getElementById(element.id));
});

// Scroll to section on link click
navbarList.addEventListener('click', e => {
    e.preventDefault()
    const parent = e.target.hasAttribute('data-link') ?
        e.target :
        e.target.parentElement;
    const elementToScrollTo = document.getElementById(parent.dataset.link);
    elementToScrollTo.scrollIntoView({ block: 'end', behavior: 'smooth' });
});

//if you scroll beyond 800px from the top of the page, the button is displayed
window.onscroll = () => {
    document.body.scrollTop > 800 || document.documentElement.scrollTop > 800 ?
        scrollButton.style.display = "block" :
        scrollButton.style.display = "none";
    hideNav(800);
};

function hideNav(delay) {
    let timer;
    timer && clearTimeout(timer);
    navbarList.style.display = "none";
    timer = setTimeout(function() {
        navbarList.style.display = "block";
    }, delay);
}

const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// When the user clicks on the button, scroll to the top of the document
scrollButton.addEventListener("click", () => {
    backToTop();
});