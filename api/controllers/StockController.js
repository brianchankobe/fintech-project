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
        if (req.method == "GET") return res.view('stock/search', { my_api: api_key.apiKey });

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
            return res.view("stock/detail");
        }
    },

    // action - create
    candlestick: async function (req, res) {
        // const fetch = require("node-fetch");
        if (req.method == "GET") {
            return res.view("stock/candlestick");
        }
    },

    //stock Recommendation Trends chart
    rcmd: async function (req, res) {
        // const fetch = require("node-fetch");
        if (req.method == "GET") {
            return res.view("stock/recommend");
        }
    },
};
