// Mock weather data for 5 cities
        const citiesWeatherData = [
            {
                name: 'New York',
                country: 'US',
                temperature: 22,
                description: 'sunny',
                feelsLike: 24,
                humidity: 65,
                wind: 12,
                pressure: 1013,
                icon: 'sun',
                forecast: [
                    { day: 'Sat', temp: 24, icon: 'cloud-sun' },
                    { day: 'Sun', temp: 26, icon: 'sun' },
                    { day: 'Mon', temp: 21, icon: 'cloud' },
                    { day: 'Tue', temp: 19, icon: 'cloud-rain' },
                    { day: 'Wed', temp: 23, icon: 'sun' }
                ]
            },
            {
                name: 'London',
                country: 'UK',
                temperature: 12,
                description: 'cloudy',
                feelsLike: 10,
                humidity: 80,
                wind: 18,
                pressure: 1008,
                icon: 'cloud',
                forecast: [
                    { day: 'Sat', temp: 14, icon: 'cloud' },
                    { day: 'Sun', temp: 13, icon: 'cloud-rain' },
                    { day: 'Mon', temp: 11, icon: 'cloud-showers-heavy' },
                    { day: 'Tue', temp: 12, icon: 'cloud' },
                    { day: 'Wed', temp: 15, icon: 'cloud-sun' }
                ]
            },
            {
                name: 'Tokyo',
                country: 'JP',
                temperature: 18,
                description: 'partly cloudy',
                feelsLike: 19,
                humidity: 70,
                wind: 8,
                pressure: 1015,
                icon: 'cloud-sun',
                forecast: [
                    { day: 'Sat', temp: 19, icon: 'sun' },
                    { day: 'Sun', temp: 21, icon: 'sun' },
                    { day: 'Mon', temp: 17, icon: 'cloud' },
                    { day: 'Tue', temp: 16, icon: 'cloud' },
                    { day: 'Wed', temp: 20, icon: 'sun' }
                ]
            },
            {
                name: 'Sydney',
                country: 'AU',
                temperature: 28,
                description: 'clear sky',
                feelsLike: 30,
                humidity: 55,
                wind: 15,
                pressure: 1020,
                icon: 'sun',
                forecast: [
                    { day: 'Sat', temp: 29, icon: 'sun' },
                    { day: 'Sun', temp: 31, icon: 'sun' },
                    { day: 'Mon', temp: 27, icon: 'cloud-sun' },
                    { day: 'Tue', temp: 26, icon: 'cloud' },
                    { day: 'Wed', temp: 28, icon: 'sun' }
                ]
            },
            {
                name: 'Paris',
                country: 'FR',
                temperature: 16,
                description: 'light rain',
                feelsLike: 15,
                humidity: 75,
                wind: 10,
                pressure: 1012,
                icon: 'cloud-rain',
                forecast: [
                    { day: 'Sat', temp: 17, icon: 'cloud' },
                    { day: 'Sun', temp: 18, icon: 'cloud-sun' },
                    { day: 'Mon', temp: 15, icon: 'cloud-rain' },
                    { day: 'Tue', temp: 14, icon: 'cloud' },
                    { day: 'Wed', temp: 19, icon: 'sun' }
                ]
            }
        ];

        // Additional cities for search functionality
        const additionalCities = {
            'Dubai': {
                name: 'Dubai',
                country: 'AE',
                temperature: 35,
                description: 'hot and sunny',
                feelsLike: 38,
                humidity: 40,
                wind: 20,
                pressure: 1010,
                icon: 'sun',
                forecast: [
                    { day: 'Sat', temp: 36, icon: 'sun' },
                    { day: 'Sun', temp: 37, icon: 'sun' },
                    { day: 'Mon', temp: 34, icon: 'sun' },
                    { day: 'Tue', temp: 33, icon: 'sun' },
                    { day: 'Wed', temp: 36, icon: 'sun' }
                ]
            },
            'Berlin': {
                name: 'Berlin',
                country: 'DE',
                temperature: 14,
                description: 'partly cloudy',
                feelsLike: 13,
                humidity: 72,
                wind: 14,
                pressure: 1011,
                icon: 'cloud-sun',
                forecast: [
                    { day: 'Sat', temp: 15, icon: 'sun' },
                    { day: 'Sun', temp: 16, icon: 'cloud-sun' },
                    { day: 'Mon', temp: 13, icon: 'cloud' },
                    { day: 'Tue', temp: 12, icon: 'cloud-rain' },
                    { day: 'Wed', temp: 17, icon: 'sun' }
                ]
            },
            'Mumbai': {
                name: 'Mumbai',
                country: 'IN',
                temperature: 32,
                description: 'humid',
                feelsLike: 36,
                humidity: 85,
                wind: 8,
                pressure: 1009,
                icon: 'sun',
                forecast: [
                    { day: 'Sat', temp: 33, icon: 'sun' },
                    { day: 'Sun', temp: 34, icon: 'sun' },
                    { day: 'Mon', temp: 31, icon: 'cloud' },
                    { day: 'Tue', temp: 30, icon: 'cloud-rain' },
                    { day: 'Wed', temp: 32, icon: 'sun' }
                ]
            }
        };

        // Icon mapping
        const iconMap = {
            'sun': 'fas fa-sun',
            'cloud-sun': 'fas fa-cloud-sun',
            'cloud': 'fas fa-cloud',
            'cloud-rain': 'fas fa-cloud-rain',
            'cloud-showers-heavy': 'fas fa-cloud-showers-heavy',
            'snow': 'fas fa-snowflake',
            'thunderstorm': 'fas fa-bolt',
            'mist': 'fas fa-smog'
        };

        // DOM elements
        const citiesGrid = document.getElementById('citiesGrid');
        const cityInput = document.getElementById('cityInput');
        const searchBtn = document.getElementById('searchBtn');

        // Function to create city card
        function createCityCard(cityData) {
            const forecastHTML = cityData.forecast.map(day => {
                const iconClass = iconMap[day.icon] || 'fas fa-sun';
                return `
                    <div class="forecast-day">
                        <div class="forecast-date">${day.day}</div>
                        <div class="forecast-icon"><i class="${iconClass}"></i></div>
                        <div class="forecast-temp">${day.temp}°</div>
                    </div>
                `;
            }).join('');

            const iconClass = iconMap[cityData.icon] || 'fas fa-sun';
            
            const card = document.createElement('div');
            card.className = 'city-card';
            card.innerHTML = `
                <div class="city-header">
                    <div>
                        <div class="city-name">${cityData.name}</div>
                        <div class="city-country">${cityData.country}</div>
                    </div>
                </div>
                <div class="current-weather">
                    <div class="current-temp">${cityData.temperature}°</div>
                    <div class="current-icon"><i class="${iconClass}"></i></div>
                </div>
                <div class="current-description">${cityData.description}</div>
                <div class="weather-details">
                    <div class="detail-item">
                        <div class="detail-value">${cityData.feelsLike}°</div>
                        <div class="detail-label">Feels like</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-value">${cityData.humidity}%</div>
                        <div class="detail-label">Humidity</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-value">${cityData.wind} km/h</div>
                        <div class="detail-label">Wind</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-value">${cityData.pressure} hPa</div>
                        <div class="detail-label">Pressure</div>
                    </div>
                </div>
                <div class="forecast-section">
                    <div class="forecast-title">5-Day Forecast</div>
                    <div class="forecast-days">
                        ${forecastHTML}
                    </div>
                </div>
            `;
            
            return card;
        }

        // Function to render cities
        function renderCities(cities) {
            citiesGrid.innerHTML = '';
            cities.forEach(cityData => {
                const cityCard = createCityCard(cityData);
                citiesGrid.appendChild(cityCard);
            });
        }

        // Initialize with 5 cities
        renderCities(citiesWeatherData);

        // Search functionality
        function searchCity() {
            const searchTerm = cityInput.value.trim().toLowerCase();
            if (!searchTerm) {
                renderCities(citiesWeatherData);
                return;
            }

            // Check if the search term matches any of the original 5 cities
            const foundCity = citiesWeatherData.find(city => 
                city.name.toLowerCase() === searchTerm || 
                city.country.toLowerCase() === searchTerm
            );

            // Check if it matches any additional cities
            const additionalCity = additionalCities[searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)];

            if (foundCity) {
                renderCities([foundCity]);
            } else if (additionalCity) {
                renderCities([additionalCity]);
            } else {
                // Show error message or keep original cities
                alert('City not found. Showing original cities.');
                renderCities(citiesWeatherData);
            }
        }

        // Event listeners
        searchBtn.addEventListener('click', searchCity);
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchCity();
            }
        });