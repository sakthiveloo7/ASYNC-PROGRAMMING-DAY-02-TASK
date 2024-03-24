// Open Weather API id
const apiKey = "fe09b418b8db6f0465f516d97beb1e5c";

document.addEventListener("DOMContentLoaded", function() {
    // Fetch country details
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the fetched data to inspect its structure

        // Create container div
        const container = document.createElement('div');
        container.classList.add('container');
        // Append container to body
        document.body.appendChild(container);

        // Create title
        const title = document.createElement('h1');
        title.classList.add('text-center');
        title.id = 'title';
        title.textContent = 'Country Details';

        // Append title to container
        container.appendChild(title);
        
        // Create row div
        const row = document.createElement('div');
        row.classList.add('row');
        row.id = 'countryRow';

        // Append row to container
        container.appendChild(row);

        // Function to create Bootstrap card
        function createCard(country) {

            const card = document.createElement('div');
            
            card.classList.add('col-sm-6', 'col-md-4', 'col-lg-4', 'col-xl-4', 'mb-4');
        
            const cardBody = document.createElement('div');
            cardBody.setAttribute('id', 'card-item');
            cardBody.classList.add('card', 'h-100', 'p-3');
        
            const countryName = document.createElement('div');
            countryName.setAttribute('id', 'card-header-name');
            countryName.classList.add('card-header');
            countryName.classList.add('text-center')
            countryName.textContent = country.name.common;
        
            const flag = document.createElement('img');
            flag.setAttribute('id', 'flag-image');
            flag.classList.add('card-img-top', 'mx-auto');
            flag.src = country.flags.png;
            flag.alt = `${country.name.common} flag`;
        
            const cardText = document.createElement('div');
            cardText.classList.add('card-body');
        
            const nativeName = document.createElement('div');
            nativeName.classList.add('text-center');
            nativeName.classList.add('card-text');
            nativeName.textContent = `Native Name: ${country.name.common ? country.name.common : 'N/A'}`;
            
            const region = document.createElement('div');
            region.classList.add('text-center');
            region.classList.add('card-text');
            region.textContent = `Region: ${country.region || 'N/A'}`;
        
            const population = document.createElement('div');
            population.classList.add('text-center');
            population.classList.add('card-text');
            population.textContent = `Population: ${country.population || 'N/A'}`;
        
            const area = document.createElement('div');
            area.classList.add('text-center');
            area.classList.add('card-text');
            area.textContent = `Area: ${country.area ? country.area + ' km²' : 'N/A'}`;
        
            const capital = document.createElement('div');
            capital.classList.add('text-center');
            capital.classList.add('card-text');
            capital.textContent = `Capital: ${country.capital || 'N/A'}`;
        
            const countryCode = document.createElement('div');
            countryCode.classList.add('text-center');
            countryCode.classList.add('card-text');
            countryCode.textContent = `Country Code: ${country.cca2 || 'N/A'}`;
        
            const currency = document.createElement('div');
            currency.classList.add('text-center');
            currency.classList.add('card-text');
            currency.textContent = `Currency: ${country.currencies ? Object.values(country.currencies)[0].name : 'N/A'}`;
        
            const weatherButton = document.createElement('button');
            weatherButton.setAttribute('id', 'button');
            weatherButton.classList.add('btn', 'btn-primary', 'mt-1');
            weatherButton.textContent = 'Click for Weather';
        
            weatherButton.addEventListener('click', () => {
                // Fetch weather details using latitude and longitude
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${apiKey}`)
                .then(response => response.json())
                .then(weatherData => {
                    console.log(weatherData); // Log weather data to inspect its structure
                    alert(`Weather in ${country.name.common}\nTemperature: ${weatherData.main.temp}°C\nWeather: ${weatherData.weather[0].description}`);
                })
                .catch(error => console.error('Error fetching weather data:', error));
            });
        
            cardText.appendChild(nativeName);
            cardText.appendChild(region);
            cardText.appendChild(population);
            cardText.appendChild(area);
            cardText.appendChild(capital);
            cardText.appendChild(countryCode);
            cardText.appendChild(currency);
        
            cardBody.appendChild(countryName);
            cardBody.appendChild(flag);
            cardBody.appendChild(cardText);
            cardBody.appendChild(weatherButton);
        
            card.appendChild(cardBody);
        
            return card;
        }

        // Append cards to the row
        const countryRow = document.getElementById('countryRow');
        data.forEach(country => {
          countryRow.appendChild(createCard(country));
        });
      })
      .catch(error => console.error('Error fetching country data:', error));
});