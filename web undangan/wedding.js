/* ================= BG SLIDER ================= */

const images = document.querySelectorAll(".bg-slider img");
let index = 0;

setInterval(() => {
  images[index].classList.remove("active");
  index = (index + 1) % images.length;
  images[index].classList.add("active");
}, 4000);


/* ================= ELEMENT ================= */

const openBtn = document.getElementById("openBtn");
const nav = document.querySelector(".nav");
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll("section");

const music = document.getElementById("bgMusic");
const musicBtn = document.querySelector(".music-wrapper");


/* ================= OPEN BUTTON ================= */

openBtn.addEventListener("click", async () => {

  document.getElementById("next").scrollIntoView({
    behavior: "smooth"
  });

  nav.classList.add("show");

  try{
    await music.play();
    musicBtn.classList.add("rotate");
  }catch(err){
    console.log(err);
  }

});


/* ================= COUNTDOWN ================= */

const weddingDate = new Date("October 11, 2026 14:00:00").getTime();

setInterval(() => {

  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  updateFlip("days", days);
  updateFlip("hours", hours);
  updateFlip("minutes", minutes);
  updateFlip("seconds", seconds);

}, 1000);


/* ================= FLIP ================= */

function updateFlip(id, value){

  const el = document.getElementById(id);
  if(!el) return;

  const newValue = value.toString().padStart(2,"0");

  if(el.innerText !== newValue){

    el.classList.remove("animate");
    void el.offsetWidth;
    el.innerText = newValue;
    el.classList.add("animate");

  }

}


/* ================= WISH FORM ================= */

const form = document.getElementById("msgForm");
const list = document.getElementById("list");

if(form && list){

  form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    const el = document.createElement("div");

    el.classList.add("msg");

    el.innerHTML = `
      <h5><i class="fa-solid fa-heart"></i> ${name}</h5>
      <small>Just now</small>
      <p>${message}</p>
    `;

    list.prepend(el);

    form.reset();

  });

}


/* ================= MUSIC BUTTON ================= */

musicBtn.addEventListener("click", async () => {

  if(music.paused){

    try{
      await music.play();
      musicBtn.classList.add("rotate");
    }catch(err){
      console.log(err);
    }

  }else{

    music.pause();
    musicBtn.classList.remove("rotate");

  }

});


/* ================= NAVBAR CLICK ================= */

navItems.forEach(item => {

  item.addEventListener("click", function(){

    navItems.forEach(i => i.classList.remove("active"));
    this.classList.add("active");

  });

});


/* ================= NAVBAR SCROLL ================= */

window.addEventListener("load", navbarControl);
window.addEventListener("scroll", navbarControl);

function navbarControl(){

  const scrollY = window.pageYOffset;
  const couple = document.getElementById("next");

  /* hide di opening */
  if(scrollY >= couple.offsetTop - 100){
    nav.classList.add("show");
  }else{
    nav.classList.remove("show");
  }

  /* active section */
  let current = "";

  sections.forEach(sec => {

    const top = sec.offsetTop - 180;
    const height = sec.offsetHeight;

    if(scrollY >= top && scrollY < top + height){
      current = sec.getAttribute("id");
    }

  });

  navItems.forEach(item => item.classList.remove("active"));

  if(current === "next"){
    document.querySelector('.nav-item[href="#next"]').classList.add("active");
  }

  if(current === "event"){
    document.querySelector('.nav-item[href="#event"]').classList.add("active");
  }

  if(current === "journey" || current === "story"){
    document.querySelector('.nav-item[href="#journey"]').classList.add("active");
  }

  if(current === "rsvp"){
    document.querySelector('.nav-item[href="#rsvp"]').classList.add("active");
  }

}