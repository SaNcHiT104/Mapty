'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//global variables
//1-> map object
//2-> location object

let map, mapEvent;
//setting up geoloaction (one fucntion  for successful, 2nd for error)

navigator.geolocation.getCurrentPosition(
  function (position) {
    const { latitude } = position.coords; //position->object(coords in which latitude and longitude is present)
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    //map is class id and L is leaflet
    map = L.map('map').setView(coords, 13);
    //fr/hot/
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    //on just like addEventListener in leaflet
    map.on('click', function (mapE) {
      //rendering form
      mapEvent = mapE; //assigning clicked coordinates
      form.classList.remove('hidden');
      //adding cursor to distance
      inputDistance.focus();
      //   console.log(mapEvent);

      //adding marker
      //after form is clicked
    });
  },
  function () {
    alert('Could not get your position');
  }
);

//form submit button is clicked, so marker should be adjusted
form.addEventListener('submit', function (e) {
  e.preventDefault();

  //clear input fields
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      '';

  //marker is added
  const { lat, lng } = mapEvent.latlng;
  L.marker({ lat, lng })
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});

//toggling hidden class for runner and cycling
inputType.addEventListener('change', function () {
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
});
