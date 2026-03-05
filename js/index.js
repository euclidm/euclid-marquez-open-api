const API_URL = `https://api.thecatapi.com/v1/`;
const API_KEY = `live_sbonU1ePugWREraEOeaiPPhbTUecRDcQpH3vAvRxqbwMg531RSI0X82wAvEcc6un`;

// [0] Variables

//  Grid Count - 5
const section_grids = {leadership: document.getElementById("leadership-grid"), 
    marketing: document.getElementById("marketing-grid"),
    project: document.getElementById("project-grid"),
    community: document.getElementById("community-grid"),
    hiring: document.getElementById("hiring-grid")};

//  # of Cat Club Officers - 20 Officers
const catOfficers = ["Milo", "Yuki", "Willow", "Melody", "Lulu",
    "Leo", "Mochi", "Sol", "Daisy", "Prinz",
    "Taylor", "Charlie", "Tate", "Zoe", "Honey",
    "Mars", "Tofu", "Miso", "Winston", "Bee"];
    
//  Roles
const roleList = {
    // Leadership Roles (President, IVP, EVP, Finance Director)
    leadership: [
        {catRole: "Purr-sident", realRole: "President"}, {catRole: "VP of Internal Purr-ations", realRole: "Internal Vice-President"},
        {catRole: "VP of External Purr-tnerships", realRole: "External Vice-President"}, {catRole: "Treat Director", realRole: "Finance Director"}
    ],
    // Marketing & Design Roles (Marketing Director/Coordinators, Creative Director, Graphic Designers)
    marketing: [
        {catRole: "Head of Meow-keting", realRole: "Marketing Director"}, {catRole: "Meow-keting Coordinator", realRole: "Marketing Coordinator"},
        {catRole: "Meow-keting Coordinator", realRole: "Marketing Coordinator"}, {catRole: "Creative Meows & Paws", realRole: "Creative Director"},
        {catRole: "Paw-designer", realRole: "Graphic Designer"}, {catRole: "Paw-designer", realRole: "Graphic Designer"}
    ],
    // Project Team Roles (Project Team Director/Coordinators)
    project: [
        {catRole: "Head of Paw-ject Team", realRole: "Project Team Director"}, {catRole: "Paw-ject Coordinator", realRole: "Project Coordinator"},
        {catRole: "Paw-ject Coordinator", realRole: "Project Coordinator"}, {catRole: "Paw-ject Coordinator", realRole: "Project Coordinator"}
    ],
    // Community Roles (Workshop Director/Coordinators, Mentorship Director/Coordinators)
    community: [
        {catRole: "Head of Paw-shops", realRole: "Workshop Director"}, {catRole: "Paw-shop Coordinator", realRole: "Workshop Coordinator"},
        {catRole: "Paw-shop Coordinator", realRole: "Workshop Coordinator"}, {catRole: "Head of Meow-ship", realRole: "Mentorship Director"},
        {catRole: "Meow-ship Coordinator", realRole: "Mentorship Coordinator"}, {catRole: "Meow-ship Coordinator", realRole: "Mentorship Coordinator"}
    ],
};

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

// [2] TheCatAPI Fetch Images
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