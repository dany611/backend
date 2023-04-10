const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { propertyService } = require('../services');

const data = require('../data/properties.json');

const createProperty = catchAsync(async (req, res) => {
  const property = await propertyService.createProperty(req.body, req.user);
  res.status(httpStatus.CREATED).send(property);
});

const getProperties = catchAsync(async (req, res) => {
  const result = await propertyService.getProperties(req.query);
  res.send(result);
});

const getProperty = catchAsync(async (req, res) => {
  const property = await propertyService.getPropertyById(req.params.propertyId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property not found');
  }
  res.status(200).json({ property });
});

const deleteProperty = catchAsync(async (req, res) => {
  await propertyService.deletePropertyById(req.params.propertyId, req.user);
  return res.json({ message: 'deleted' }).status(httpStatus.NO_CONTENT);
});

const updateProperty = catchAsync(async (req, res) => {
  const property = await propertyService.updatePropertyById(req.params.propertyId, req.body, req.user);
  res.send(property);
});

const getPropertyAnalytics = catchAsync(async (req, res) => {
  const result = await propertyService.getPropertyAnalytics();
  res.json(result);
});

const getPropertyPDF = catchAsync(async (req, res) => {
  const result = await propertyService.getPropertyPDF(req.params.propertyId);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(`Content-Disposition`, `attachment; filename="property_detail.pdf"`);
  res.send(result);
});

module.exports = {
  createProperty,
  getProperties,
  getProperty,
  deleteProperty,
  updateProperty,
  getPropertyAnalytics,
  getPropertyPDF,
};
