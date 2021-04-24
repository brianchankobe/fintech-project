/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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
            res.redirect('/');
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

            res.redirect('/');
        }
    },

    //action: searchValidOrder 
    searchValidOrder: async function (req, res) {

        if (req.wantsJSON) {

            //check if user exists order that can still be processed
            var thatUser = await User.findOne(req.session.usrid).populate("clients");
            
            console.log(thatUser);
            if (!thatUser) return res.status(404).json("User not found");

            return res.json(thatUser);
        } else {
            //check if user exists order that can still be processed
            var thatUser = await User.findOne(req.session.usrid).populate("clients");

            if (!thatUser) return res.status(404).json("User not found");

            //console.log(thatUser);

            return res.view('user/populate', { user: thatUser });
        }

    },
};

