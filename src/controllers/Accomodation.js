import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import Response from '../helpers/Response';
import db from '../database/models';

dotenv.config();
const { Accomodation, Room } = db;
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET
});

/**
 * Accomodation class
 */
class AccomodationController {
  /**
   * @description - create accomodation center
   * @param {Object} req - HTTP Request object
   * @param {Object} res - HTTP Response object
   * @returns {object} objectu
   */
  static async createAccomodation(req, res) {
    const {
      name, branchId, capacity, address
    } = req.body;

    try {
      const image = req.file ? await cloudinary.uploader.upload(req.file.path) : null;
      const imgurl = image ? image.public_id : null;
      const { dataValues } = await Accomodation.create({
        name,
        branchId,
        capacity,
        status: 'available',
        imgurl,
        address
      });
      return res.status(200).json(new Response(
        true,
        200,
        'Successfully created acoomodation center',
        dataValues
      ));
    } catch (error) {
      return res.status(500).json(
        new Response(false, 500, error.message)
      );
    }
  }

  /**
   * @description - Add rooms to accomodation center
   * @param {object} req - HTTP Request object
   * @param {object} res  - HTTP Response object
   * @returns {object} -object
   */
  static async addRoom(req, res) {
    const { name, accomodationId, type } = req.body;

    try {
      const { dataValues } = await Room.create({
        name,
        type,
        accomodationId
      });
      return res.status(200).json(
        new Response(true, 200, 'Successfully added a room', dataValues)
      );
    } catch (error) {
      return res.status(500).json(
        new Response(false, 500, error.message)
      );
    }
  }
}

export default AccomodationController;
