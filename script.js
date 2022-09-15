//Spoonacular API documentation: https://spoonacular.com/food-api/docs
//Spoonacular Authentication: https://spoonacular.com/food-api/docs#Authentication
var page2Div = document.createElement("div"); //create dynamic div html element
var page3Div = document.createElement("div"); //create dynamic div html element
var page4Div = document.createElement("div"); //create dynamic div html element


var page1Div = document.querySelector(".page-1"); //selecting DOM element

var cuisineBtn = document.getElementById("cuisine"); //selecting DOM element
var backBtn = document.getElementById("back");
var homeBtn = document.getElementById("home");
var mainDiv = document.querySelector("main"); //selecting DOM element
var favoriteHome = document.getElementById("favoritehome") // selecting favorite home button

var frenchStyle = document.getElementById("french"); //selecting DOM element
var spoonApiKey = "14247a92423844b6a40e24594639ed2b"; //key

var ids = []; //placeholder - might need to use array to remove duplicate id

var recipeFavorite; //Declared globally, name of favorite recipe
var listOfFavorites = [] //at first the list of favorite is empty, then as favorite button clicked --> fills array

//var recipeInfoUrl = 'https://api.spoonacular.com/recipes/' + id +'/information'

// This is an event listener for the favorite button on the home page 
favoriteHome.addEventListener("click", function () {
  console.log("local favorite"); // works
})

//once the user click the 'Cuisine' button, it calls the following function
function page2handler(event) {
  page1Div.style.display = "none"; //hide page 1

  page2Div.setAttribute("class", "page-2"); // create page 2

  var french = document.createElement("button"); //create DOM element (button)
  var american = document.createElement("button"); //create DOM element (button)
  var german = document.createElement("button"); //create DOM element (button)
  var italian = document.createElement("button"); //create DOM element (button)
  // var backBtn = document.createElement('button') //comment out back button
  // backBtn.setAttribute('id','backBtn') // comment out back button


  mainDiv.appendChild(page2Div); //parent append child
  page2Div.appendChild(french); //parent append child
  page2Div.appendChild(american); //parent append child
  page2Div.appendChild(german); //parent append child
  page2Div.appendChild(italian); //parent append child
  // page2Div.appendChild(backBtn)


  french.innerHTML = "French"; //assign innerHTML to button
  american.innerHTML = "American"; //assign innerHTML to button
  german.textContent = "German"; //assign innerHTML to button
  italian.textContent = "Italian"; //assign innerHTML to button
  // backBtn.textContent = "Back" // comment out back button 

  console.log(event.target.textContent); //could remove it; used to check the button the user clicks

  // backBtn.addEventListener("click", page1handler)
  $("button").click(page3handler); // once the user click on any button, it will call page3handler function
}

//the function is handling the page3
function page3handler(event) {
  page2Div.style.display = "none"; //hide page 1

  page3Div.setAttribute("class", "page-3"); // create page 3

  console.log(event.target.textContent); // could remove it; used to check the button the user clicks

  var cuisine = event.target.textContent; // get the content from the button

  var cuisineUrl =
    "https://api.spoonacular.com/recipes/complexSearch?" +
    "&cuisine=" +
    cuisine +
    "&apiKey=" +
    spoonApiKey; //api address

  console.log(cuisineUrl); // could remove it

  //fetch request
  function getRecipeName() {
    fetch(cuisineUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (recipeName) {
        console.log(recipeName);

        //the fetch request return 10 items per page, so I limited to 10 items/page
        for (var i = 0; i < 10; i++) {
          //limited to 10 per page, but why can't use i<recipeName.length?
          var cuisineHeader = document.createElement("h2"); //create new element
          var cuisineImg = document.createElement("img"); //create new element
          var cuisineRecipe = document.createElement("p"); // create new element

          cuisineHeader.textContent = recipeName.results[i].title; //iterate through the 10 items
          cuisineImg.src = recipeName.results[i].image; //iterate through the 10 items
          cuisineHeader.setAttribute("id", recipeName.results[i].id); //iterate through the 10 items

          cuisineHeader.addEventListener("click", function () {
            //once the user click on the header, it goes to page 4
            console.log(this);
            var id = this.getAttribute("id");

            console.log(id);
            page4handler(id); //pass the id (variable) to page4handler
          });

          mainDiv.appendChild(page3Div); //parent append child
          page3Div.appendChild(cuisineHeader); //parent append child
          page3Div.appendChild(cuisineImg); //parent append child
          page3Div.appendChild(cuisineRecipe); //parent append child
        }

        // cuisineHeader.addEventListener('click',page4handler)
      });
  }
  getRecipeName(); //call the getRecipeName function
}

