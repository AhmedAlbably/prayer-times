function getCurrentTime() {
  let  now = new Date();
  let  hours = now.getHours();
  let  minutes = now.getMinutes();
  let  seconds = now.getSeconds();
  let  timeString = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  let timeNow = document.querySelector(".time-now");
  timeNow.textContent = timeString;
  // return timeString;
}

setInterval(getCurrentTime, 1000);

let citiesArray = [
  "Cairo",
  "Alexandria",
  "Giza",
  "Dakahlia",
  "Aswan",
  "Luxor",
  "Menoufia",
];

function prayerTimes() {
  let  cities = document.querySelector(".cities");

  citiesArray.forEach((city) => {
    let option = document.createElement("option");
    option.textContent = city;
    cities.appendChild(option);
  });
  // console.log(cities)
  // Set default city to Giza
  cities.value = "Giza";

  // Get the current time for Giza
  getPrayerTimes("Giza");

  // Rest of the code
  cities.addEventListener("change", () => {
    let selectedCity = cities.value;
    getPrayerTimes(selectedCity);
  });
}

function getPrayerTimes(selectedCity) {
  let url = `https://api.aladhan.com/v1/timingsByCity?country=EG&city=${selectedCity}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let prayerTimesData = data.data.timings;
      let currentDay = data.data.date.readable;
      document.querySelector("h1").textContent = currentDay;
      document.querySelector(".fajr-time").textContent = prayerTimesData.Fajr;
      document.querySelector(".sunrise-time").textContent =
        prayerTimesData.Sunrise;
      document.querySelector(".dhuhr-time").textContent = prayerTimesData.Dhuhr;
      document.querySelector(".asr-time").textContent = prayerTimesData.Asr;
      document.querySelector(".maghrib-time").textContent =
        prayerTimesData.Maghrib;
      document.querySelector(".isha-time").textContent = prayerTimesData.Isha;
    })
    .catch((error) => console.error(error));
}

prayerTimes();
