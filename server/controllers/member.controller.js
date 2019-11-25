const bcrypt = require('bcrypt');
const Joi = require('joi');
const Member = require('../models/member.model');

const memberSchema = Joi.object({
  userId:Joi.string(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email(),
  phoneNumber: Joi.number().integer().min(1000000000).max(9999999999),
  department: Joi.string().required()
})

module.exports = {
  insert,
  update,
  get,
  getAllMemberByUserId,
  deleteMember
}

async function insert(member) {
  member = await Joi.validate(member, memberSchema, {
    abortEarly: false
  });
  return await new Member(member).save();
}

async function update(memberId,member) {
  member = await Joi.validate(member, memberSchema, {
    abortEarly: false
  });
  return await Member.findOneAndUpdate({
    _id: memberId
  }, member);
}

async function get(memberId) {
  if (memberId) {
    return await Member.find({
      _id: memberId
    });
  }
  let result=await Member.find({});
  return result;
}

async function getAllMemberByUserId(userId) {
  if (userId) {
    return await Member.find({
      userId: userId
    });
  }
  return undefined;
}

async function deleteMember(memberId) {
  return await Member.deleteOne({_id:memberId})
}
