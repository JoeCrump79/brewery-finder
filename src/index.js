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
            if(!response.ok) {
                console.log(response)
            }
            return response.json();
        })
        .then((breweries) => {
            console.log(breweries)

        })
}

const main = () => {
    console.log('main function called')
    addSubmitListener();

};

window.addEventListener('load', main)

