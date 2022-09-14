const { request, response } = require("express");
const express  = require("express");
const subscriber = require("../model/subscriber");
const router = express.Router()
const Subscriber = require("../model/subscriber")


// a route for Getting all articles
router.get("/", async function(req, res) {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({message: err.message })
    }
});



// a route for Reading/getting a particular articles
router.get("/:id", getSubscriber, (req, res) => {
    res.json(res.subscriber)
    // res.send(res.subscriber.name) this code is used to get the json name by just using the id
});



// a route for Creating all articles
router.post("/", async function(req, res) {
    const subscriber = new Subscriber ({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    });

    try {
        const newSubscriber =  await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
});



// a route for Updating all articles
router.patch("/:id", getSubscriber, async (req, res) =>{
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
});



// a route for Deleting all articles
router.delete("/:id", getSubscriber, async(req, res) => {
    try {
        await res.subscriber.remove()
        res.json({message: "Deleted subscriber successfully"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});



//from here route(READING, UPDATING AND DELETING an articlce carries the same block of code,)
// so we passed in all the code in a single blocked to be executed called "A MIDDLE-WARE"

async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({message: "cannot find subscriber"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.subscriber = subscriber
    next()
}





// this exporting our subscribers routers to our app.js
module.exports = router