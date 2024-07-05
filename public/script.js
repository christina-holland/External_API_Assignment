//Adding event listener to the form submission
document.getElementById('covidForm').addEventListener('submit', async function(event) {
    event.preventDefault(); //Preventing the default form submission behavior

    //Getting the form data using FormData API
    const formData = new FormData(this);
    const state = formData.get('state'); //Getting the value of the 'state' input field
    //Converting state abbreviation to lowercase so data is retrieved correctly
    state = state.toLowerCase();

    try {
        //Making a POST request to '/covid-data' endpoint with state data
        const response = await fetch('/covid-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            //Converting state to JSON format and send in the request body
            body: JSON.stringify({state})
        });

        //Checking if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch COVID-19 data'); //Throwing an error if response is not OK
        }

        //Parsing the response JSON data
        const data = await response.json();
        //Calling the function to display COVID-19 data on the webpage
        displayCovidData(data);
        
    //Logging any errors to the console and showing an alert message for user-facing error handling
    } catch (error) {
        console.error('Error:', error.message);

        alert('Failed to fetch COVID-19 data');
    }
});

//Creating the function to display COVID-19 state name and death count data on the webpage
function displayCovidData(data) {
    const covidInfo = document.getElementById('covidInfo');
    covidInfo.innerHTML = `
        <h2>${data.state}</h2>
        <p>Deaths: ${data.deaths}</p>
    `;
}