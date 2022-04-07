import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';


// import icons from '../img/icons.svg'; // parcel 1
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';

// if(module.hot){
//   module.hot.accept();
// }

// // https://forkify-api.herokuapp.com/v2

// ///////////////////////////////////////


const controlRecipe = async function(){
  try{
    //1) Loading recipe
    const id = window.location.hash.slice(1);
    
    if(!id) return;
    recipeView.renderSpinner();

    //Update results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

//Loading the recipe
// console.log(recipe.image)
   await model.loadRecipe(id);
  


    //Rendering recipe
  recipeView.render(model.state.recipe);

  }catch(err){
console.error(err);
recipeView.renderError();
}
}

const controlSearchResults = async function()
{
  try{
//Get search query
resultsView.renderSpinner();
    const query = searchView.getQuery();
    if(!query) return;
 //Load search query   
 await model.loadSearchResults(query);

 //Render results

  resultsView.render(model.getSearchResultsPage());

  //Render the inition pagination buttons
  paginationView.render(model.state.search)
  }catch(err){
    console.log(err)
  }
}

const controlPagination = function(gotoPage){
  resultsView.render(model.getSearchResultsPage(gotoPage));

  paginationView.render(model.state.search)
}

 const controlServings = function(newServings){
  //Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}


const controlAddbookmark = function(){
  //Add or remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else
    model.deleteBookmark(model.state.recipe.id);
  
  
  ///Update recipe view
  recipeView.update(model.state.recipe);

  //Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe){
  // console.log(newRecipe);
  try{
  //Show loading spinner
  addRecipeView.renderSpinner();
    //Upload the new recipe data
  await  model.uploadRecipe(newRecipe);
  console.log(model.state.recipe);
  //Render recipe 
  recipeView.render(model.state.recipe);
  
  //Sucess message 
  addRecipeView.renderMessage();

  // Render bookmarkView
  bookmarksView.render(model.state.bookmarks);

  // Change id in the url

  window.history.pushState(null, '', `#${model.state.recipe.id}`)

  // Close form window
  setTimeout(function(){
    addRecipeView.toggleWindow()
  }, MODAL_CLOSE_SEC * 1000)
  }catch(err){
    console.error(err, '.l.l');
    addRecipeView.renderError(err.message);
  }
}

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddbookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
 
}

init();
