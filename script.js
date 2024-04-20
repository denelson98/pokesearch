const searchButton = document.querySelector('#search-button')
const searchInput = document.querySelector('#search-input')
const display = document.querySelector('.display');
const baseStats = document.querySelector('.base-stats-container')

searchButton.addEventListener('click', getId)
searchInput.addEventListener('keypress', (event)=>{
    if(event.key === 'Enter'){
        event.preventDefault();
        searchButton.click();
    }
})

function getId(){
    let id = document.querySelector('#search-input').value
    fetchData(id)
}

async function fetchData(id){
    try{
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${id}`)
        const data = await response.json();
        displayPokemon(data)
    } catch(error){
        alert('Invalid Entry')
    }
}

function displayPokemon(data){
    console.log(data)
    const {
        name, 
        id, 
        weight, 
        height, 
        sprites: { front_default: pic }, 
        types, 
        stats
    } = data;
    const [{ base_stat: hp }] = stats
    const pokeName = name.toUpperCase(); 
    const pokeWeight = weight/10
    const pokeHeight = Number((height/10).toFixed(1))

    if(types.length === 2){
        const [{type: {name: type1}}, {type: { name: type2}}] = types;
        display.innerHTML = 
        `<p id="name-id">${pokeName} #${id}</p>
        <p id="weight">Weight: ${pokeWeight} kg</p>
        <p id="height">Height: ${pokeHeight} m</p>
        <img src="${pic}">
        <div class="types">
            <div>${type1.toUpperCase()}</div>
            <div>${type2.toUpperCase()}</div>
        </div>`
    } else {
        const [{type: {name: type1}}] = types;
        display.innerHTML = 
        `<p id="name-id">${pokeName} #${id}</p>
        <p id="weight">Weight: ${pokeWeight} kg</p>
        <p id="height">Height: ${pokeHeight} m</p>
        <img src="${pic}">
        <div class="types">
            <div>${type1.toUpperCase()}</div>
        </div>`
    }

    baseStats.innerHTML = `
    <div id="hp">HP: ${hp}</div>
    <div id="attack">Attack: </div>
    <div id="defense">Dfense: </div>
    <div id="special-attack">Sp. Atk: </div>
    <div id="spcial-defense">Sp Def: </div>
    <div id="speed">Speed: </div>`
    
}
