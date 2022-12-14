// build the nav
const nav = document.querySelector('.navbar__menu');
const navList = document.getElementById('navbar__list');

for (i = 0; i < document.getElementsByTagName("section").length; i++) {
    let navHead = document.createElement('li');
    let navHeadAnchor = document.createElement('a');
    navHeadAnchor.textContent = `Section ${i+1}`;
    navHead.style.cursor = 'pointer';
    navHeadAnchor.classList.add('menu__link');
    navHead.appendChild(navHeadAnchor);
    navList.appendChild(navHead);
}
// Add class 'active' to section when near top of viewport
function portviewCheck() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
        let sectionTitle = section.querySelector('span').textContent;
        let navbarAnchors = navList.querySelectorAll('.menu_link');
        let rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= 1000) { //checks whether the whole section is within portview
            section.classList.add('active');
            section.querySelector('span').classList.add('active');
        } else { //if no longer within portview remove the added class
            section.classList.remove('active');
            section.querySelector('span').classList.remove('active');
        }
        navAnchors.forEach((anchor) => { //set section navbar active as long as section is active
            if (anchor.textContent == sectionTitle) {
                if (section.classList.contains('active')) {
                    anchor.classList.add('anchoractive');
                    anchor.style.color = 'white';
                } else {
                    anchor.classList.remove('anchoractive');
                    anchor.style.color = 'black';
                }
            }
        })
    });
}
document.addEventListener('scroll', portviewCheck); /*each time a scroll happens it checks whether any of the sections is within portview*/

// Scroll to anchor ID using scrollTO event
function scrollToSection(anchorclicked) {
    let anchortagid = anchorclicked.textContent;
    anchortagid = anchortagid.toLowerCase();
    anchortagid = anchortagid.replace(' ', '');
    let sectionelement = document.getElementById(anchortagid);
    sectionelement.scrollIntoView({
        behavior: 'smooth'
    });
}
let navAnchors = document.querySelectorAll('.menu__link');
navAnchors.forEach(anchor => anchor.addEventListener('click', event => {
    event.preventDefault();
    scrollToSection(anchor);
    /*each anchor has an event listener , event is used to prevent default actions, each anchor is used to send the anchor(itself) clicked to the function that scrolls to its section*/
}));
/*SUGGESTED 1*/
//HIDE MENU ON INACTIVITY OF SCROLL
let navbar = document.querySelector('header');
let moving = null;

function hideMenu() {
    navbar.style.transform = 'translateY(0px)'; //currently scrolling
    navbar.style.transition = 'all 1s ease';
    if (moving) {
        clearTimeout(moving); //if it scrolled change translate
    }
    moving = setTimeout(() => {
        navbar.style.transform = 'translateY(-100px)'; //else hide it if its no longer scrolling
        navbar.style.transition = 'all 1s ease';
    }, 2500);
}
window.addEventListener('scroll', () => {
    hideMenu();
}); //listen for any scrolling event

/*SUGGESTED 2*/
/*Add a scroll to the top button on the page that’s only visible when the user scrolls below the fold of the page.*/
let topbutton = document.getElementById('goup');
let header = document.querySelector('h1')
topbutton.style.cursor = 'pointer';
//check if button is within portview
document.addEventListener('scroll', () => {
    let rect = topbutton.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        topbutton.style.visibility = 'block';
    } else {
        topbutton.style.visibility = 'none';
    }
})
topbutton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}); //button click scrol

//collapsible using html css and js 
let allsummary = document.querySelectorAll('summary');
allsummary.forEach(summary => summary.addEventListener('click', () => {
    let sectionname = summary.textContent;
    sectionname = sectionname.toLowerCase();
    sectionname = sectionname.replace(' ', '');
    let section = document.getElementById(`${sectionname}`);
    section.classList.toggle('extend');
}))