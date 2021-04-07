/**
 * StockController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c0n56d748v6v1q0c1ph0"; // Replace this
const finnhubClient = new finnhub.DefaultApi();


module.exports = {

    // action - create
    search: async function (req, res) {

        if (req.method == "GET") return res.view('stock/search');

        if (req.wantsJSON) {  //ajax
            var symbol_res = finnhubClient.stockSymbols(req.body.exchange, (error, data, response) => {
                return res.json(data);
            });

            
        } else {
            res.redirect("/stock/search")
        }

        /*if (req.wantsJSON) { //ajax call

            var stock = await Stock.create(req.body).fetch();

            //status 201: created
            return res.status(201).json({ id: stock.id });
        } else { // normal call
            res.redirect('/stock/search');
        }*/
    },

};

