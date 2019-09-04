import { check } from 'express-validator';


const updateUserRole = [
  check('role')
    .trim()
    .exists()
    .withMessage('Supply role to update user\'s role')
    .matches(/\b(?:super admin|travel admin|travel team member|manager|requester|staff)\b/)
    .withMessage('Supply a valid role'),

];

export default updateUserRole;
