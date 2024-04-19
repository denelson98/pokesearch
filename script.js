const searchButton = document.querySelector('#search-button')
searchButton.addEventListener('click', getId)
let id = document.querySelector('#search-input').value

const display = document.querySelector('.display');

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
    const height = data.height/10
    const name = data.name.toUpperCase()
    display.innerHTML = 
    `<p id="name-id">${name} #${data.id}</p>
    <p id="weight">Weight: ${data.weight/10} kg</p>
    <p id="height">Heigth: ${Number(height.toFixed(1))} m</p>
    <p id="types">${data.types}</p>`;
    // work on extracting types
    // <img src="">

    //base-stats update DOM stuff
}
