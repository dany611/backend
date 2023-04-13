const propertyTypes = {
  Villa: 1,
  Shop: 2,
  Masia: 3,
  Apartment: 4,
  Plot: 5,
  Hotel: 6,
  SemiDetached: 7,
  Restaurant: 8,
};

const propertySaleType = {
  Sale: 1,
  Rent: 2,
};

const propertyVisibleType = {
  Available: 1,
  Featured: 2,
  ShowPortals: 3,
};

const propertySoldStatus = {
  Sold: 1,
  UnSold: 2,
};

const propertyTypesReverseMap = {
  [propertyTypes.Villa]: 'Villa',
  [propertyTypes.Shop]: 'Shop',
  [propertyTypes.Masia]: 'Masia',
  [propertyTypes.Apartment]: 'Apartment',
  [propertyTypes.Plot]: 'Plot',
  [propertyTypes.Hotel]: 'Hotel',
  [propertyTypes.SemiDetached]: 'SemiDetached',
  [propertyTypes.Restaurant]: 'Restaurant',
};

const propertySaleTypeReverseMap = {
  [propertySaleType.Sale]: 'Sale',
  [propertySaleType.Rent]: 'Rent',
};

module.exports = {
  propertyTypes,
  propertySaleType,
  propertyVisibleType,
  propertySoldStatus,
  propertySaleTypeReverseMap,
  propertyTypesReverseMap
};
