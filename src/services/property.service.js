const httpStatus = require('http-status');
const { propertySoldStatus,propertySaleType, propertyVisibleType, propertyTypes } = require('../config/property');
const { propertySoldStatus } = require('../config/property');
const { Property } = require('../models');
const ApiError = require('../utils/ApiError');

const createProperty = async (eventBody, currentUser) => {
  const property = new Property(eventBody);
  property.sold_status = propertySoldStatus.UnSold;
  property.user = currentUser;
  if (!eventBody.owner) {
    property.owner = currentUser;
  }
  return property.save();
};

const getProperties = async (params) => {
  const { page = 1, limit = 20, ...data } = params;

  const skip = (page - 1) * limit;
  const filters = {
    ...(data.sale_type && { sale_type: data.sale_type }),
    ...(data.visible_type && { visible_type: data.visible_type }),
    ...(data.type && { type: data.type }),
    ...(data.country && { country: data.country }),
  };
  if (data.reference) {
    filters['amenities.reference'] = data.reference;
  }
  if (data.min_price || data.max_price) {
    filters['for_sale.sale_price'] = {
      ...(data.min_price && { $gte: data.min_price }),
      ...(data.max_price && { $lte: data.max_price }),
    };
  }
  if (data.bedrooms) {
    filters['amenities.beds'] = data.bedrooms;
  }

  const totalProperties = await Property.countDocuments(filters);
  const property = await Property.find(filters).skip(skip).limit(parseInt(limit));

  return { property, totalProperties };
};

const getPropertyById = async (id) => {
  return Property.findById(id);
};

const getPropertyAnalytics=async ()=>{
  let totalProperties=await Property.count({});
  let totalRentProperties=await Property.count({sale_type:propertySaleType.Rent});
  let totalSaleProperties=await Property.count({sale_type:propertySaleType.Sale});
  let totalAvailableProperties=await Property.count({visible_type:propertyVisibleType.Available});
  let totalPropertiesOnPortal=await Property.count({visible_type:propertyVisibleType.ShowPortals});
  let totalFeaturedProperties=await Property.count({visible_type:propertyVisibleType.Featured});
  let totalShopProperties=await Property.count({type:propertyTypes.Shop});
  let totalVillaProperties=await Property.count({type:propertyTypes.Villa});
  let totalPlotProperties=await Property.count({type:propertyTypes.Plot});
  let totalMasiaProperties=await Property.count({type:propertyTypes.Masia});
  let totalAppartmentProperties=await Property.count({type:propertyTypes.Apartment});
  let totalHotelProperties=await Property.count({type:propertyTypes.Hotel});
  let totalSemiDetachedProperties=await Property.count({type:propertyTypes.SemiDetached});
  let totalResturantProperties=await Property.count({type:propertyTypes.Restaurant});

  return {
    totalProperties,
    totalAvailableProperties,
    totalRentProperties,
    totalPlotProperties,
    totalAppartmentProperties,
    totalAppartmentProperties,
    totalAvailableProperties,
    totalHotelProperties,
    totalSaleProperties,
    totalSemiDetachedProperties,
    totalPropertiesOnPortal,
    totalFeaturedProperties,
    totalShopProperties,
    totalVillaProperties,
    totalMasiaProperties,
    totalResturantProperties
  }
}

const deletePropertyById = async (propertyId, currentUser) => {
  const property = await getPropertyById(propertyId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property not found');
  }
  // if (currentUser.id !== property.user.toString()) {
  //   throw new ApiError(httpStatus.FORBIDDEN, 'You can only delete your own properties');
  // }
  await property.remove();
  return property;
};

const updatePropertyById = async (propertyId, updateBody, currentUser) => {
  const property = await getPropertyById(propertyId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property not found');
  }
  // if (currentUser.id !== property.user.toString()) {
  //   throw new ApiError(httpStatus.FORBIDDEN, 'You can only edit your own properties');
  // }
  Object.assign(property, updateBody);
  await property.save();
  return property;
};

module.exports = {
  createProperty,
  getProperties,
  getPropertyById,
  deletePropertyById,
  updatePropertyById,
  getPropertyAnalytics
};
