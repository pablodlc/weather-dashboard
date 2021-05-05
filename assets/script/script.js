const formEl = document.querySelector("#user-form");
const cityEl = document.querySelector("#citysearch");

const searchHandler = function (event) {
    event.preventDefault();
    let city = cityEl.value.trim();
    alert(city);
}

formEl.addEventListener("submit", searchHandler);