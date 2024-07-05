const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
//Instructor added this code
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));

//Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Serve static files from the 'public' directory
app.use(express.static('public'));

//Route handling form submissions
app.post('/covid-data', async (req, res) => {
    try {
        const {state} = req.body;

        //Make a request to the COVID-19 API using Axios
        const apiUrl = `https://api.covidtracking.com/v1/states/${state}/current.json`;
        const response = await axios.get(apiUrl);

        //Extract and format relevant data from the API response
        const formattedData = {
            state: response.data.state,
            deaths: response.data.deathConfirmed,
        };

        //Send the formatted data back to the client
        res.json(formattedData);

    } catch (error) {
        //Handle errors
        console.error('Error fetching COVID-19 data:', error.message);
        res.status(500).json({ error: 'Failed to fetch COVID-19 data' });
    }
});

//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
