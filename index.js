//Global Variables
let recipeData;
let currentRecipe;
let addRecipe=false;

// initial fetch
fetch ("http://localhost:3000/menu")
 .then(response => response.json())
 .then(json=>{
    recipeData=json;
    recipeData.forEach(recipe=>{
        displayNameInNav(recipe);
    })
    showRecipeCard(recipeData[0]);

 })

 //generate left side info, creates list items for recipes

 function displayNameInNav(recipe){

    let deleteBtn=document.createElement('button');
    deleteBtn.textContent='X';
    let recipeList = document.querySelector('.recipe-list');
    let recipeTitle = document.createElement("li");
    let span=document.createElement('span')
    span.textContent=recipe.name;
    recipeTitle.append(span);
    recipeList.append(recipeTitle);
    if(recipe.id>5)
    {  
        recipeTitle.append(deleteBtn);
    }
  
    span.addEventListener("click", () => {
        document.querySelector('#comment-list').textContent='';
        document.querySelector('#recipe-ingredients').textContent='';
        document.querySelector('#recipe-instructions').textContent='';
        showRecipeCard(recipe);
    })
    span.addEventListener("mouseover",(e) => {
        e.target.style.color = "white";
    })
    span.addEventListener("mouseout",(e) => {
        e.target.style.color = "black";
    })

    deleteBtn.addEventListener('click', ()=>recipeTitle.remove())
 }

 //shows info for recipes on right side (on click)

function showRecipeCard(recipe){

    currentRecipe=recipe;
    let recipeName = document.querySelector("#title");
    let recipeImage = document.querySelector("#recipe-image");
    let recipeIngredients = document.querySelector("#recipe-ingredients");
    let recipeInstructions = document.querySelector("#recipe-instructions");
    let recipeSource = document.querySelector("#recipe-source");
    let recipeLikes = document.querySelector("#likes-section")
    let recipeComments = document.querySelector("#comment-print");
    let commentlist = document.querySelector("#comment-list");

    recipeName.textContent=recipe.name;
    recipeImage.src=recipe.image;
    recipe.ingredients.forEach(thing=>{
        let t = document.createElement("li");
        t.textContent=thing;
        recipeIngredients.append(t)
    })
    recipe.directions.forEach(step=>{
        let s = document.createElement("p");
        s.textContent=step;
        recipeInstructions.append(s)
    })
    recipeSource.href=recipe.source;
    recipe.comments.forEach(comment=>{
        let c = document.createElement("li");
        c.textContent=comment;
        commentlist.append(c)
    });
    recipeLikes.textContent=`${recipe.likes} likes`;
}

//adds event listener to like button

document.querySelector("#likes-button").addEventListener("click", () => addLike(currentRecipe));

//patches number of likes on 'click' like button 

function addLike(currentRecipe){
    currentRecipe.likes+=1;
    return fetch(`http://localhost:3000/menu/${currentRecipe.id}`,{
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
    },
    body: JSON.stringify(currentRecipe)
    })
    .then(response => response.json())
    .then(updated=>{ 
        document.querySelector("#likes-section").textContent=`${updated.likes} likes`;
})
}

//patches comments on 'submit' button comment section

function addComment(currentRecipe){
    return fetch(`http://localhost:3000/menu/${currentRecipe.id}`,{
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
    },
    body: JSON.stringify(currentRecipe)
    })
    .then(response => response.json())
    .then(updated=>{ 
        let commentSection = document.querySelector("#comment-list");
        let note = document.createElement("li");
        note.textContent = updated.comments.slice(-1);
        commentSection.append(note);
    })
}

//handles submit, updates commet array and invokes addComment() for the patch

function handleSubmitNewComment(event) {
    event.preventDefault();
    const newComment = event.target[0].value;
    currentRecipe.comments.push(newComment);
    addComment(currentRecipe);
    event.target.reset()
}

// adds event listener to comment submit buttons 

let commentForm = document.querySelector("#comment-form");
commentForm.addEventListener('submit', (event)=> handleSubmitNewComment(event))



////////////////////////////////////////
// Adds click to add new recipe button
///////////////////////////////////////

document.querySelector("#new-recipe-button").addEventListener('click',()=>
{
    addRecipe=!addRecipe;
    if (addRecipe)
    {
        document.querySelector('#container').style.display='block';
        document.querySelector('#recipe-form').addEventListener('submit',(e)=>
        {
            e.preventDefault();
            let newRecipe=
            {
                name:e.target[0].value,
                image: e.target[3].value, 
                // if there is time, add default image
                ingredients: e.target[1].value.split(`\\`),
                directions: e.target[2].value.split(`\\`),
                source: e.target[4].value,
                likes: 0,
                comments: []
            }
            addNewRecipe(newRecipe);
        })
    }
    else 
    {
        document.querySelector('#container').style.display='none';
    }
})

//posts new recipe on 'submit' 

function addNewRecipe(recipe)
{
    console.log(recipe);
    fetch('http://localhost:3000/menu', 
    {
        method: 'POST',
        headers:
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    })
    .then(res=>res.json())
    .then(newCard=>
        {
            displayNameInNav(newCard);
        })
}



