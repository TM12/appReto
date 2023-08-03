const express = require('express'),

  usuario = require('./src/controllers/usuario.controller'),
  router = express.Router();

router
    .post('/usuario', usuario.create)
    .get('/usuario', usuario.read)
    .put('/usuario/:id', usuario.update)
    .delete('/usuario/:id', usuario.delete)

module.exports = router;