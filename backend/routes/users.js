const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

/** This route can be used to add a user. */
router.post('/add', (req, res) => {
    let newUser = new User(req.body);
    newUser.createdDateTime = new Date().toUTCString();

    newUser.save()
           .then(addedUser => {
                res.sendStatus(200);
           })
           .catch(err => {
                console.log(err);
                res.sendStatus(500);
           });
});

/** This route can be used to get all users after filtering and sorting if needed. */
router.post('/', (req, res) => {
    let filterInfo = null;
    let sortCol = null;

    if (req.body.filterInfo != null && req.body.sortCol != null) {
        filterInfo = req.body.filterInfo;
        sortCol = req.body.sortCol;
    }

    let searchObj = {};

    // create filter conditions
    if (filterInfo != null) {
        Object.keys(filterInfo).forEach(function (key) {
            if (filterInfo[key] != null && filterInfo[key].trim() != "") {
                searchObj[key] = {
                    $regex: `^${filterInfo[key].trim()}`
                };
            }
        });
    }

    if (req.body.sortCol == null || req.body.sortCol == "" || Object.keys(req.body.sortCol).length == 0) {
        User.find(searchObj).then((users) => {
            res.json(users);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    } else {
        User.find(searchObj).sort(sortCol).then((users) => {
            res.json(users);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    }
});

/** This route can be used to get a single user's details. */
router.get('/:id', (req, res) => {
    User.findOne({"id": req.params.id}).then((user) => {
        res.json(user);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

/** This route can be used to change the status of a user. */
router.put('/:id/status', (req, res) => {
    User.updateOne({"id": req.params.id}, {"status": req.body.status}).then((updatedUser) => {
        res.status(200).json({"message": "success"});
    }).catch((error) => {
        console.log(error);
        res.status(500).json({"message": "failed"});
    });
});

/** This route can be used to add an opportunity of a particular user. */
router.put("/:userId/opportunities/", (req, res) => {
    User.updateOne({"id": req.params.userId}, 
                   {"$push": {"salesOpportunities": {"name": req.body.name, "status": req.body.status}}})
    .then((updatedUser) => {
        res.status(200).json({"message": "success"});
    }).catch((error) => {
        console.log(error);
        res.status(500).json({"message": "failed"});
    });
});

/** This route can be used to update an opportunity of a particular user. */
router.put("/:userId/opportunities/:opportunityId", (req, res) => {
    User.updateOne({"id": req.params.userId, "salesOpportunities._id": req.params.opportunityId}, 
                   {"$set": {"salesOpportunities.$.name": req.body.name, "salesOpportunities.$.status": req.body.status}})
    .then((updatedUser) => {
        res.status(200).json({"message": "success"});
    }).catch((error) => {
        console.log(error);
        res.status(500).json({"message": "failed"});
    });
});

module.exports = router;