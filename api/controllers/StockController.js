/**
 * StockController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // action - create
  search: async function (req, res) {
    if (req.method == "GET") return res.view("stock/search");

    /*if (req.wantsJSON) { //ajax call

            var stock = await Stock.create(req.body).fetch();

            //status 201: created
            return res.status(201).json({ id: stock.id });
        } else { // normal call
            res.redirect('/stock/search');
        }*/
  },

  // action - create
  detail: async function (req, res) {
    // const fetch = require("node-fetch");
    if (req.method == "GET") {
      //   //fetch company profile
      //   async function stockProfile(symbol) {
      //     const response = await fetch(
      //       "https://finnhub.io/api/v1/stock/profile2?symbol=" +
      //         symbol +
      //         "&token=c0ro5sv48v6voi2d8ndg"
      //     );
      //     let data = await response.json();
      //     console.log(data);
      //   }
      //   // stockProfile("BINANCE:BTCUSDT");
      //   stockProfile("AAPL");

      return res.view("stock/detail");
    }
  },
};
