//Spoonacular API documentation: https://spoonacular.com/food-api/docs
//Spoonacular Authentication: https://spoonacular.com/food-api/docs#Authentication
var page2Div = document.createElement("div"); //create dynamic div html element
var page3Div = document.createElement("div"); //create dynamic div html element
var page4Div = document.createElement("div"); //create dynamic div html element
var page5Div = document.createElement("div"); //create dynamic div html element
var page6Div = document.createElement("div"); //create dynamic div html element
var page7Div = document.createElement("div"); //create dynamic div html element

var page1Div = document.querySelector(".page-1"); //selecting DOM element

var cuisineBtn = document.getElementById("cuisine"); //selecting DOM element
var dessertBtn = document.getElementById("dessert");
var backBtn = document.getElementById("back");
var mainDiv = document.querySelector("main"); //selecting DOM element

var frenchStyle = document.getElementById("french"); //selecting DOM element
var spoonApiKey = "bff7143ee08c4a6aa8d53b4a91fc839f"; //key

var ids = []; //placeholder - might need to use array to remove duplicate id

//var recipeInfoUrl = 'https://api.spoonacular.com/recipes/' + id +'/information'

//once the user click the 'Cuisine' button, it calls the following function
function page2handler(event) {
  page1Div.style.display = "none"; //hide page 1

  page2Div.setAttribute("class", "page-2"); // create page 2

  var french = document.createElement("button"); //create DOM element (button)
  var american = document.createElement("button"); //create DOM element (button)
  var german = document.createElement("button"); //create DOM element (button)
  var italian = document.createElement("button"); //create DOM element (button)

  mainDiv.appendChild(page2Div); //parent append child
  page2Div.appendChild(french); //parent append child
  page2Div.appendChild(american); //parent append child
  page2Div.appendChild(german); //parent append child
  page2Div.appendChild(italian); //parent append child

  french.innerHTML = "French"; //assign innerHTML to button
  american.innerHTML = "American"; //assign innerHTML to button
  german.textContent = "German"; //assign innerHTML to button
  italian.textContent = "Italian"; //assign innerHTML to button

  console.log(event.target.textContent); //could remove it; used to check the button the user clicks

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

  //! When favorite button clicked --> save name of the recipe to local storage (recipe name, recipe name)
  favoriteBtn.addEventListener("click", function () {
    console.log("favorite button clicked!"); //working
    var recipeFavorite = cuisineHeader.textContent;
    console.log(recipeFavorite);
    localStorage.setItem(recipeFavorite, recipeFavorite);
  });
}

// once the user click the 'Cuisine' button, it goes to page2
cuisineBtn.addEventListener("click", page2handler);

//once the user clicks the 'Dessert' button, it goes to page5
dessertBtn.addEventListener("click", page5handler);

function page5handler(event) {
  page1Div.style.display = "none"; //hide page 1
  page2Div.style.display = "none"; //hide page 2
  page3Div.style.display = "none"; //hide page 3
  page4Div.style.display = "none"; //hide page 4

  page5Div.setAttribute("class", "page-5"); // create page 2

  var cakes = document.createElement("button"); //create DOM element (button)
  var cookies = document.createElement("button"); //create DOM element (button)
  var pies = document.createElement("button"); //create DOM element (button)

  mainDiv.appendChild(page5Div); //parent append child
  page5Div.appendChild(cakes); //parent append child
  page5Div.appendChild(cookies); //parent append child
  page5Div.appendChild(pies); //parent append child

  cakes.innerHTML = "Cakes"; //assign innerHTML to button
  cookies.innerHTML = "Cookies"; //assign innerHTML to button
  pies.innerHTML = "Pies"; //assign innerHTML to button

  console.log(event.target.textContent); //could remove it; used to check the button the user clicks

  $("button").click(page6handler); // once the user click on any button, it will call page3handler function
}

