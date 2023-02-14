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
        //showRecipeCard(recipe);
    })
    showRecipeCard(recipeData[0]);
   //displayComments(recipe);

 })

 function displayNameInNav(recipe){
    //console.log("HI");
    let recipeList = document.querySelector('.recipe-list');
    let recipeTitle = document.createElement("li");
    recipeTitle.textContent=recipe.name;
    recipeList.appendChild(recipeTitle);
    recipeTitle.addEventListener("click", () => {
        document.querySelector('#comment-list').textContent='';
        showRecipeCard(recipe);
    })
 }
// function clearPage(){
//     let content = document.querySelector("#comment-list");
//     content.innerHTML = "";
//       }
function showRecipeCard(recipe){

    currentRecipe=recipe;
    //recipe.forEach(comment=>
    let recipeName = document.querySelector("#title");
    let recipeImage = document.querySelector("#recipe-image");
    let recipeIngredients = document.querySelector("#recipe-ingredients");
    let recipeInstructions = document.querySelector("#recipe-instructions");
    let recipeSource = document.querySelector("#recipe-source");
    let recipeComments = document.querySelector("#comment-print");
    let commentlist = document.querySelector("#comment-list");
    //querySelector("#comment-list").remove();

    recipeName.textContent=recipe.name;
    recipeImage.src=recipe.image;
    recipeIngredients.textContent=recipe.ingredients;
    recipeInstructions.textContent=recipe.directions;
    recipeSource.href=recipe.source;
    //console.log(recipe.comments);
    recipe.comments.forEach(comment=>{
        let c = document.createElement("li");
        c.textContent=comment;
        //Adding multiple rows
        commentlist.append(c)
    });
    
    //displayComments(recipe.comments);

}
//1. def var 

//const test = document.querySelector("#title");
//console.log(test);

//function to display comments 
//let commentSection = document.querySelector("#recipe-image");
//console.log(commentSection);

// function displayComments(comments){
//     //console.log(comments),
//     comments.forEach(comment => addComment(comment))
//     //addComment(comments);

// }


function addComment(comment){
    let commentSection = document.querySelector("#comment-list");
    //commentSection.innerHTML = "";
  
    //console.log(commentSection);
   let note = document.createElement("li");
    note.textContent = comment;
    // console.log(commentSection);
    commentSection.append(note);
    
}

function handleSubmitNewComment(event) {
    event.preventDefault();
    const newComment = event.target[0].value;
    addComment(newComment);
    // event.target.reset()
}
let commentForm = document.querySelector("#comment-form");
commentForm.addEventListener('submit', (event)=> handleSubmitNewComment(event))

function newComment(){
    let commentForm = document.querySelector("#comment-form");
    commentForm.addEventListener('submit', (event) => {
        event.preventDefault()
        currentRecipe.comments.push(event.target.value)
    })
}
