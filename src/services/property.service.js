const httpStatus = require('http-status');
const { Property } = require('../models');
const ApiError = require('../utils/ApiError');

const createProperty = async (eventBody, currentUser) => {
  const property = new Property(eventBody);
  property.user = currentUser;
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

module.exports = {
  createProperty,
  getProperties,
};