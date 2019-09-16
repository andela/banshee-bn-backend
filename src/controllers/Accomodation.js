import Response from '../helpers/Response';
import db from '../database/models';

const {
  Accomodation, Room, Booking, User
} = db;

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
      name, branchId, capacity, address, imgUrl
    } = req.body;

    try {
      const { dataValues } = await Accomodation.create({
        name,
        branchId,
        capacity,
        status: 'available',
        imgurl: imgUrl,
        address
      });
      return res.status(201).json(new Response(
        true,
        201,
        'Successfully created accomodation center',
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

  /**
   * @description - Books accomodation facility
   * @param {object} req -
   * @param {object} res -
   * @returns {object} - object
   *
  */
  static async bookAccomodation(req, res) {
    try {
      const { payload } = req.payload;
      const { id: userId } = payload;

      const {
        accomodationId, roomId, bookDate
      } = req.body;

      const user = await User.findOne({ where: { id: userId } });
      const accomodation = await Accomodation.findOne({ where: { id: accomodationId } });
      const room = await Room.findOne({ where: { id: roomId } });
      const { accomodationId: accomodationIdFromDb, booked } = room;
      if (accomodationId !== accomodationIdFromDb) {
        const response = new Response(
          false,
          403,
          'This Room Id is not associated with this accomodation'
        );
        return res.status(response.code).json(response);
      }

      // check if roomId is booked
      if (booked === true) {
        const response = new Response(
          false,
          403,
          'This room has been booked'
        );
        return res.status(response.code).json(response);
      }

      await Booking.create({
        accomodationId,
        roomId,
        occupiedBy: userId,
        bookDate
      });

      await Room.update({
        booked: true
      },
      {
        where: {
          id: roomId
        },
        returning: true,
        plain: true
      });

      const { name: roomName, type: roomType } = room;
      const { firstName, lastName } = user;
      const { name: accomodationName } = accomodation;

      const response = new Response(
        true,
        201,
        'Accomodation Booked successfully',
        {
          booking: {
            name: `${lastName} ${firstName}`,
            accomodationId,
            accomodationName,
            roomId,
            roomName,
            roomType,
            bookDate
          }
        }
      );
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(
        false,
        500,
        'Server error, Please try again later',
      );
      return res.status(response.code).json(response);
    }
  }
}

export default AccomodationController;
