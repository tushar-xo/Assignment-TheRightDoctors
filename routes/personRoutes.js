const express = require('express'); // import express
const personController = require('../controllers/personController'); // routes

const router = express.Router(); // connect router 

router.get('/', 
    personController.handleGetAllPeople
);

router.put('/:id', 
    personController.handleUpdatePerson
);

router.delete('/:id', 
    personController.handleDeletePerson
);

router.post('/', 
    personController.handleCreatePerson
);

module.exports = router;