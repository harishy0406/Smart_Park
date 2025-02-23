// Toggle Side Menu
const profilePhoto = document.getElementById('profilePhoto');
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('overlay');

profilePhoto.addEventListener('click', function () {
    sideMenu.classList.toggle('open');
    overlay.classList.toggle('active');
});

// Close Side Menu on Overlay Click
overlay.addEventListener('click', function () {
    sideMenu.classList.remove('open');
    overlay.classList.remove('active');
});