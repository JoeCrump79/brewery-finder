const addSubmitListener = () => {
    const breweryForm = document.getElementById('brewery-search')
    breweryForm.addEventListener('submit', (event) => {
        event.preventDefault()

        const city = document.getElementById('city-name').value
        getBreweriesByCity(city)

        console.log(city)

    })
}



const getBreweriesByCity = (city, perPage = 10) => {
    const encodedCity = encodeURIComponent(city);
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_city=${encodedCity}&per_page=${perPage}`)
        .then((response) => {
            if (!response.ok) {
                console.log(response)
            }
            return response.json();
        })
        .then((breweries) => {
            // Map over the breweries to extract the required information
            const breweryInfo = breweries.map((brewery) => ({
                name: brewery.name,
                address_1: brewery.street, // `address_1` is mapped to `street` in the API
                website_url: brewery.website_url,
            }));

            // Call a function to render the information on the website
            renderBreweries(breweryInfo);
        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });
};

function renderBreweryDetails(brewery) {
    const breweryDetails = document.getElementById('brewery-detail')
    const addressElement = document.createElement('p');
        addressElement.textContent = brewery.address_1 || 'Address not available';

        const websiteElement = document.createElement('a');
        websiteElement.href = brewery.website_url;
        websiteElement.textContent = 'Visit Website';
        websiteElement.target = '_blank'; // Open link in a new tab
    breweryDetails.appendChild(addressElement);
    breweryDetails.appendChild(websiteElement);
}
// Function to render breweries on the webpage
const renderBreweries = (breweryInfo) => {
    const container = document.getElementById('brewery-list'); // Ensure your HTML has an element with this ID
    container.innerHTML = ''; // Clear previous results
    

    breweryInfo.forEach((brewery) => {
        // Create elements for each piece of information
        const card = document.createElement('div');
        card.className = 'brewery-card';

        const nameElement = document.createElement('h3');
        nameElement.textContent = brewery.name;
        nameElement.addEventListener('click',() => {
                renderBreweryDetails(brewery)
        })

        // Append elements to the card
        card.appendChild(nameElement);
        

        // Append card to the container
        container.appendChild(card);
    });
};

const main = () => {
    console.log('main function called')
    addSubmitListener();

};

window.addEventListener('load', main)

