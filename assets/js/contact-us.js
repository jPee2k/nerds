const body = document.querySelector('body');
const contactUsBtn = document.querySelector('#contact-us-btn');

/* popup -> contact-us*/
const popup = document.querySelector('.popup');
const contactUsPopup = document.querySelector('#contact-us-popup');
const popupClose = contactUsPopup.querySelector('.popup-close');
const popupContent = contactUsPopup.querySelector('.popup-content');
const btnClose = contactUsPopup.querySelector('.btn-close');

/* contact us Form */
const contactUsForm = contactUsPopup.querySelector('#contact-us-form');

/* inputs */
const formInputs = contactUsPopup.querySelectorAll('.input');

const inputName = contactUsPopup.querySelector('input[name=name]');
const inputEmail = contactUsPopup.querySelector('input[name=email]');
const textAreaMessage = contactUsPopup.querySelector('textarea[name=message]');


let isStorageSupport = true;
let storageName = '';
let storageEmail = '';

try {
    storageName = localStorage.getItem('name');
    storageEmail = localStorage.getItem('email');
} catch (error) {
    isStorageSupport = false;
    console.log(error);
}

contactUsBtn.addEventListener('click', function (e) {
    e.preventDefault();

    contactUsPopup.classList.add('popup-show');

    inputName.value = storageName;
    inputEmail.value = storageEmail;

    for (let i = formInputs.length - 1; i >= 0; i--) {
        let input = formInputs[i];

        if (!input.value) {
            input.focus();
        }
    }

    bodyLock();
});

popupClose.addEventListener('click', function (e) {
    if (!e.target.closest('.popup-content')) {
        contactUsPopup.classList.remove('popup-show');
        popupContent.classList.remove('popup-error');

        bodyUnlock();
    }
});

btnClose.addEventListener('click', function (e) {
    if (e.target === e.currentTarget) {
        contactUsPopup.classList.remove('popup-show');

        bodyUnlock();
    }
});

function bodyLock() {
    const lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';

    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');
}

function bodyUnlock() {
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
}

contactUsForm.addEventListener('submit', function (e) {

    formInputs.forEach(function (input) {
        if (!input.value) {
            e.preventDefault();

            input.classList.add('invalid');
            popupContent.classList.remove('popup-error');
            popup.offsetWidth = popup.offsetWidth;
            popupContent.classList.add('popup-error');

            setTimeout(function () {
                input.classList.remove('invalid');
            }, 5000);
        } else {
            const inputName = input.getAttribute('name');
            localStorage.setItem(inputName, input.value);
        }
    });

});

window.addEventListener('keydown', function (e) {
   if (e.keyCode === 27) {
       e.preventDefault();

       if (popup.classList.contains('popup-show')) {
           popup.classList.remove('popup-show');
       }
   }
});
