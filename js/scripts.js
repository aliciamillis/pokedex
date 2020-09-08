//this is the start of the IIFE
let pokemonRepository = (function () {
let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');

    //adding a new pokemon code
      function add(pokemon) {
        if (
          typeof pokemon === "object" && "name" in pokemon
        ) {
        pokemonList.push(pokemon);
        } else {
          console.log("pokemon is not correct");
        }
      }

    //how to view the whole list with getAll var
      function getAll() {
        return pokemonList;
      }

    //function that allows us to see a button with all pokemon
      function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listPokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        button.addEventListener("click", function(event) {
          showDetails(pokemon);
        });
      }

    //brings in all the info for each pokemon
      function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
            console.log(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }

    //brings in the details for each pokemon
      function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          pokemon.imageUrl = details.sprites.front_default,
          pokemon.height = details.height,
          pokemon.type = details.type,
          pokemon.abilities = details.abilities;
        }).catch(function (e) {
          console.error(e);
        });
      }

    //how to view those detials
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
        showModal(pokemon);
          });
      }

      //variable for modal-container
      function showModal(pokemon) {
        modalContainer.classList.add('is-visible');

      // Clear all existing modal content
        modalContainer.innerHTML = '';

      //adding modal content
        let modal = document.createElement('div');
        modal.classList.add('modal');

          let closeButtonElement = document.createElement('button');
          closeButtonElement.classList.add('modal-close');
          closeButtonElement.innerText = 'Close';
          closeButtonElement.addEventListener('click', hideModal);

          let titleElement = document.createElement('h1');
          titleElement.innerText = pokemon.name;

          let contentElement = document.createElement('p');
          console.log('fe', pokemon);
          contentElement.innerText = pokemon.imageUrl + 'height:' + pokemon.height + 'type:' + pokemon.type;


          modal.appendChild(closeButtonElement);
          modal.appendChild(titleElement);
          modal.appendChild(contentElement);
          modalContainer.appendChild(modal);

          modalContainer.classList.add('is-visible');
        }

        //hiding the modal
        function hideModal() {
          modalContainer.classList.remove('is-visible');
        }

        //clicking escape key to close modal
        window.addEventListener('keydown', (e) => {
              if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                hideModal();
              }
        });

        //clicking outside container to close modal
        modalContainer.addEventListener('click', (e) => {
          let target = e.target;
          if (target === modalContainer) {
            hideModal();
          }
        });

        // document.querySelector('#modal-container');
        // });

        return {
         getAll: getAll,
         add: add,
         addListItem: addListItem,
         loadList: loadList,
         loadDetails: loadDetails,
         showDetails: showDetails
        };
//^^^^ end of IIFE
})();

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach (function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
})
