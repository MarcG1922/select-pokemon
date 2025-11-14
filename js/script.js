const selectorPokemon = document.getElementById("pokemon-select");
const data = document.getElementById("data");
const getInfoButton = document.getElementById("get-pokemon");

const endpoint = "https://pokeapi.co/api/v2/pokemon/";

function getPokemon() {
    let name = "Desconocido";
    let height = 0;
    let weight = 0;
    let typeNames = [];
    let image = "data:";

    fetch(endpoint + selectorPokemon.value)
    .then(response => {
        if(!response.ok){
            throw new Error(`Error en la peticion`)
        }
        return response.json();
    })
    .then(data => {
        
        if (data.name) name = data.name;
        if (Number.isInteger(data.height)) height = data.height;
        if (Number.isInteger(data.weight)) weight = data.weight;

        if (Array.isArray(data.types)) {
            for (type of data.types) {
                const typeName = type?.type?.name;
                if (typeName) typeNames.push(typeName);
            }
        }

        const imageReceived = data.sprites?.front_default;
        if (imageReceived) image = imageReceived;
    })
    .finally(() => {
        data.innerHTML = `
            <div class="cardPokemon">
                <img src="${image}" alt="${name}">
                <h2>Nombre: ${name}</h2>
                <p>Altura: ${height}</p>
                <p>Peso: ${weight}</p>
                <div class="typesBox">
                    <p>Tipos:</p>
                    <div class="types"> ${typeNames.map(t => `<span class="type-chip type-${t}">${t}</span>`).join("")}</div>
                </div>
            </div>
        `;
    })
    .catch(error => {
        console.log(error);
    })
}

getInfoButton.addEventListener("click", () => {
    getPokemon();
});