//the function is handling the page6
function page6handler(event) {
  page2Div.style.display = "none"; //hide page 2
  page3Div.style.display = "none"; //hide page 3
  page4Div.style.display = "none"; //hide page 4
  page5Div.style.display = "none"; //hide page 5

  page6Div.setAttribute("class", "page-6"); // create page 6

  console.log(event.target.textContent); // could remove it; used to check the button the user clicks

  var dessert = event.target.textContent; // get the content from the button

  var dessertUrl =
    "https://api.spoonacular.com/recipes/complexSearch?" +
    "type=dessert&query=" +
    dessert +
    "&apiKey=" +
    spoonApiKey; //api address

  console.log(dessertUrl); // could remove it

  //fetch request
  function getRecipeName() {
    fetch(dessertUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (recipeName) {
        console.log(recipeName);

        //the fetch request return 10 items per page, so I limited to 10 items/page
        for (var i = 0; i < 10; i++) {
          //limited to 10 per page, but why can't use i<recipeName.length?
          var dessertHeader = document.createElement("h2"); //create new element
          var dessertImg = document.createElement("img"); //create new element
          var dessertRecipe = document.createElement("p"); // create new element

          dessertHeader.textContent = recipeName.results[i].title; //iterate through the 10 items
          dessertImg.src = recipeName.results[i].image; //iterate through the 10 items
          dessertHeader.setAttribute("id", recipeName.results[i].id); //iterate through the 10 items

          dessertHeader.addEventListener("click", function () {
            //once the user click on the header, it goes to page 4
            console.log(this);
            var id = this.getAttribute("id");

            console.log(id);
            page7handler(id); //pass the id (variable) to page4handler
          });

          mainDiv.appendChild(page6Div); //parent append child
          page6Div.appendChild(dessertHeader); //parent append child
          page6Div.appendChild(dessertImg); //parent append child
          page6Div.appendChild(dessertRecipe); //parent append child
        }

        // cuisineHeader.addEventListener('click',page4handler)
      });
  }
  getRecipeName(); //call the getRecipeName function
}

//the function is handling the page3
function page7handler(id) {
  page2Div.style.display = "none"; //hide page 2
  page3Div.style.display = "none"; //hide page 3
  page4Div.style.display = "none"; //hide page 4
  page5Div.style.display = "none"; //hide page 5
  page6Div.style.display = "none"; //hide page 6

  page7Div.setAttribute("class", "page-7"); //create page 7

  var dessertHeader = document.createElement("h2"); //create element
  var dessertImg = document.createElement("img"); //create element
  var dessertRecipe = document.createElement("p"); //create element
  var dessertVideo = document.createElement("div"); //create element
  var favoriteBtn = document.createElement("button"); //creates the favorite ❤ button
  favoriteBtn.textContent = "Favorite ❤"; //sets favoriteBtn text to 'Favorite ❤'
  favoriteBtn.setAttribute("class", "favorite-btn"); //sets favoriteBtn class to favorite-btn

  mainDiv.appendChild(page7Div); // parent append child
  page7Div.appendChild(dessertHeader); // parent append child
  page7Div.appendChild(favoriteBtn); // appends favorite button to the header
  page7Div.appendChild(dessertImg); // parent append child
  page7Div.appendChild(dessertRecipe); // parent append child
  //page7Div.appendChild(dessertVideo);

  var dessertRecipeInfoUrl =
    "https://api.spoonacular.com/recipes/" +
    id +
    "/information?" +
    "&apiKey=" +
    spoonApiKey; //spoonacular API

  //fetch request for spoonacular API
  fetch(dessertRecipeInfoUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (dessertRecipeInfo) {
      console.log(dessertRecipeInfo);
      dessertHeader.textContent = dessertRecipeInfo.title; //add textContent to the header, recipeInfo.title will return the name of the recipe
      console.log(dessertHeader.innerText)
      var dessertName = dessertHeader.innerText
      console.log(dessertName)
      dessertImg.src = dessertRecipeInfo.image; //add image to the image HTML, recipeInfo.image will return the src link
      dessertRecipe.innerHTML = dessertRecipeInfo.summary; // add innerHTML to the body, recipeInfo.summary will return the text summary of the recipe

      var youTubeApiKey = "AIzaSyCPVbJouFqqk56R4EteKzKMhY703BMSE_M"; //youtube API key
      var youTubeUrlDessert =
        "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" +
        dessertName +
        "&key=" +
        youTubeApiKey; // maxResults = 1 will return 1 video, q = cuisineHeader.textContent will return the video based on the recipe name

      console.log(youTubeUrlDessert)
      console.log(dessertHeader.textContent); //could remove later

      //fetch request for youTubeApi
      fetch(youTubeUrlDessert)
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
          dessertVideo.innerHTML = obj.video.value; // add the obj.video.value to cusineVideo
          page7Div.appendChild(dessertVideo); //parent append child
        });
    });

  //! When favorite button clicked --> save name of the recipe to local storage (recipe name, recipe name)
  favoriteBtn.addEventListener("click", function () {
    console.log("favorite button clicked!"); //working
    var recipeFavorite = dessertHeader.textContent;
    console.log(dessertRecipeFavorite);
    localStorage.setItem(dessertRecipeFavorite, dessertRecipeFavorite);
  });
}

