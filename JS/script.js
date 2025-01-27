//Hamburger menu

const mobileLinks = document.querySelector('.mobile-links');

const hamburgerButton = document.querySelector('.hamburger-button');

hamburgerButton.addEventListener('click', () => {
    hamburgerButton.classList.toggle('active');
    mobileLinks.classList.toggle('active');
});

//--




//Animation on scroll
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
};

const callback = (entries, observer) => {
    console.log(entries);
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated')
        } else {
                entry.target.classList.remove('animated')
        }
    })
};


const observer = new IntersectionObserver (callback, options);
const animatedElements = document.querySelectorAll('.animate');
animatedElements.forEach(element => observer.observe(element));
// window.addEventListener('scroll', constantAnimation);

//--




//Scroll to top button 
const scrollButton = document.getElementById('round-btn');

function scrollToTop () {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {scrollButtonFunction()};

function scrollButtonFunction () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
}

scrollButton.addEventListener('click', scrollToTop);

// document.body.scrollTop - For Safari
// document.documentElement.scrollTop  - For Chrome, Firefox, IE and Opera

//--


//Redirecting buttons
const heroButton = document.getElementById('hero-button');
heroButton.addEventListener('click', () => document.getElementById('my-projects').scrollIntoView());

const teamButton = document.getElementById('team-project-button');
teamButton.addEventListener('click', () => {
    window.open('teamproject.html', '_blank')
});

const shoeStoreButton = document.getElementById('shoe-store-button');
shoeStoreButton.addEventListener('click', () => {
    window.open('shoestore.html', '_blank')
});

const chatAppButton = document.getElementById('chat-app-button');
chatAppButton.addEventListener('click', () => {
    window.open('chatapp.html', '_blank')
});

const shoppingListButton = document.getElementById('shopping-list-button');
shoppingListButton.addEventListener('click', () => {
    window.open('shoppinglist.html','_blank')
});
//--


//Making tags change color when clicking

// Select all elements with the class "tag"
const tags = document.querySelectorAll('.tag');

// Function to change tag colors
function changeColorTags (event) {
    const tag = event.target; // Get the clicked element
    if (tag.classList.contains('tag')) {
        tag.classList.remove('tag');
        tag.classList.add('tag-black');
    } else {
        tag.classList.add('tag');
        tag.classList.remove('tag-black');
    }
};

// Add event listeners to each tag
tags.forEach((tag) => {
    tag.addEventListener('click', changeColorTags);
});

//--

//Button that addresses to my email: 
function openEmail() {
    window.location.href = "mailto:ana.designs360@gmail.com";
}