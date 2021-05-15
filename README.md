# weather-dashboard

## Description

This application can be found by clicking this link: [Weather Dashboard](https://pablodlc.github.io/weather-dashboard/).  
![](./assets/images/weather-dashboard.gif)  
**Weather Dashboard** is in interactive application where a user can search for a city, get its current weather condition and the weather conditions for the next five days. When the user searches for a city, a button is programmatically created. The button's text content is the searched city's name. Clicking on that button repeats a search for that city. All the cities and their buttons are saved to local storage, so they're persistent. This application uses three APIs: Moment.js for handling dates, the OpenWeather API to search by city name and get the `lat` and `lon`, then plug them in to OpenWeather OneCall API to find the weather conditions. I couldn't figure out how else to use the OneCall API, so I used the old one in conjunction with it.

The application was created keeping this User Story and Acceptance Criteria in mind:

### User Story

> AS A traveler  
> I WANT to see the weather outlook for multiple cities  
> SO THAT I can plan a trip accordingly

### Acceptance Criteria

> GIVEN a weather dashboard with form inputs  
> WHEN I search for a city  
> THEN I am presented with current and future conditions for that city and that city is added to the search history  
> WHEN I view current weather conditions for that city  
> THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index  
> WHEN I view the UV index  
> THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe  
> WHEN I view future weather conditions for that city  
> THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity  
> WHEN I click on a city in the search history  
> THEN I am again presented with current and future conditions for that city

## External Resources

-   OpenWeathermap.org Weather API
-   OpenWeathermap.org WeatherOneCall API
-   Moment.js
-   Google Fonts
-   Font Awesome

## Technologies Used

-   jQuery
-   Bootstrap

## Future Developments

Any possible future developments would be cosmetic. A current bug is that if there are enough of them, the buttons stack behind the footer. I would also consider how to update the spacing of teh text, as it makes the cards a little big.
