const contactsForm = document.querySelector('.contacts__form');

function isDigit(e) {
    if (e.key >= 0 || e.key <= 0) return true;
    return false;
}

// function isControl(e) {
//     if (e.key == 'Shift' || e.key == 'Backspace' || e.key == 'ArrowLeft' || e.key == 'ArrowRight') return true;
//     return false;
// }

function isSymbol(e) {
    if (e.key === '-' || e.key === '+' || e.key === '/') return true;
    return false;
}

function keyChecker(form) {
    form.addEventListener('keydown', e => {
        const {target} = e;
        if (target === form.elements.name) {
            if (isDigit(e) || isSymbol(e)) {
                e.preventDefault();
            }
        }
    });
}



keyChecker(contactsForm);