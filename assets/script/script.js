// Declarations for Open Weather API requests
const formEl = document.querySelector("#user-form");
const cityEl = document.querySelector("#citysearch");
let city = "";
let citiesEl = $("#cities");
let citySearchEl = "";
let deleteBtn = ("#delete");

// Declarations for Moment.js API requests
// Setting empty vars to pass info to later to display current date and time
let datetime = null,
    date = null;


// Copy/Pasta delete button from my Work Day Scheduler homework
$(deleteBtn).click(function () {
    var clear = confirm("Would you like to clear all items?");
    if (clear) {
        localStorage.clear();
        location.reload();
    }
})

// If successful, `latLon()` searches for the city input from the `city` parameter, then pulls out the latitude and longitude. After it has that data, it calls `oneCall()` passing in the lat and lon
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

// Passing in the `lat` and `lon` from `latLon()` and `city` from the search input, this takes that data and converts it to the HTML content of their corresponding ids.
const oneCall = function (lat, lon, city) {
    let apiUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&appid=829eec9644d40ff393c122e2b06045e8&units=imperial';
    fetch(apiUrl2)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // Here's where it updates HTML elements by matching the data to their ids.
                    $("#city").html(city);
                    $("#temp").html(data.current.temp + "&deg;F");
                    $("#wind").html(data.current.wind_speed + " MPH");
                    $("#humid").html(data.current.humidity + "&percnt;");
                    // Because I needed to update the background color of the UV Index (UVI), I found it easier to declare a variable for the UVI,
                    let uvi = data.current.uvi;
                    // updated the UVI in the HTML to match the incoming data
                    $("#uvi").html(uvi);
                    // Here it's calling a function that will update the background color based on the UVI
                    uviBg(uvi);
                    // This calls a function to get the data for the same city for the next five days, passing the fetched data in
                    fiveDay(data);
                });
            } else {
                alert('Error: City Not Found');
            }
        })
        .catch(function (error) {
            alert("Unable to connect to Open Weather Map");
        });

};

// This function is to get the data from Open Weather and populate the page with the pertinent info. 
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
    let savedCity = document.createElement("button");
    savedCity.textContent = city;
    savedCity.id = city;
    $("#cities").append(savedCity);
    savedCity.onclick = function (event) {
        searchFromButton(this.id);
    };
}


function searchFromButton(clicked) {
    cityText = clicked;
    latLon(cityText);
}







// Code to handle local storage
const saveCity = function (city) {
    cityArray.push(city);
    localStorage.setItem("citiesArray", JSON.stringify(cityArray))
}




$("#search").click(function (event) {
    event.preventDefault();
    let city = cityEl.value.trim().toLowerCase();
    $("#city").html(city);

    if (city) {
        saveCity(city);
        latLon(city);
        cityButton(city);
        cityEl.value = "";
    }
    else {
        alert("Try Hampton Falls. The people are lovely.");
    }
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
    let foundCities = localStorage.getItem("citiesArray");
    if (!foundCities) {
        foundCities = [];
    }
    else {
        foundCities = JSON.parse(foundCities);
        console.log(foundCities);
        for (let i = 0; i < foundCities.length; i++) {
            console.log(foundCities[i]);
            let cityToAdd = document.createElement("button");
            cityToAdd.textContent = foundCities[i];
            cityToAdd.id = foundCities[i];
            $("#cities").append(cityToAdd);
            cityToAdd.onclick = function (event) {
                searchFromButton(this.id);
            };
        }
    }
});