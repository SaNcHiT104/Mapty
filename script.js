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
//workout class
class Workout {
  date = new Date();
  id = (new Date() + '').slice(-10); //unique id for stroing the objects
  workout(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
}

class Running extends Workout {
  // child class of Workout
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration); // calling cons of workout
    this.cadence = cadence;
    this.calcPace();
  }
  calcPace() {
    //min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  constructor(coords, distance, duration, elevationgain) {
    super(coords, distance, duration);
    this.elevationgain = elevationgain;
    this.calcSpeed();
  }
  calcSpeed() {
    //km/hr
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

//APPLICATION ARCHITECTURE
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
// getpostion-->loadMap-->click-->showForm-->form Submit-->new Workout (flow)
//setting up classes
class App {
  #map;
  #mapEvent;
  constructor() {
    this._getPostion();
    //form submit button is clicked, so marker should be adjusted
    form.addEventListener('submit', this._newWorkout.bind(this));

    //toggling hidden class for runner and cycling
    inputType.addEventListener('change', this._toggleElevationField.bind(this));
  }
  //basically checks for location access and pass the access to load Map
  _getPostion() {
    //setting up geoloaction (one function  for successful, 2nd for error)
    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        alert('Could not get your position');
      }
    );
  }
  _loadMap(position) {
    const { latitude } = position.coords; //position->object(coords in which latitude and longitude is present)
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    //map is class id and L is leaflet
    this.#map = L.map('map').setView(coords, 13);
    //fr/hot/
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //on just like addEventListener in leaflet
    this.#map.on('click', this._showForm.bind(this)); //.bind this is used because when we use this on event listener this points to here(this.#map) not on objects
  }
  _showForm(mapE) {
    //rendering form
    this.#mapEvent = mapE; //assigning clicked coordinates
    form.classList.remove('hidden');
    //adding cursor to distance
    inputDistance.focus();
    //adding marker after form is clicked
  }

  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    //clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    //marker is added
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker({ lat, lng })
      .addTo(this.#map)
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
  }
}

const app = new App();
