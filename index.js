const navbar = document.querySelector('nav.navbar');
const navbarMenu = document.querySelector('.navbar-menu');
const navbarHamburger = document.querySelector('.navbar-hamburger');

const homeSection = document.querySelector('[data-name="home"]');
const skillsSection = document.querySelector('[data-name="skills"]');
const projectsSection = document.querySelector('[data-name="projects"]');
const contactSection = document.querySelector('[data-name="contact"]');

const sections = ["home", "skills", "projects", "contact"];

function getPosition(element) {
    function offset(el) {
        var rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    return { x: offset(element).left, y: offset(element).top };
}

navbarHamburger.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
})

document.querySelectorAll('[data-item]').forEach(el => {
    el.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
    })
})

let currentSection = 'home';

function getScroll(target) {
    if (target === 'home') return 0;
    return getPosition(document.querySelector(`[data-name=${target}]`)).y || 0;
}

function setItem() {
    document.querySelectorAll('[data-item].active').forEach(item => {
        item.classList.remove('active');
    })
    document.querySelectorAll(`[data-item="${currentSection}"]`).forEach(item => {
        item.classList.add('active');
    })
}

function updateSection() {
    const scrollTop = document.documentElement.scrollTop + window.innerHeight * .25;
    const heights = [
        {
            name: "home",
            value: homeSection.scrollHeight
        }, {
            name: "skills",
            value: skillsSection.scrollHeight
        }, {
            name: "projects",
            value: projectsSection.scrollHeight
        }, {
            name: "contact",
            value: contactSection.scrollHeight
        }
    ]

    let temp = 0;
    for (let i = 0; i < heights.length; i++) {
        const h = heights[i];
        if (scrollTop >= temp && scrollTop < temp + h.value) {
            currentSection = h.name;
            break;
        }
        if (i == heights.length - 1) {
            currentSection = h.name;
        }
        temp += h.value;
    }
}

document.querySelectorAll('[data-item]').forEach(item => {
    item.addEventListener('click', () => {
        currentSection = item.getAttribute('data-item');
        // container.classList.remove('show-menu');
        document.documentElement.scrollTo({ top: getScroll(currentSection), behavior: 'smooth' });
        currentSection = item.getAttribute('data-item');
        setItem();
    })
})

document.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateSection();
    setItem();
})

window.onload = () => {
    updateSection();
    const hash = location.hash.replace("#", "");
    if (hash != currentSection && sections.indexOf(hash) > -1) {
        currentSection = hash;
    }
    document.documentElement.scrollTo({ top: getScroll(currentSection), behavior: 'smooth' });
    location.hash = "#" + currentSection;
    setItem();
}

window.addEventListener('popstate', () => {
    var hash = location.hash.replace("#", "");
    if (hash == currentSection || sections.indexOf(hash) == -1) {
        return;
    } else {
        currentSection = hash;
        document.documentElement.scrollTo({ top: getScroll(currentSection), behavior: 'smooth' });
        setItem();
    }
});