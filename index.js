// fetch("http://localhost:3000/menu")
//  .then(response => response.json())
//  .then(menuData=>{
//     displayTitles(menuData);
//  })

//  //TEST HERE

//  //function to get list of recipes

//  function displayTitles(menuData){
//     menuData.forEach(recipe=>{
//         let li=document.createElement('li');
//         li.textContent=recipe.name;
//         document.querySelector('#recipes').append(li);
//         li.addEventListener('click',()=>getCard(recipe))
//     })
//  }

// //function to display recipe card

// function getCard(recipe){
//     document.querySelector('h4').textContent=recipe.name;
// }

//Global Variables
let recipeData;
let currentRecipe;
//fetch
fetch ("http://localhost:3000/menu")
 .then(response => response.json())
 .then(json=>{
    recipeData=json;
    recipeData.forEach(recipe=>{
        displayNameInNav(recipe);
    })
    showRecipeCard(recipeData[0]);
 })
 function displayNameInNav(recipe){
    //console.log(“HI”);
    let recipeList = document.querySelector(".recipe-list");
    let recipeTitle = document.createElement('li');
    recipeTitle.textContent=recipe.name;
    recipeList.appendChild(recipeTitle);
    recipeTitle.addEventListener("click”, () => {
        console.log("Hey”)
        showRecipeCard(recipe);
        //displayComments(recipe);
    })
 }
function showRecipeCard(recipe){
    //console.log(‘test’)
    currentRecipe=recipe;
    let recipeName = document.querySelector("#title”);
    let recipeImage = document.querySelector("#recipe-image”);
    let recipeIngredients = document.querySelector("#recipe-ingredients”);
    let recipeInstructions = document.querySelector("#recipe-instructions”);
    let recipeSource = document.querySelector("#recipe-source”);
    displayComments(recipe.comments);
    recipeName.textContent=recipe.name;
    recipeImage.src=recipe.image;
    recipeIngredients.textContent=recipe.ingredients;
    recipeInstructions.textContent=recipe.directions;
    recipeSource.href=recipe.source;
}
const test = document.querySelector(“#title”);
console.log(test);
//function to display comments
let commentSection = document.querySelector(“#recipe-image”);
console.log(commentSection);
function displayComments(comments){
    //console.log(comments),
    comments.forEach(comment => addComment(comment))
}
function addComment(comment){
    //console.log(comment)
    let commentSection = document.querySelector(“#comment-list”);
    console.log(commentSection);
    let note = document.createElement("li”);
    note.textContent = comment;
    // console.log(commentSection);
    commentSection.append(note);
}
function handleSubmitNewComment(event) {
    event.preventDefault()
    const newComment = event.target[0].value
    addComment(newComment)
    event.target.reset()
}







