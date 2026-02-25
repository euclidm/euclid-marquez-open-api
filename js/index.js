const API_URL = `https://api.thecatapi.com/v1/`;
const API_KEY = `live_sbonU1ePugWREraEOeaiPPhbTUecRDcQpH3vAvRxqbwMg531RSI0X82wAvEcc6un`;

// TheCatAPI Fetch Breeds
fetch(`${API_URL}breeds`, {headers: {"x-api-key": API_KEY}})

.then(function(response){
    return response.json();
})

.then(function(data){
    console.log("TheCatAPI Response: ", data);
})

.catch(function(error){
    console.error("Error fetching TheCatAPI data: ", error);
});