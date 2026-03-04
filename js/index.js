const API_URL = `https://api.thecatapi.com/v1/`;
const API_KEY = `live_sbonU1ePugWREraEOeaiPPhbTUecRDcQpH3vAvRxqbwMg531RSI0X82wAvEcc6un`;

// [1] TheCatAPI Fetch Breeds
fetch(`${API_URL}breeds`, {headers: {"x-api-key": API_KEY}})

.then(function(response){
    return response.json();
})

.then(function(data){
    console.log("TheCatAPI (Breed) Response: ", data);
})

.catch(function(error){
    console.error("Error fetching TheCatAPI (Breed) data: ", error);
});

// [3] TheCatAPI Fetch Images
fetch(`${API_URL}images/search?limit=${12}&has_breeds=1`, {headers: {"x-api-key": API_KEY}})

.then(function(response){
    return response.json();
})

.then(function(data){
    console.log("TheCatAPI (Imgs) Response: ", data);

    data.forEach((cat, index) => {
        const cat_breed = cat.breeds?.[0];
        console.log(`Cat #${index + 1}: `, "Breed - ", cat_breed?.name, " Origin - ", cat_breed?.origin, " Image - ", cat?.url);
    })
})

.catch(function(error){
    console.error("Error fetching TheCatAPI (Imgs) data: ", error);
});