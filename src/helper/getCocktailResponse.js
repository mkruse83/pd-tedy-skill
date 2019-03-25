const _ = require("lodash");
const cocktailService = require("../backend/cocktailService");

module.exports = (handlerInput, cocktail) => {
  const ingredients = (cocktail.ingredientDescriptors || []).map(
    ingredientDesc => {
      let amountString = "etwas";
      if (ingredientDesc.amountInML > 200) {
        amountString = "viel";
      } else if (ingredientDesc.amountInML < 100) {
        amountString = "ein wenig";
      }
      return amountString + " " + _.get(ingredientDesc, "ingredient.name");
    }
  );
  const lastIngredient = ingredients.splice(-1, 1);
  const mergedIngredients = ingredients.join(", ");
  let output =
    "Ich habe den Cocktail " +
    cocktail.name +
    " gefunden. Er enthält " +
    mergedIngredients +
    " und " +
    lastIngredient +
    ". Soll ich ihn dir mixen?";

  if (ingredients.length === 0) {
    output =
      "Ich habe den Cocktail " +
      cocktail.name +
      " gefunden. Er enthält " +
      lastIngredient +
      ". Soll ich ihn dir mixen?";
  }
  cocktailService.setCurrentCocktail(cocktail.id);
  return handlerInput.responseBuilder
    .speak(output)
    .reprompt("Soll ich " + cocktail.name + " zubereiten?")
    .addConfirmIntentDirective()
    .getResponse();
};
