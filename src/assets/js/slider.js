const slidePikers = document.querySelectorAll('.picker');
const slides = document.querySelectorAll('.slider-item');

if (slidePikers.length > 0) {
    for (let i = 0; i < slidePikers.length; i++) {
        const piker = slidePikers[i];

        piker.onclick = function () {
            hideElements(slidePikers, 'active');
            piker.classList.add('active');

            visuallyHideElements(slides, 'visually-hidden');
            if (typeof slides[i] !== 'undefined') {
                slides[i].classList.remove('visually-hidden');
            }
        }
    }
}

function hideElements (collections, className) {
    if (collections.length > 0) {
        collections.forEach(function (item) {
            item.classList.remove(className);
        });
    }
}

function visuallyHideElements (collections, className) {
    if (collections.length > 0) {
        collections.forEach(function (item) {
            item.classList.add(className);
        });
    }
}