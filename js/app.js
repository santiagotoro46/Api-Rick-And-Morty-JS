// Traemos el input para realizar la busqueda
const txtCharacter = document.getElementById('txt-character');

// Traeremos el contenedor para visualizar las cards
const containerCards = document.getElementById('containerCards');

// Ahora paginaremos las 42 paginas que tiene la api de rick and morty
// definimos el numero de personajes por pagina y el total de las paginas


// Utilizamos la url con la que se va a trabajar
const URL1 = `https://rickandmortyapi.com/api/character`;
const URL2 = `https://rickandmortyapi.com/api/character/?name=`;
const totalPages = 42;
let currentPage = 1;

// utilizamos la funcion (propiedad) async await para manejar las promesas que responden en tiempo real
// traeremos la api

const getApi = async (URL) => {
    const response = await fetch(URL);
    const data = await response.json();
    return data.results; // este es el array de datos
}

// Creamos la funcion para generar las cards
const createCards = (character) => {
    const card = document.createElement('div');
    card.classList.add('card-character');

    const imgCard = document.createElement('img');
    imgCard.src = character.image;
    imgCard.alt = character.name;

    const containerDescription = document.createElement('div');
    containerDescription.classList.add('description-card');

    const nameCharacter = document.createElement('h2');
    nameCharacter.textContent = character.name;

    const genderCharacter = document.createElement('p');
    genderCharacter.textContent = 'Gender: ' + character.gender;

    const speciesCharacter = document.createElement('p');
    speciesCharacter.textContent = 'species: ' + character.species;

    containerDescription.appendChild(nameCharacter);
    containerDescription.appendChild(genderCharacter);
    containerDescription.appendChild(speciesCharacter);

    card.appendChild(imgCard);
    card.appendChild(containerDescription);

    containerCards.appendChild(card);

};



const getAllCharacter = async () => {
    const data = await getApi(URL1);
    data.map(character => createCards(character))
};


const getCharacterByName = async (event) => {
    containerCards.innerHTML = '';
    const data = await getApi(URL2 + event.target.value)
    data.map(character => createCards(character));
};


// manejo del boton siguiente
document.getElementById('next-page').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        fetchCharacters(currentPage);
    }
});

document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchCharacters(currentPage);
    }
});

// Definir la funcion para obtener los datos de la api de acuerdo con la pagina actual;
const fetchCharacters = async (page) => {
    try {
        const response = await fetch(`${URL1}?page=${page}`);

        if (!response.ok) {
            throw new Error('No se pudo obtener los datos');
        };

        const data = await response.json();

        // Ahora limpiamos el contenedor de tarjetas
        containerCards.innerHTML = '';

        // Ahora llamamos la funcion para crear las tarjetas de los datos;

        data.results.map(character => createCards(character));

    } catch (error) {
        console.error('Ha ocurrido un error con la llamada a la api', error);
    }
}


window.addEventListener('DOMContentLoaded', getAllCharacter)
txtCharacter.addEventListener('keyup', getCharacterByName);