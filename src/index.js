import './css/styles.css';
import fetchCountries from './fetchCountries';
import fetchCountries from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector("#search-box"),
    countryItem: document.querySelector(".country-info"),
    countryList: document.querySelector(".country-list")
}

function createInfoCountry(item) {
    return `<div class="style"><img src="${item.flags.svg}" alt="${item.name}" class = "img-original">
        <h1 class="title-original">${item.name}</h1></div>
        <p><span class="desc">Capital:</span> ${item.capital}</p>
        <p><span class="desc">Population:</span> ${item.population}</p>
        <p><span class="desc">languages:</span> ${item.languages.map(item => item.name)}</p>`
}
function createListCountry(item) {
    return `<div class="list"><img src="${item.flags.svg}" alt="${item.name}" class = "img-small">
    <h1 class="title-small">${item.name}</h1></div>`
}

function showInfoCountry(res) {
    refs.countryItem.insertAdjacentHTML('beforeend', res)
}
function showListCountry(res) {
    refs.countryList.insertAdjacentHTML('beforeend', res)
}
function onViewCountry(e) {
    refs.countryItem.innerHTML = ''
    refs.countryList.innerHTML = ''
    let value = e.target.value.trim()
    if (value !== '') {
        fetchCountries(value)
            .then((data) => {
                if (data.length > 10) {
                    Notify.warning("Too many matches found. Please enter a more specific name.",
                        { timeout: 700 });

                }
                else if (data.length === 1) {
                    const resultInfo = createInfoCountry(data[0])
                    showInfoCountry(resultInfo)
                }
                else if (data.length <= 10 && data.length > 1) {
                    const resultList = data.reduce((acc, item) => acc + createListCountry(item), "")
                    showListCountry(resultList)
                }
            })
            .catch(error => Notify.failure(error.message, { timeout: 700 }))
    }
}

refs.input.addEventListener("input", debounce(onViewCountry, DEBOUNCE_DELAY))