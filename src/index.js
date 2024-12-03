const addSubmitListener = () => {
    const breweryForm = document.getElementById('brewery-search')
    breweryForm.addEventListener('submit', (event) => {
        event.preventDefault()

        const city = document.getElementById('city-name').value


        console.log(city)

    })
}

const main = () => {
    console.log('main function called')
    addSubmitListener();
};

window.addEventListener('load', main)

