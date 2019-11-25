const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const memberCtrl = require('../controllers/member.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', {
  session: false
}))

router.route('/')
  .post(asyncHandler(insert));
router.route('/:memberId')
  .put(asyncHandler(update));
router.route('/')
  .get(asyncHandler(get));
router.route('/:memberId')
  .get(asyncHandler(get));
router.route('/:memberId')
  .delete(asyncHandler(deleteMember));


async function insert(req, res) {
  let member = await memberCtrl.insert(req.body);
  res.json(member);
}

async function update(req, res) {
  let member = await memberCtrl.update(req.params.memberId, req.body);
  res.json(member);
}

async function get(req, res) {
  let userId = req.query.userId
  if (userId) {
    let members=await memberCtrl.getAllMemberByUserId(userId);
    res.json(members);
  } else {
    let members = await memberCtrl.get(req.params.memberId);
    res.json(members);
  }
}

async function deleteMember(req, res) {
  if (req.params.memberId) {
    let member = await memberCtrl.deleteMember(req.params.memberId);
    res.json(member);
  }
  return res.status(400).send('user id is not defined');
}

async function getMemberByUser(req, res) {
  let member = await memberCtrl.get(req.params.memberId);
  res.json(member);
}
