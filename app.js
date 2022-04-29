// 5c5ab2030f341d3987c05ce3f38d3e82
// https://api.openweathermap.org/data/2.5/weather?q=Qarshi&appid=5c5ab2030f341d3987c05ce3f38d3e82&units=metric

const input = document.querySelector(".input");
const btnSearch = document.querySelector(".btn-search");
const countryBox = document.querySelector(".country-box");

input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        loadWeather();
    }
});

btnSearch.addEventListener("click", loadWeather);

function loadWeather() {
    let inputText = input.value;

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=5c5ab2030f341d3987c05ce3f38d3e82&units=metric`
    )
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                let notfound = `
                    <div class="show-country">
                        <div class="img-wrapper">
                            <img class="not-found" src="img/404.png" alt="">
                        </div>
                    </div>
                    `;
                return (countryBox.innerHTML = notfound);
            }
        })
        .then((data) => {
            console.log(data);
            let dataWeather = `
                <div class="show-country">
                    <h1 class="name">${data.name}, <span>${
                data.sys.country ? data.sys.country : ""
            }</span></h1>
                    <h1 class="temp">${Math.floor(data.main.temp)}°C</h1>
                    <div class="img-wrapper">
                        <img class="icon" src="http://openweathermap.org/img/wn/${
                            data.weather[0].icon
                        }@4x.png" alt="">
                    </div>
                    <h1 class="main">${data.weather[0].main}</h1>
                </div>
                `;
            countryBox.innerHTML = dataWeather;
        });
}
