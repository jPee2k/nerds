const body = document.querySelector('body');
const contactUsBtn = document.getElementById('contact-us-btn');
const contactUsPopup = document.querySelector('#contact-us-popup');
const popupClose = document.querySelector('.popup-close');
const btnClose = document.querySelector('.btn-close');

contactUsBtn.onclick = function () {
    contactUsPopup.classList.remove('popup-hidden');
    bodyLock();
};

popupClose.onclick = function (e) {
    if (!e.target.closest('.popup-content')) {
        contactUsPopup.classList.add('popup-hidden');

        bodyUnlock();
    }
};

btnClose.onclick = function (e) {
    if (e.target === e.currentTarget) {
        contactUsPopup.classList.add('popup-hidden');

        bodyUnlock();
    }
}

function bodyLock () {
    const lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';

    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');
}

function bodyUnlock () {
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
}
