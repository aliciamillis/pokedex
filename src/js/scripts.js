//this is the start of the IIFE
let pokemonRepository = (function () {
let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    //adding a new pokemon code
      function add(pokemon) {
        if (
          typeof pokemon === "object" &&
          "name" in pokemon &&
          "detailsUrl" in pokemon
        ) {
        pokemonList.push(pokemon);
        } else {
          console.log("add pokemon");
        }
      }

    //how to view the whole list with getAll var
      function getAll() {
        return pokemonList;
      }


      //allow for scrolling nav bar//
  // $(window).scroll(function(){
  //         if ($(window).scrollTop() >= 300) {
  //             $('nav').addClass('fixed-header');
  //             $('nav div').addClass('visible-title');
  //         }
  //         else {
  //             $('nav').removeClass('fixed-header');
  //             $('nav div').removeClass('visible-title');
  //         }
  // });

    //function that allows us to see a card with all pokemon
    function addListItem(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function () {
          let $row = $(".row");
          let $card = $('<div class="card" style="width:300px"></div>');
          let $image = $('<img class="card-img-top" alt="Card image" style="width:20%" />');
          $image.attr("src", pokemon.imageUrlFront);
          let $cardBody = $('<div class="card-body"></div>');
          let $cardTitle = $("<h4 class='card-title'>" + pokemon.name + "</h4>");
          let $seeProfile = $('<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">See More</button>');;

          $row.append($card);
          $card.append($image);
          $card.append($cardBody);
          $cardBody.append($cardTitle);
          $cardBody.append($seeProfile);

          $seeProfile.on("click", function (event) {
            showDetails(pokemon);
          });
        });
      }

            //how to view those detials
    function showDetails(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function () {
          // console.log(pokemon);
          showModal(pokemon);
      });
    }

      //brings in all the info for each pokemon
    function loadList() {
      return $.ajax(apiUrl)
        .then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
            console.log(pokemon);
          });
        })
        .catch(function (e) {
          console.error(e);
        })
      }


    //brings in all the info for each pokemon
    function loadDetails(pokemon) {
      let url = pokemon.detailsUrl;
      return $.ajax(url)
        .then(function (details) {
            pokemon.name;
            pokemon.imageUrlFront = details.sprites.front_default;
            pokemon.imageUrlBack = details.sprites.back_default;
            pokemon.height = details.height;
            //loop for type
            pokemon.types = [];
            for (let i = 0; i < details.types.length; i++) {
              pokemon.types.push(details.types[i].type.name);
            }
            //loop for abilities
            pokemon.abilities = [];
            for (let i = 0; i < details.abilities.length; i++) {
              pokemon.abilities.push(details.abilities[i].ability.name);
            }
            pokemon.weight = details.weight;
          }).catch(function (e) {
            // console.error(e);
          });
        }

      //variable for modal-container
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

        //clear existing content
    modalHeader.empty();
    modalTitle.empty();
    modalBody.empty();

        //creating element for name
    let nameElement = $("<h1>" + pokemon.name + "</h1>");

        //creating img
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", pokemon.imageUrlFront);
    let imageElementBack = $('<img class="modal-img style="width:50%">');
    imageElementBack.attr("src", pokemon.imageUrlBack);

        //creating element for height, weight and type
    let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");

    let weightElement = $("<p>" + "weight : " + pokemon.weight + " lbs" + "</p>");

    let typesElement = $("<p>" + "types : " + pokemon.types + "</p>");

    let abilitiesElement = $("<p>" + "abilities : " + pokemon.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
  };
//^^^^ end of IIFE
})();

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach (function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
});
