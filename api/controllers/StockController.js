/**
 * StockController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const finnhub = require("finnhub");
const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "c0n56d748v6v1q0c1ph0"; // Replace this

module.exports = {

    // action - create
    search: async function (req, res) {
        if (req.method == "GET") return res.view('stock/search', { my_api: api_key.apiKey });
    },

    // action - create
    detail: async function (req, res) {
        // const fetch = require("node-fetch");
        if (req.method == "GET") {
            return res.view("stock/detail_2", { stockSymbol: req.params.sym });
        }
    },

    // action - detail_2
    //detail_2: async function (req, res) {
    //    // const fetch = require("node-fetch");
    //    if (req.method == "GET") {
            // return res.view("stock/detail", { stockSymbol: req.params.sym });
    //        return res.view("stock/detail_2", { stockSymbol: req.params.sym });
    //    }
    //},

    // action - create stock order
    create: async function (req, res) {
        if (req.wantsJSON) { //ajax call

            //check if user exists order that can still be processed
            var thatUser = await User.findOne(req.session.usrid).populate("clients", { symbolTitle: req.body.symbolTitle, valid: 0 });
            //console.log(thatUser);
            if (!thatUser) return res.status(404).json("User not found");

            if (req.body.category == "buy") {
                /* Buy Function */
                
                //check if user have valid order
                if (thatUser.clients.length == 0) { //user's valid order about this stock not exist
                    //console.log("no client");
                    if (thatUser.balances >= 25000 && thatUser.tradeStatus == 1) {  //用户余额大于25000， 交易状态为1 （表示账户可进行交易）  无限次T+0交易

                        if (thatUser.balances >= parseFloat(req.body.totalCost)) { //余额是否足够支付

                            //create new order for stock buying
                            var order = await Stock.create(req.body).fetch();

                            //set the first order prices (方便后期计算收益)
                            var updatedOrder = await Stock.updateOne({
                                where: {
                                    id: order.id
                                }
                            }).set({ totalVolume: parseFloat(req.body.volume) });

                            //add association with User
                            await User.addToCollection(req.session.usrid, "clients").members(updatedOrder.id);

                            //update User balance of money (资产 = 旧资产 + （新投资价值 - 总成本）)
                            var updatedUser = await User.updateOne({
                                where: {
                                    balances: thatUser.balances,
                                    id: req.session.usrid,
                                }
                            }).set({ balances: Math.round((thatUser.balances - parseFloat(req.body.price) * parseFloat(req.body.volume)) * 100) / 100, assets: Math.round((thatUser.assets +  parseFloat(req.body.price) * parseFloat(req.body.volume)) * 100) /100 });

                            //如果用户余额小于25000， 开始限制最大T+0买股票次数
                            if (updatedUser.balances < 25000) {
                                //update User TradeCount to be 4 ()
                                updatedUser = await User.updateOne({
                                    where: {
                                        balances: updatedUser.balances,
                                        id: req.session.usrid,
                                    }
                                }).set({ tradeCount: 4 });
                            }

                            //var user_test = await User.findOne(req.session.usrid).populate("clients");
                            //console.log(" > 25000, tradestatus == 1");
                            //console.log(user_test);

                            return res.json("Success Buy");

                        } else {
                            return res.json("your balance is not enough");
                        }

                    } else if (thatUser.balances < 25000 && thatUser.tradeStatus == 1) {  //用户余额小于25000， 交易状态为1 （表示账户可进行交易） 可进行4次T+0交易

                        if (thatUser.balances >= parseFloat(req.body.totalCost) && thatUser.tradeCount > 0) {

                            //create new order for stock buying
                            var order = await Stock.create(req.body).fetch();

                            //set the first order prices (方便后期计算收益)
                            var updatedOrder = await Stock.updateOne({
                                where: {
                                    id: order.id
                                }
                            }).set({ totalVolume: parseFloat(req.body.volume) });

                            //add association with User
                            await User.addToCollection(req.session.usrid, "clients").members(updatedOrder.id);

                            //update User balance of money, tradeCount倒减
                            var updatedUser = await User.updateOne({
                                where: {
                                    balances: thatUser.balances,
                                    id: req.session.usrid,
                                }
                            }).set({ balances: Math.round((thatUser.balances - parseFloat(req.body.price) * parseFloat(req.body.volume)) * 100) / 100, assets: Math.round((thatUser.assets + parseFloat(req.body.price) * parseFloat(req.body.volume)) * 100) /100, tradeCount: thatUser.tradeCount - 1 });

                            //购买完后抵达交易限制， 冻结账户
                            if (updatedUser.tradeCount == 0) {
                                updatedUser = await User.updateOne({
                                    where: {
                                        tradeCount: updatedUser.tradeCount,
                                        id: req.session.usrid,
                                    }
                                }).set({ tradeStatus: 0 });
                            }

                            //var user_test = await User.findOne(req.session.usrid).populate("clients");
                            //console.log(" < 25000, tradestatus == 1");
                            //console.log(user_test);

                            return res.json("Success Buy and tradeStatus" + updatedUser.tradeStatus);
                        } else {
                            return res.json("Sorry, you may have no enough money or your buying limitation is reaching");
                        }

                    } else {  //余额 < 25000, 交易状态：0
                        return res.json("user balance is less than 25000 and your account is locked because your count of limitation of trading is already zero. ");
                    }

                } else {    //user's valid order exist (valid = 0)
                    console.log("have clients");
                    if (thatUser.balances >= 25000 && thatUser.tradeStatus == 1) {  //用户余额大于25000， 交易状态为1 （表示账户可进行交易）  无限次T+0交易

                        if (thatUser.balances >= parseFloat(req.body.totalCost)) {  //余额是否足够

                            //find that order and change value of order
                            var order = await Stock.findOne(thatUser.clients[0].id);
                            var updatedOrder = await Stock.updateOne({
                                where: {
                                    id: order.id
                                }
                            }).set({ volume: parseFloat(req.body.volume), totalCost: Math.round((order.totalCost + parseFloat(req.body.totalCost)) * 100 ) / 100, price: parseFloat(req.body.price), totalVolume: parseFloat(req.body.volume) + order.totalVolume,category: req.body.category, datetime: req.body.datetime });

                            //update User balance of money (资产 = 旧资产 + （新投资价值 - 总成本）)
                            var updatedUser = await User.updateOne({
                                where: {
                                    balances: thatUser.balances,
                                    id: req.session.usrid,
                                }
                            }).set({ balances: Math.round((thatUser.balances - parseFloat(req.body.price) * parseFloat(req.body.volume)) * 100) / 100, assets: Math.round((thatUser.assets + parseFloat(req.body.price) * parseFloat(req.body.volume)) * 100) /100 });

                            //如果用户余额小于25000， 开始限制最大T+0买股票次数
                            if (updatedUser.balances < 25000) {
                                //update User TradeCount to be 4 ()
                                updatedUser = await User.updateOne({
                                    where: {
                                        balances: updatedUser.balances,
                                        id: req.session.usrid,
                                    }
                                }).set({ tradeCount: 4 });
                            }

                            //var user_test = await User.findOne(req.session.usrid).populate("clients");
                            //console.log(">=25000, tradestatus == 1")
                            //console.log(user_test);

                            return res.json("Success Buys");

                        } else {
                            return res.json("your balance is not enough");
                        }

                    } else if (thatUser.balances < 25000 && thatUser.tradeStatus == 1) {  //用户余额小于25000， 交易状态为1 （表示账户可进行交易） 可进行4次T+0交易

                        if (thatUser.balances >= parseFloat(req.body.totalCost) && thatUser.tradeCount > 0) {  //余额是否足够，交易次数限制是否满足
                            //find that order and change value of order
                            var order = await Stock.findOne(thatUser.clients[0].id);
                            var updatedOrder = await Stock.updateOne({
                                where: {
                                    id: order.id
                                }
                            }).set({ volume: parseFloat(req.body.volume), totalCost: Math.round((order.totalCost + parseFloat(req.body.totalCost)) * 100 ) / 100, price: parseFloat(req.body.price), totalVolume: parseFloat(req.body.volume) + order.totalVolume, category: req.body.category, datetime: req.body.datetime });

                            //update User balance of money and tradeCount of user - 1
                            var updatedUser = await User.updateOne({
                                where: {
                                    balances: thatUser.balances,
                                    id: req.session.usrid,
                                }
                            }).set({ balances: Math.round((thatUser.balances - parseFloat(req.body.price) * parseFloat(req.body.volume)) * 100) / 100, assets: Math.round((thatUser.assets + parseFloat(req.body.price) * parseFloat(req.body.volume)) * 100) /100, tradeCount: thatUser.tradeCount - 1 });

                            //购买完后抵达交易限制， 冻结账户
                            if (updatedUser.tradeCount == 0) {
                                updatedUser = await User.updateOne({
                                    where: {
                                        tradeCount: updatedUser.tradeCount,
                                        id: req.session.usrid,
                                    }
                                }).set({ tradeStatus: 0 });
                            }

                            //var user_test = await User.findOne(req.session.usrid).populate("clients");
                            //console.log("<25000, tradestatus == 1");
                            //console.log(user_test);

                            return res.json("Success buy and tradestatus: " + updatedUser.tradeStatus);

                        } else {
                            return res.json("Sorry, you may have no enough money or your buying limitation is reaching");
                        }

                    } else {
                        return res.json("user balance is less than 25000 and your account is locked because your count of limitation of trading is already zero. ");
                    }
                }
            } else {  //sell part
                if (thatUser.clients.length != 0) {  //用户持有股份可卖
                    //order volume >= input volume
                    if (thatUser.clients[0].totalVolume >= parseFloat(req.body.volume)) {

                        //如果卖股数和持有股数持平， 清空股票订单，作废
                        if (thatUser.clients[0].totalVolume == parseFloat(req.body.volume)) {
                            var order = await Stock.findOne(thatUser.clients[0].id);

                            //update order for setting valid to be 1 (invalid order)
                            var updatedOrder = await Stock.updateOne({
                                where: {
                                    id: order.id,
                                }
                            }).set({ valid: 1, volume: parseFloat(req.body.volume), totalRevenue: Math.round((order.totalRevenue + parseFloat(req.body.totalRevenue)) * 100) /100, price: parseFloat(req.body.price), totalVolume: order.totalVolume - parseFloat(req.body.volume), category: req.body.category, datetime: req.body.datetime });

                            var updatedUser = await User.updateOne({
                                where: {
                                    id: req.session.usrid,
                                }
                            }).set({ balances: Math.round((thatUser.balances + parseFloat(req.body.totalRevenue)) * 100) / 100, assets: Math.round((thatUser.assets - parseFloat(req.body.totalRevenue)) * 100) / 100 });

                            if (updatedUser.balances >= 25000) {
                                updatedUser = await User.updateOne({
                                    where: {
                                        id: req.session.usrid,
                                    }
                                }).set({ tradeStatus: 1, tradeCount: 4 });
                            }

                            //var user_test = await User.findOne(req.session.usrid).populate("clients");
                            //console.log(" order volume == input volume ");
                            //console.log(user_test);

                            return res.json("success sell, and all the stock were sold out. ");

                        } else {   //如果持有大于要卖股数
                            var order = await Stock.findOne(thatUser.clients[0].id);

                            //update order for setting valid to be 1 (invalid order)
                            var updatedOrder = await Stock.updateOne({
                                where: {
                                    id: order.id,
                                }
                            }).set({ volume: parseFloat(req.body.volume), totalRevenue: Math.round((order.totalRevenue + parseFloat(req.body.totalRevenue)) * 100) /100, price: parseFloat(req.body.price), totalVolume: order.totalVolume - parseFloat(req.body.volume), category: req.body.category, datetime: req.body.datetime });

                            var updatedUser = await User.updateOne({
                                where: {
                                    id: req.session.usrid,
                                }
                            }).set({ balances: Math.round((thatUser.balances + parseFloat(req.body.totalRevenue)) * 100) / 100, assets: Math.round((thatUser.assets - parseFloat(req.body.totalRevenue)) * 100) / 100 });

                            if (updatedUser.balances >= 25000) {
                                updatedUser = await User.updateOne({
                                    where: {
                                        id: req.session.usrid,
                                    }
                                }).set({ tradeStatus: 1, tradeCount: 4 });
                            }


                            //var user_test = await User.findOne(req.session.usrid).populate("clients");
                            //console.log(" order volume > input volume");
                            //console.log(user_test);
                            return res.json("success sell");
                        }

                    } else {
                        return res.json("You have no enough stock volume that can be sold. ");
                    }
                } else {
                    return res.json("No Stock Volume can be sold.");
                }
            }

        } else { // normal call
            res.redirect('/stock/detail/' + req.body.symbolTitle);
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

    //stock marketnews
    marketnews: async function (req, res) {
        // const fetch = require("node-fetch");
        if (req.method == "GET") {
            return res.view("stock/marketnews");
        }
    },
};
