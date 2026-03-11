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

// Hiring Board
const hiringList = [
    {catRole: "Paw-designer Intern", realRole: "Graphic Designer Intern"},
    {catRole: "Meowketing Intern", realRole: "Marketing Intern"},
    {catRole: "Paw-ject Coordinator Intern", realRole: "Project Coordinator Intern"},
    {catRole: "Paw-shop Coordinator Intern", realRole: "Workshop Coordinator Intern"},
    {catRole: "Meow-ship Coordinator Intern", realRole: "Mentorship Coordinator Intern"}
]

// [1] Functions

// [1.1] CatCardCreator
function createCard({catName, catRole, realRole, imgURL, catBreed, catOrigin}){
    const catCard = document.createElement("div");
    catCard.className = "cat-card";
    
    catCard.innerHTML = `
        <img class="cat-img" src="${imgURL}" alt="Cat Club Officer Image">
        <h3 class="cat-name">${catName}</h3>
        <p class="cat-role">${catRole}</p>
        <p class="real-role">${realRole}</p>
        <p class="cat-breed">Breed: ${catBreed}</p>
        <p class="cat-origin">Origin: ${catOrigin}</p>
    `;

    return catCard;
};

// [2] Use TheCatAPI Fetch Image > Creates Cat Card for each Club Member

fetch(`${API_URL}images/search?limit=${20}&has_breeds=1`, {headers: {"x-api-key": API_KEY}})

.then(function(response){
    return response.json();
})

.then(function(data){
    console.log("TheCatAPI (Img) Response: ", data);

    let catIndex = 0;

    Object.keys(roleList).forEach(sectionIndex => {

        roleList[sectionIndex].forEach(roleIndex => {
            
            const cat = data[catIndex];
            const catBreed = cat.breeds?.[0];

            // [2.1] Card Creator
            const catCard = createCard({
                catName: catOfficers[catIndex % catOfficers.length],
                catRole: roleIndex.catRole,
                realRole: roleIndex.realRole,
                imgURL: cat.url,
                catBreed: catBreed?.name,
                catOrigin: catBreed?.origin
            });

            section_grids[sectionIndex].append(catCard);

            catIndex++;
        })
    });
})

.catch(function(error){
    console.error("Error fetching TheCatAPI (Imgs) data: ", error);
});

// [3] Use TheCatAPI Fetch Breeds > Add info list of the type of breed/origin of Cats that we're hiring as interns
fetch(`${API_URL}breeds`, {headers: {"x-api-key": API_KEY}})

.then(function(response){
    return response.json();
})

.then(function(data){
    console.log("TheCatAPI (Breed) Response: ", data);

    hiringList.forEach(function(role){
        // [3.1] Random Cat Generator
        const newCat = data[Math.floor(Math.random() * data.length)];

        // [3.2] Card Creator
        const hiringCard = createCard({
            catName: "Now Hiring!",
            catRole: role.catRole,
            realRole: role.realRole,
            imgURL:  "https://helios-i.mashable.com/imagery/articles/00wbdftfOy2DpCwzab387kC/hero-image.fill.size_1200x1200.v1694035762.jpg",
            catBreed: newCat.name,
            catOrigin: newCat.origin
        })

        section_grids.hiring.append(hiringCard);
    });
})

.catch(function(error){
    console.error("Error fetching TheCatAPI (Breed) data: ", error);
});

