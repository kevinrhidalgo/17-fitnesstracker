const router = require("express").Router();
const db = require("../models");

// GET request for getting the workouts
router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .sort({ date: -1 })
    .then((workout) => {
      res.status(200).json(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .sort({ date: -1 })
    .then((workout) => {
      res.status(200).json(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//POST workout after it was completed
router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((workout) => {
      res.status(201).json(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});


//update the workout input
router.put("/api/workouts/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  db.Workout.updateOne(
    { _id: id },
    {
      $push: {
        exercises: { ...body },
      },
    }
  )
    .then((workout) => {
      res.status(200).json(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//delete any workouts that were entered
router.delete("/api/workouts", ({ body }, res) => {
	Workout.findByIdAndDelete(body.id)
	  .then(() => {
		res.json(true);
	  })
	  .catch(err => {
		res.json(err);
	  });
  });

module.exports = router;