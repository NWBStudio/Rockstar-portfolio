import Vue from 'vue';
import App from './App.vue';

new Vue({
  el: "#app-root",
  render: h => h(App)
});


const   newSkillForm = document.querySelectorAll('.new-skill-form'),
        worksForm = document.querySelector('.works-form'),
        reviewsForm = document.querySelector('.reviews-form');

keyChecker(worksForm);
newSkillForm.forEach(form => keyChecker(form));
keyChecker(reviewsForm);

function keyChecker(form) {
    form.addEventListener('keydown', e => {
        let target = e.target;
        if (target == form.elements.name || target == form.elements.role) {
            if(isDigit(e) || isSymbol(e)){
                e.preventDefault();
            }
        }
        else if(target == form.elements.percent){
          if(isDigit(e) == false && isControl(e) == false){
            e.preventDefault();
          }
        }
    });
}

function isDigit(e){
    if (e.key >= 0 || e.key <= 0) return true;
    else return false;
}

function isControl(e){
    if (e.key == 'Shift' || e.key == 'Backspace' || e.key == 'ArrowLeft' || e.key == 'ArrowRight') return true;
    else return false;
}

function isSymbol(e){
    if (e.key == '-' || e.key == '+' || e.key == '/') return true;
    else return false;
}
