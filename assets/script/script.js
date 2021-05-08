// Declarations for Open Weather API requests
const formEl = document.querySelector("#user-form");
const cityEl = document.querySelector("#citysearch");
let city = "";

// Declarations for Moment.js API requests
// Setting empty vars to pass info to later to display current date and time
let datetime = null,
    date = null;

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
                    $("#temp").html(data.current.temp + "&deg;F");
                    $("#wind").html(data.current.wind_speed + " MPH");
                    $("#humid").html(data.current.humidity + "&percnt;");
                    let uvi = data.current.uvi;
                    $("#uvi").html(uvi);
                    uviBg(uvi);
                    fiveDay(data);
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

const fiveDay = function (data) {
    for (let i = 0; i < 5; i++) {
        let cardDate = new Date(data.daily[i + 1].dt * 1000).toLocaleDateString("en-US");
        $("#date" + i).html(cardDate);
        $("#icon" + i).html("<img src='https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png'>");
        $("#max" + i).html(data.daily[i].temp.max);
        $("#min" + i).html(data.daily[i].temp.min);
        $("#wind" + i).html("<p>" + data.daily[i].wind_speed + "&percnt;");
        $("#humid" + i).html("<p>" + data.daily[i].humidity + "&percnt;");
    }
}
// Setting `uvi`'s bg color based on its index. From high to low: violet, red, orange, yellow, green.
const uviBg = function (uvi) {
    if (uvi > 10) {
        $("#uvi").css("background-color", "#EE82EE")
    }
    if (uvi > 7 && uvi < 11) {
        $("#uvi").css("background-color", "red")
    }
    if (uvi > 5 && uvi < 8) {
        $("#uvi").css("background-color", "orange")
    }
    if (uvi > 4 && uvi < 6) {
        $("#uvi").css("background-color", "yellow")
    }
    if (uvi < 3) {
        $("#uvi").css("background-color", "green")
    }
}


const searchHandler = function (event) {
    event.preventDefault();
    let city = cityEl.value.trim();
    $("#city").html(city);

    if (city) {
        latLon(city);
        cityEl.value = "";
    }
    else {
        alert("Please enter a city.");
    }
}

formEl.addEventListener("submit", searchHandler);

let currentHour = moment().format("H");
setInterval(function (i) {
    // This will cycle through all elements with ".dynamic"
    $(".dynamic").each(function (i) {

        // The iterator starts at 0. Adding 9 to iterator because the app starts at 9am
        var offsetter = parseInt([i]) + 9;

        // Comparing offsetter to currentHour and adding classes to the ".dynamic"s accordingly
        if (offsetter < currentHour) {
            $(this).addClass("past");
        } else if (offsetter > currentHour) {
            $(this).addClass("future");
        } else {
            $(this).addClass("present");
        }
    }), 60000
});

let update = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd, MMMM Do, YYYY'));
};

// Declaring a function that fires when the document has finished loading
$(document).ready(function () {
    // Putting `#datetime` in a variable, then using `update()` and `setInterval()` to update the displayed time in it every second
    datetime = $('#datetime')
    update();
    setInterval(update, 60000);
});