//the function is handling the page3
function page4handler(id) {
  page2Div.style.display = "none"; //hide page 2
  page3Div.style.display = "none"; //hide page 3

  page4Div.setAttribute("class", "page-4"); //create page 4

  var cuisineHeader = document.createElement("h2"); //create element
  var cuisineImg = document.createElement("img"); //create element
  var cuisineRecipe = document.createElement("p"); //create element
  var cuisineVideo = document.createElement("div"); //create element
  var favoriteBtn = document.createElement("button"); //creates the favorite ❤ button
  favoriteBtn.textContent = "Favorite ❤"; //sets favoriteBtn text to 'Favorite ❤'
  favoriteBtn.setAttribute("class", "favorite-btn"); //sets favoriteBtn class to favorite-btn

  mainDiv.appendChild(page4Div); // parent append child
  page4Div.appendChild(cuisineHeader); // parent append child
  page4Div.appendChild(favoriteBtn); // appends favorite button to the header
  page4Div.appendChild(cuisineImg); // parent append child
  page4Div.appendChild(cuisineRecipe); // parent append child
  //page4Div.appendChild(cuisineVideo);

  var recipeInfoUrl =
    "https://api.spoonacular.com/recipes/" +
    id +
    "/information?" +
    "&apiKey=" +
    spoonApiKey; //spoonacular API

  //fetch request for spoonacular API
  fetch(recipeInfoUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (recipeInfo) {
      console.log(recipeInfo);
      cuisineHeader.textContent = recipeInfo.title; //add textContent to the header, recipeInfo.title will return the name of the recipe
      cuisineImg.src = recipeInfo.image; //add image to the image HTML, recipeInfo.image will return the src link
      cuisineRecipe.innerHTML = recipeInfo.summary; // add innerHTML to the body, recipeInfo.summary will return the text summary of the recipe

      var youTubeApiKey = "AIzaSyCPVbJouFqqk56R4EteKzKMhY703BMSE_M"; //youtube API key
      var youTubeUrl =
        "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" +
        cuisineHeader.textContent +
        "&key=" +
        youTubeApiKey; // maxResults = 1 will return 1 video, q = cuisineHeader.textContent will return the video based on the recipe name

      console.log(cuisineHeader.textContent); //could remove later

      //fetch request for youTubeApi
      fetch(youTubeUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          console.log(data.items[0].id.videoId); //data.items[0].id.videoId will return the youtube videoId and we will use this inside the obj.video.value
          var videoId = data.items[0].id.videoId; //create a variable to store the youtube videoId and we will use this inside the obj.video.value
          var obj = {
            video: {
              value:
                "<iframe title='YouTube video player' type='text/html' width='640' height='390' src='http://www.youtube.com/embed/" +
                videoId +
                "' frameborder='0' allowFullScreen></iframe>", //create the obj object, and we will get the videoId from the variable we just created above
            },
          };

          console.log(obj.video.value); // could remove later
          //    document.write(obj.video.value) // remove
          cuisineVideo.innerHTML = obj.video.value; // add the obj.video.value to cusineVideo
          page4Div.appendChild(cuisineVideo); //parent append child
        });
    });

  //!When favorite button clicked --> push the recipe name to local storage
  favoriteBtn.addEventListener("click", function () {
    recipeFavorite = cuisineHeader.textContent; //Recipe Name of the favorite recipe
    listOfFavorites.push(recipeFavorite); //add recipe to the list of favorites
    localStorage.setItem("favorites", JSON.stringify(listOfFavorites)); //save to local storage
    var favoritesToDisplay = JSON.parse(localStorage.getItem("favorites"));
    console.log(favoritesToDisplay);
  });
}



function page1handler() {}

function page1handler(){
  page1Div.style.display = "flex"
  page2Div.style.display = "none"
  page3Div.style.display = "none"
  page4Div.style.display = "none"
}



// once the user click the 'Cuisine' button, it goes to page2

cuisineBtn.addEventListener("click", page2handler);

  

// once the user click the 'Cuisine' button, it goes to page2

cuisineBtn.addEventListener("click", page2handler);

