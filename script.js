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
    const { id, sprites: { front_default }, types} = data;
    const [{type: type1}, {type: type2}] = types;
    const name = data.name.toUpperCase(); 
    const weight = data.weight/10
    const height = Number((data.height/10).toFixed(1))

    display.innerHTML = 
    `<p id="name-id">${name} #${id}</p>
    <p id="weight">Weight: ${weight} kg</p>
    <p id="height">Height: ${height} m</p>
    <img src="${front_default}">
    <div class="types">
        <div>${type1.name.toUpperCase()}</div>
        <div>${type2.name.toUpperCase()}</div>
    </div>`
    
}
