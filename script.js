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
    console.log(
      `https://www.google.com/maps/@${latitude},${longitude},15z?entry=ttu`
    );
  },
  function () {
    alert('Could not get your position');
  }
);
