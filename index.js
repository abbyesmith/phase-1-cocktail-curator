fetch("http://localhost:3000/menu")
 .then(response => response.json())
 .then(menuData=>{
    displayTitles(menuData);
 })
 //TEST HERE
 //function to get list of recipes
 function displayTitles(menuData){
    menuData.forEach(recipe=>{
        let li=document.createElement('li');
        li.textContent=recipe.name;
        document.querySelector('#recipes').append(li);
        li.addEventListener('click',()=>getCard(recipe))
    })
 }
//function to display recipe card
function getCard(recipe){
    document.querySelector('h4').textContent=recipe.name;
}