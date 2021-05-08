const formEl = document.querySelector("#user-form");
const cityEl = document.querySelector("#citysearch");

// var apiUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&appid=' + apiKey + '&units=imperial';


const latLon = function (city) {
    let apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=829eec9644d40ff393c122e2b06045e8";
    fetch(apiUrl1)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    const { lat, lon } = data.coord;
                    console.log(lat);
                    console.log(lon);
                    oneCall(lat, lon);
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

const oneCall = function (lat, lon) {
    let apiUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&appid=829eec9644d40ff393c122e2b06045e8&units=imperial';
    fetch(apiUrl2)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    $("#city").html(city);
                    $("#temp").html(data.current.temp + "&deg;F");
                    $("#wind").html(data.current.wind_speed + " MPH");
                    $("#humid").html(data.current.humidity + "&percnt;");
                    let uvi = data.current.uvi;
                    $("#uvi").html(uvi);
                    uviBg(uvi);
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

const uviBg = function (uvi) {
    if (uvi > 10) {
        $("#uvi").css("background-color", "#EE82EE")
    }
    if (uvi > 7 && data.current.uvi < 11) {
        $("#uvi").css("background-color", "red")
    }
    if (uvi > 5 && data.current.uvi < 8) {
        $("#uvi").css("background-color", "orange")
    }
    if (uvi > 4 && data.current.uvi < 6) {
        $("#uvi").css("background-color", "yellow")
    }
    if (uvi < 3) {
        $("#uvi").css("background-color", "green")
    }
}


const searchHandler = function (event) {
    event.preventDefault();
    let city = cityEl.value.trim();

    if (city) {
        latLon(city);
        cityEl.value = "";
    }
    else {
        alert("Please enter a city.");
    }
}

formEl.addEventListener("submit", searchHandler);