var list = JSON.parse(localStorage.getItem("searches")) || [];

$("#searchBtn").click(function (event) {
    event.preventDefault();

    var city = $("#citySearch").val().trim();
});