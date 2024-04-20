const searchButton = document.querySelector('#search-button')
const searchInput = document.querySelector('#search-input')
const display = document.querySelector('.display');
const baseStats = document.querySelector('.stat-column')
const hpDisplay = document.querySelector('#hp')
const attackDisplay = document.querySelector('#attack')
const defenseDisplay = document.querySelector('#defense')
const specailAttackDisplay = document.querySelector('#special-attack')
const specialDefenseDisplay = document.querySelector('#special-defense')
const speedDisplay = document.querySelector('#speed')


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
    const {
        name, 
        id, 
        weight, 
        height, 
        sprites: { front_default: pic }, 
        types, 
        stats
    } = data;
    const [
        { base_stat: hp },
        { base_stat: attack },
        { base_stat: defense },
        { base_stat: specailAttack },
        { base_stat: specialDefense },
        { base_stat: speed },  
    ] = stats
    const pokeName = name.toUpperCase(); 
    const pokeWeight = weight/10
    const pokeHeight = Number((height/10).toFixed(1))

    if(types.length === 2){
        const [{type: {name: type1}}, {type: { name: type2}}] = types;
        display.innerHTML = 
        `<p id="name-id">${pokeName} #${id}</p>
        <p id="weight">Weight: ${pokeWeight} kg</p>
        <p id="height">Height: ${pokeHeight} m</p>
        <img src="${pic}" alt="pokemon-icon">
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

    hpDisplay.textContent = hp;
    attackDisplay.textContent = attack;
    defenseDisplay.textContent = defense;
    specailAttackDisplay.textContent = specailAttack;
    specialDefenseDisplay.textContent = specialDefense;
    speedDisplay.textContent = speed;
}

