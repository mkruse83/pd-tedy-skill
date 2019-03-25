module.exports = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(
        "Ich kann Cocktails für dich machen. Sage mir zum Beispiel: mache einen süßen Cocktail."
      )
      .reprompt("Was möchtest du?")
      .getResponse();
  }
};
