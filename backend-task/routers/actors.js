const {Actor, validate} = require('../models/actors');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res)=>{
   const actors = await Actor.find().sort('name');
   res.send(actors)
});

router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let actor = new Actor({
        name: req.body.name,
        birthday: req.body.birthday,
        country: req.body.country
    });
    actor = await actor.save();
    res.send(actor);
});

module.exports = router;