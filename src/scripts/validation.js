const contactsForm = document.querySelector('.contacts__form');

keyChecker(contactsForm);

function keyChecker(form) {
    form.addEventListener('keydown', e => {
        let target = e.target;
        if (target == form.elements.name) {
            if (isDigit(e) || isSymbol(e)) {
                e.preventDefault();
            }
        }
    });
}

function isDigit(e) {
    if (e.key >= 0 || e.key <= 0) return true;
    else return false;
}

function isControl(e) {
    if (e.key == 'Shift' || e.key == 'Backspace' || e.key == 'ArrowLeft' || e.key == 'ArrowRight') return true;
    else return false;
}

function isSymbol(e) {
    if (e.key == '-' || e.key == '+' || e.key == '/') return true;
    else return false;
}