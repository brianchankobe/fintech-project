/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  //'/': { view: 'pages/homepage' },
  //'/test': { view: 'test/test1' },
  //'/': { view: 'pages/homepage' },

  //market news
  "GET /": "StockController.marketnews",
  "GET /marketnews": "StockController.marketnews",

  //create stock model for getting info of stock
  "GET /stock/search": "StockController.search",
  "POST /stock/": "StockController.search",

  //stock detail page
  "GET /stock/detail/:sym": "StockController.detail",
  //stock detail page(new)
  "GET /stock/detail_2/:sym": "StockController.detail_2",

  //stock candlestick chart
  "GET /stock/candlestick": "StockController.candlestick",

  //stock Recommendation Trends chart
  "GET /stock/rcmd": "StockController.rcmd",

  //user login and logout route
  "POST /user/login": "UserController.login",
  "GET /user/logout": "UserController.logout",

  //stock order creation
  "POST /order/": "StockController.create",

  /*show the user information and selected and traded stock*/
  //'GET /stock/:id/consultants': 'StockController.populate',
<<<<<<< HEAD
  "GET /user/clients": "UserController.searchValidOrder",
  "POST /user/clients": "UserController.searchValidOrder",
=======
  'GET /user/clients': 'UserController.populate',
  'POST /user/clients': 'UserController.populate',

>>>>>>> 51657682f0b50d2b4790711752e060778f4a89a1

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
