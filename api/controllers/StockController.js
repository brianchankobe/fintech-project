/**
 * StockController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c0n56d748v6v1q0c1ph0"; // Replace this
//const finnhubClient = new finnhub.DefaultApi();

//const request = require('request');

module.exports = {

    // action - create
    search: async function (req, res) {

        if (req.method == "GET") return res.view('stock/search', {my_api: api_key.apiKey});

        /*if (req.wantsJSON) {  //ajax

            //get all related symbols from exchange code
            //var data = finnhubClient.stockSymbols(req.body.exchange)
        } else {
            res.redirect("/stock/search");
        }*/

    },

};

