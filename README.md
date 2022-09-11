### Requirements

#### Overview

A simple app which shows weather forecasts data form OpenWeatherMap
(https://openweathermap.org/). App may include multiple screens, such as:
    • Static login (optional)
    • Loading screen (optional)
    • Weather info screen (required)

#### Example
URL:https://api.openweathermap.org/data/2.5/forecast?q=kathmandu&appid=4aec2910bd4ed228a6f1ef0d0f2a21ae&cnt=40

https://api.openweathermap.org/data/2.5/forecast?q=kathmandu&appid=51e25f2351d33ddaf2921cb0c0b07bbb&cnt=40


#### Weather Info Screen
Use an API endpoint to get the weather data. Once data is loaded, the info screen is visible. Info screen
should show multiple days of weather forecasts.
Requirement
    • Info screen should contain two checkboxes that switches between Celsius (default) and
    Fahrenheit.
    • A graph (line or bar) should represent the selected date.
    • Back and forward buttons to toggle to change the forecast days. [my assumptions: i didn't got the api for next and previous i believe that we should have options to interchange among given data...]


#### Note:
The sources of the WeatherApp should be available to us through a public repository on Github.
The example app must be written in React-JS. We prefer that you use Mobx state Tree (https://mobxstate-tree.js.org/intro/welcome) for state management and https://ant.design for UI components