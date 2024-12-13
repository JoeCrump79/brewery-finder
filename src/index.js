const addSubmitListener = () => {
    const breweryForm = document.getElementById('brewery-search');
    breweryForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const city = document.getElementById('city-name').value;
        getBreweriesByCity(city);

        console.log(city);
    });
};
//Adds an event listener to brewery search form to handle form submission.
    // Gets form element with id of 'brewery-search'.
    // Attaches submit event listener.
    // Prevents default form submission behavior (event.preventDefault()).
    // Extracts city name from an input field (id='city-name') and passes it to getBreweriesByCity.
    // Logs city name to the console.

const getBreweriesByCity = (city, perPage = 10) => {
    const encodedCity = encodeURIComponent(city);
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_city=${encodedCity}&per_page=${perPage}`)
        .then((response) => {
            if (!response.ok) {
                console.log(response);
                alert('Website unavailable, please try again later')
                return 
            }
            return response.json();
        })
        .then((breweries) => {
            const breweryInfo = breweries.map((brewery) => ({
                name: brewery.name,
                address_1: brewery.street || 'Address not available', 
                phone: brewery.phone || 'Phone number not available', 
                website_url: brewery.website_url || 'Website not available', 
            }));


            renderBreweries(breweryInfo);
        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });
};
// Fetches brewery data for specified city from Open Brewery DB API.
// Parameters:
    // city: The city name to search for breweries.
    // perPage: Optional parameter specifying the number of results per page (default is 10).
   
        // Encodes city name to make it URL-safe (encodeURIComponent(city)).
        // Sends GET request to API using fetch().
        // Checks if response is successful (response.ok). If not, it logs error and shows alert.
        // Parses JSON response to extract brewery data.
        // Maps brewery data to a simplified format and passes it to renderBreweries.
        // Logs errors encountered during fetch operation.

function renderBreweryDetails(brewery, breweryDetails) {
    const addressElement = document.createElement('p');
    addressElement.textContent = `Address: ${brewery.address_1}`;

    const phoneElement = document.createElement('p');
    phoneElement.textContent = `Phone: ${brewery.phone}`;

    const websiteElement = document.createElement('a');
    if (brewery.website_url !== 'Website not available') {
        websiteElement.href = brewery.website_url;
        websiteElement.textContent = 'Visit Website';
        websiteElement.target = '_blank'; 
    } else {
        websiteElement.textContent = brewery.website_url;
    }

    breweryDetails.appendChild(addressElement);
    breweryDetails.appendChild(phoneElement);
    breweryDetails.appendChild(websiteElement);
}
// Creates and appends detailed information (address, phone, website) for a brewery.
// Parameters:
    // brewery: An object containing brewery’s details.
    // breweryDetails: A container element where details will be appended.
    
        // Creates HTML elements for address, phone, and website.
        // Appends these elements to breweryDetails container.

const renderBreweries = (breweryInfo) => {
    const container = document.getElementById('brewery-list'); // Ensure your HTML has an element with this ID
    container.innerHTML = ''; 
    breweryInfo.forEach((brewery) => {
        const card = document.createElement('div');
        card.className = 'brewery-card';

        const nameElement = document.createElement('h3');
        nameElement.textContent = brewery.name;

        const breweryDetails = document.createElement('div');
        breweryDetails.className = 'brewery-detail';
        breweryDetails.style.display = 'none'; 

        renderBreweryDetails(brewery, breweryDetails);

        nameElement.addEventListener('click', () => {
            breweryDetails.style.display =
                breweryDetails.style.display === 'none' ? 'block' : 'none';
        });

        card.appendChild(nameElement);
        card.appendChild(breweryDetails);

        container.appendChild(card);
    });
};
// Displays list of breweries on the webpage.

    // Clears previous results in container (brewery-list).
    // Loops through breweryInfo array to create a "card" for each brewery.
    // Includes brewery name and detailed information (hidden by default).
    // Adds click event to toggle visibility of details.
const main = () => {
    console.log('main function called');
    addSubmitListener();
};

window.addEventListener('load', main);
// Initializes app by calling addSubmitListener when page loads.
// Main function is executed when the load event is triggered on the window object.