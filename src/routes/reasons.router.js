import express from 'express';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    //logic
    res.json();
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    //logic
    res.json();
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    //logic
    res.json();
  } catch (error) {
    next(error);
  }
});

router.patch('/id', async (req, res, next) => {
  try {
    //logic
    res.json();
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    //logic
    res.json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
