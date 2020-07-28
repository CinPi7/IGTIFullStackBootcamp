let allCountriesCard = null; // tab countries
let allCountries = []; //allcountries
let countAllCountries = 0; // countcountries
let totalAllCountriesPopulation = 0;

let favCountriesCard = null;  // tab favorites
let favCountries = [];  //favoritecountries
let countFavCountries = 0;  // countfavorites
let totalFavCountriesPopulation = 0;

let numberFormat = null;

window.addEventListener('load', (e) => {

    e.preventDefault();  

    allCountriesCard = document.querySelector('#allCountriesCard');
    favCountriesCard = document.querySelector('#favoriteCountriesCard');

    countAllCountries = document.querySelector('#countCountries');
    countFavCountries = document.querySelector('#countFavorites');

    totalAllCountriesPopulation = document.querySelector('#totalPopulationList');
    totalFavCountriesPopulation = document.querySelector('#totalFavPopulationList');
    
    numberFormat = Intl.NumberFormat('pt-BR');
    fetchCountries();
});

async function fetchCountries() {

    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await response.json();
    allCountries = data.map(country => {

        const { numericCode, translations, population, flag } = country;
        return {
            id: numericCode,
            name: translations.pt,
            population,
            formatted: formatNumber(population),
            flag
        }
    });

    // favCountries = allCountries;

    console.log(allCountries);
    render(); 

}

const render = () => {
    
    countAllCountries.textContent = allCountries.length;
    countFavCountries.textContent = favCountries.length;

    renderCountryList();
    renderFavorites();
    renderTotalPopulation();
    handleButtons();  
}

const renderCountryList = () => {

    let countries = '<div>';

    allCountries.forEach(country => {

        const { id, name, population, formatted, flag} = country; 
        const showData = ` 
            <div class='country'>
                <div class="buttons">
                    <a id="${id}" class="add-button">+</a>
                </div>
                <div>
                    <img src="${flag}" alt="${name}" />
                </div>
                <div>
                    <ul>
                        <li>${name}</li>
                        <li>${formatted}</li>
                    </ul>
                </div>
            </div>
        `; // string com button, flag and data 

        countries += showData; // concat
    });

    countries += '/<div>';
    allCountriesCard.innerHTML = countries;
}

const renderFavorites = () => {

    let favorites = '<div>';

    favCountries.forEach(country => {

        const { id, name, population, flag, formatted} = country; // destructuring
        const showFavData = ` 
            <div class='country'>
                <div class="buttons">
                    <a id="${id}" class="remove-button">-</a>
                </div>
                <div>
                    <img src="${flag}" alt="${name}" />
                </div>
                <div>
                    <ul>
                        <li>${name}</li>
                        <li>${formatted}</li>
                    </ul>
                </div>
            </div>
        `; // string 

        favorites += showFavData; // concat
    });

    favorites += '</div>';
    favCountriesCard.innerHTML = favorites;
}

const renderTotalPopulation = () => { 

    /* sum of total pop */
    const totalPopulation = allCountries.reduce((accumulator, current) => {
        return accumulator + current.population;
    }, 0);

    /* sum of fav total pop */
    const totalFavPopulation = favCountries.reduce((accumulator, current) => {
        return accumulator + current.population;
    }, 0);

    totalAllCountriesPopulation.textContent = formatNumber(totalPopulation);
    totalFavCountriesPopulation.textContent = formatNumber(totalFavPopulation);
}

const handleButtons = () => {

    const countryButtons = Array.from(allCountriesCard.querySelectorAll('.add-button'));
    const favCountryButtons = Array.from(favCountriesCard.querySelectorAll('.remove-button'));
    // retorna objeto do DOM, então usa-se o Array
    // console.log(countryButtons);
    
    countryButtons.forEach(button => {
        button.addEventListener('click', () => {
            addToFavList(button.id);
        });
    });

    favCountryButtons.forEach(button => {
        button.addEventListener('click', () => {
            removeFromFavList(button.id);
        })
    });
}

const addToFavList = (id) => {
    const countryToAdd = allCountries.find(country => country.id === id);

    favCountries = [...favCountries, countryToAdd]; // spread equal, and add the country
    favCountries.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    allCountries = allCountries.filter(country => country.id !== id);

    render();
}

const removeFromFavList = (id) => {
    const countryToRemove = favCountries.find(button => button.id === id);

    allCountries = [...allCountries, countryToRemove];
    allCountries.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    favCountries = favCountries.filter(country => country.id !== id);

    render();
}

const formatNumber = (number) => {
    return numberFormat.format(number);
}