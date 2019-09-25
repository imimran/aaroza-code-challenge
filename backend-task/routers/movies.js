const express = require('express');
const { Movie, validate} = require('../models/movies');
const { Actor} = require('../models/actors');
const auth = require('../middleware/auth');
const router = express.Router();


router.get('/', auth, async(req, res)=>{
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.post('/', async(req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const actor = await Actor.findById(req.body.actorId);
    if(!actor) return res.status(400).send('Invalid Actors');

    let movie = new Movie({
        title: req.body.title,
        year: req.body.year,
        rating: req.body.rating,
        actor:{
            _id: actor._id,
            name: actor.name,
            birthday: actor.birthday,
            country: actor.country
        },
    });
    movie = await movie.save();
    res.send(movie)
});
module.exports =router;