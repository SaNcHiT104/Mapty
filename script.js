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

//setting up geoloaction (one fucntion  for successful, 2nd for error)

navigator.geolocation.getCurrentPosition(
  function (position) {
    const { latitude } = position.coords; //position->object(coords in which latitude and longitude is present)
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    //map is class id and L is leaflet
    const map = L.map('map').setView(coords, 13);
    //fr/hot/
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(coords).addTo(map).bindPopup().openPopup();
  },
  function () {
    alert('Could not get your position');
  }
);
