module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      protect: true,
      required: true
    },

    group: {
      type: 'string',
      required: false
    },
  },
};

