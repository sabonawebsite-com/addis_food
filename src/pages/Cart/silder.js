const slides=document.querySelectorAll(".slides img")
let slideIndex=0;
let interValId=null
let index=0;
document.addEventListener("DOMContentLoaded",initialiter)
function initialiter(){
    if(slides.length>0){
    slides[slideIndex].classList.add("displaySlide")
    interValId= setInterval(nextSlide,5000)
    }  
}
function showSlide(){
  
       if(index >=slides.length){
        slideIndex=0;
       }
       else if(index<0){
        slideIndex=slides.length-1;
       }
       slides.forEach(slide=>{
        slide.classList.remove("displaySlide")
       });
       slides[slideIndex].classList.add("displaySlide")
    }
function prevSlide(){
   slideIndex--;
   showSlide(slideIndex);
}
function nextSlide(){
    slideIndex++
    showSlide(slideIndex)
}