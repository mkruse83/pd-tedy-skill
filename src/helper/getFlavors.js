const flavorOnePath =
  flavorSlotPath + "resolutions.resolutionsPerAuthority[0].values[0].value.id";
const flavorTwoPath =
  flavorSlotPath + "resolutions.resolutionsPerAuthority[0].values[1].value.id";

module.exports = handlerInput => {
  let flavorOneId = _.get(handlerInput, flavorOnePath);
  let flavorTwoId = _.get(handlerInput, flavorTwoPath);

  // handle special flavors
  if (flavorOneId === "sweetsour") {
    flavorOneId = "sweet";
    flavorTwoId = "sour";
  }

  // construct flavor array
  const flavors = [];
  if (flavorOneId) {
    flavors.push(flavorOneId);
  }
  if (flavorTwoId) {
    flavors.push(flavorTwoId);
  }
  return flavors;
};
