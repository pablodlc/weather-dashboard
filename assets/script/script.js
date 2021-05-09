// Declarations for Open Weather API requests
const formEl = document.querySelector("#user-form");
const cityEl = document.querySelector("#citysearch");
let city = "";
let citiesEl = $("#cities");
let citySearchEl = "";

// Declarations for Moment.js API requests
// Setting empty vars to pass info to later to display current date and time
let datetime = null,
    date = null;

// Declarations handling local storage and related buttons


// Code to handle Open Weather data
const latLon = function (city) {
    let apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=829eec9644d40ff393c122e2b06045e8";
    fetch(apiUrl1)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    const { lat, lon } = data.coord;
                    oneCall(lat, lon, city);
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

const oneCall = function (lat, lon, city) {
    let apiUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&appid=829eec9644d40ff393c122e2b06045e8&units=imperial';
    fetch(apiUrl2)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // I need to loop through the words in `city`, split them, capitalize them, the join them together again
                    // const mySentence = "freeCodeCamp is an awesome resource";
                    // const words = mySentence.split(" ");

                    // for (let i = 0; i < words.length; i++) {
                    //     words[i] = words[i][0].toUpperCase() + words[i].substr(1);
                    // }

                    // words.join(" ");
                    $("#city").html(city);
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


// Code to create new buttons from user's city searches
const cityButton = function (city) {
    let savedCity = document.createElement("p");
    savedCity.textContent = city;
    $("#cities").append(savedCity);
    savedCity.addEventListener("click", function () {
        latLon(savedCity.textContent);
    })
    //                                  All this as an example to check if storage exits in the array
    // if ($("#" + city + "Btn").length > 0) {
    //     return
    // }
    // else {
    //     let buttonHtml = '<button class="cityBtn" id="' + city + 'Btn">' + city + '</button><br />';
    //     $("#cities").append(buttonHtml);
    // }
    //     let buttonHtml = '<button class="cityBtn" id="' + city + '"> ' + city + '</button> <br />';
    //     $("#cities").append(buttonHtml);
}


// Code to handle local storage

$("#search").click(function (event) {
    event.preventDefault();
    let city = cityEl.value.trim().toLowerCase();
    $("#city").html(city);

    if (city) {
        latLon(city);
        cityButton(city);
        cityEl.value = "";
    }
    else {
        alert("Please enter a city.");
    }
});

// $("#cities").on("click", function (event) {
//     event.preventDefault();
//     let citySearchEl = $("#cities").text().trim();
//     if (citySearchEl) {
//         console.log(citySearchEl);
//         latLon(citySearchEl);
//         citySearchEl = "";
//     }
// });


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