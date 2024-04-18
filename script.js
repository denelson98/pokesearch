const searchButton = document.querySelector('#search-button')
searchButton.addEventListener('click', getId)
let id = document.querySelector('#search-input').value

function getId(){
    let id = document.querySelector('#search-input').value
    fetchData(id)
}

async function fetchData(id){
    try{
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${id}`)
        const data = await response.json();
        getPokemon(data)
    } catch(error){
        alert('Invalid Entry')
    }
}

function getPokemon(data){
    // deconstruct JSON and retrieve pokemon info and pic
    //displayPokemon()
}

/*
function displayPokemon(){
    // DOM manipulation to display all given pokemon datat from API
}
*/