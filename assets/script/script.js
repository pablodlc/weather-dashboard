const formEl = document.querySelector("#user-form");
const cityEl = document.querySelector("#citysearch");

const searchCity = function (city) {
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=829eec9644d40ff393c122e2b06045e8";
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                });
            } else {
                alert('Error: City Not Found');
            }
        })
        .catch(function (error) {
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect to Open Weather Map");
        });

};


const searchHandler = function (event) {
    event.preventDefault();
    let city = cityEl.value.trim();

    if (city) {
        searchCity(city);
        cityEl.value = "";
    }
    else {
        alert("Please enter a city.");
    }
}

formEl.addEventListener("submit", searchHandler);