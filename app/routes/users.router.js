const express = require('express');
const UserService = require('../services/user.service.js');
const passport = require('passport');

const validatorHandler = require('../middlewares/validator.handler.js');
const {
  emailReqSchema,
  tokenReqSchema,
  createUserSchema,
  updateUserSchema,
} = require('../schemas/user.schema.js');
const router = express.Router();
const service = new UserService();

 router.get(
   '/check',
  async (req, res, next) => {
     try {
       res.status(200).json("Check");
     } catch (error) {
       next(error);
     }
   }
 );

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const userId = req.user.sub;
      const user = await service.update(userId, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

// router.delete(
//   '/:id',
//   validatorHandler(getUserSchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       await service.delete(id);
//       res.status(201).json({ id });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

router.post(
  '/email-verification',
  validatorHandler(emailReqSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendEmailVerification(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/confirm-email',
  validatorHandler(tokenReqSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token } = req.body;
      const rta = await service.verifyEmail(token);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
