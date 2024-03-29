const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const propertyRoute = require('./property.route');
const eventRoute = require('./event.route');
const mediaRoute = require('./media.route');
const interestedUserRoute =require("./interested_user.route")
const aboutUsRoute =require("./aboutUs.route")
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/property',
    route: propertyRoute,
  },
  {
    path: '/media',
    route: mediaRoute,
  },
  {
    path: '/event',
    route: eventRoute,
  },
  {
    path: '/interested_user',
    route: interestedUserRoute,
  },
  {
    path: '/about_us',
    route: aboutUsRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
