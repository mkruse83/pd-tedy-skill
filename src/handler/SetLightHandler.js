const _ = require("lodash");
const lightService = require("../backend/lightService");

const lightNamePath = "requestEnvelope.request.intent.slots.lightName.";
const lightNameValuePath =
  lightNamePath + "resolutions.resolutionsPerAuthority[0].values[0].value.id";
const lightStatePath = "requestEnvelope.request.intent.slots.lightState.";
const lightStateValuePath =
  lightStatePath + "resolutions.resolutionsPerAuthority[0].values[0].value.id";

module.exports = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      ["SET_LIGHT_STATE"].indexOf(
        handlerInput.requestEnvelope.request.intent.name
      ) > -1
    );
  },
  async handle(handlerInput) {
    const lightName = _.get(handlerInput, lightNameValuePath);
    const lightState = _.get(handlerInput, lightStateValuePath);
    if (lightName && lightState) {
      await lightService.setLight(lightName, lightState);
      return handlerInput.responseBuilder
        .speak("OK")
        .withShouldEndSession()
        .getResponse();
    } else {
      return handlerInput.responseBuilder
        .speak(
          "Leider ist etwas schief gelaufen. Bitte versuche es später noch einmal."
        )
        .withShouldEndSession()
        .getResponse();
    }
  }
};
