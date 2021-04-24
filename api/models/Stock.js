/**
 * Stock.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    symbolTitle: {
      type: "string",
    },

    price: {
      type: "number",
    },

    volume: {
      type: 'number',
    },

    totalRevenue: {
      type: "number",
      defaultsTo: 0
    },

    totalCost: {
      type: "number",
<<<<<<< HEAD
      defaultsTo: 0
    },

    totalVolume: {
      type: "number",
      defaultsTo: 0
=======
      defaultsTo: 0,
>>>>>>> trading function basic finished and need to be optimized
    },

    valid: {
      type: "number",
      isIn: [0, 1],
      defaultsTo: 0,
    },

    category: {
      type: "string",
    },

    datetime: {
      type: "string",
    },

    consultants: {
      collection: 'User',
      via: 'clients',
    },

  },

};

