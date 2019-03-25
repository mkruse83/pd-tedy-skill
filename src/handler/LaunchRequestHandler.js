module.exports = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(
        "Hallo. Ich kann dir Cocktails zubereiten. Dafür kannst du mich nach Geschmacksrichtungen wie " +
          "zum Beispiel süß oder fruchtig fragen. Du kannst mich aber auch nach einem Cocktail mit Namen fragen."
      )
      .reprompt("Was für einen Cocktail möchtest du?")
      .getResponse();
  }
};
