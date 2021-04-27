/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

sails.bcrypt = require('bcryptjs');

module.exports = {
  login: async function (req, res) {
    //if (req.method == "GET") return res.view('user/login');
    if (req.wantsJSON) {
      if (!req.body.username || !req.body.password) return res.badRequest();

      var user = await User.findOne({ username: req.body.username });

      if (!user) return res.status(401).json("User not found");

      var match = await sails.bcrypt.compare(req.body.password, user.password);

      if (!match) return res.status(401).json("Wrong Password");

      // Reuse existing session
      if (!req.session.username) {
        req.session.username = user.username;
        req.session.usrid = user.id;
        req.session.role = user.role;
        return res.json(user);
      }

      // Start a new session for the new login user
      req.session.regenerate(function (err) {
        if (err) return res.serverError(err);

        req.session.username = user.username;
        req.session.usrid = user.id;
        req.session.role = user.role;
        return res.json(user);
      });
    } else {
      res.redirect("/");
    }
  },

  logout: async function (req, res) {
    if (req.wantsJSON) {
      req.session.destroy(function (err) {
        if (err) return res.serverError(err);

        return res.json(req.session);
      });

      //console.log(req.session);
    } else {
      req.session.destroy(function (err) {
        if (err) return res.serverError(err);

        return res.json(req.session);
      });

      res.redirect("/");
    }
  },

  //action: signuo
  signup: async function (req, res) {

    if (req.wantsJSON) {

      if (!req.body.username || !req.body.password) return res.badRequest();

      var user = await User.findOne({ username: req.body.username });

      if (user) return res.status(409).json("User exist");

      var salt = await sails.bcrypt.genSalt(10);
      var hash = await sails.bcrypt.hash(req.body.password, salt);

      var userAccount = await User.create({
        username: req.body.username,
        password: hash,
        role: req.body.role,
        balances: req.body.balances,
        assets: req.body.assets,
        tradeStatus: req.body.tradeStatus,
        tradeCount: req.body.tradeCount,
      }).fetch();

      return res.json(userAccount);

    } else {
      res.redirect('/');
    }

  },

  //action: populate
  populate: async function (req, res) {
    if (req.wantsJSON) {
      //check if user exists order that can still be processed
      var thatUser = await User.findOne(req.session.usrid).populate("clients");

      if (!thatUser) return res.status(404).json("User not found");

      return res.json(thatUser);
    } else {
      //check if user exists order that can still be processed
      var thatUser = await User.findOne(req.session.usrid).populate("clients");

      if (!thatUser) return res.status(404).json("User not found");

      return res.view("user/populate", { user: thatUser });
    }
  },

  //action: populate
  list: async function (req, res) {
    if (req.wantsJSON) {
      //check if user exists order that can still be processed
      var thatUser = await User.findOne(req.session.usrid);

      if (!thatUser) return res.status(404).json("User not found");

      return res.json(thatUser);
    } 
  },

  //action: populate
  populate_2: async function (req, res) {
    if (req.wantsJSON) {
      //check if user exists order that can still be processed
      var thatUser = await User.findOne(req.session.usrid).populate("clients");

      if (!thatUser) return res.status(404).json("User not found");

      return res.json(thatUser);
    } else {
      //check if user exists order that can still be processed
      var thatUser = await User.findOne(req.session.usrid).populate("clients");

      if (!thatUser) return res.status(404).json("User not found");

      return res.view("user/populate_2", { user: thatUser });
    }
  },

  //action: populateOne
  populateOne: async function (req, res) {
    //check if user exists order that can still be processed
    var thatUser = await User.findOne(req.session.usrid).populate("clients", {
      symbolTitle: req.body.symbolTitle,
      valid: 0,
    });

    if (!thatUser) return res.status(404).json("User not found");

    return res.json(thatUser);
  },
};
