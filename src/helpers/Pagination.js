/**
 * @class
 */
class Pagination {
  /**
   *
   * @param {number} page Page number
   * @param {number} limit Page limit
   * @returns {object} JSON
   */
  static paginate(page = 1, limit = 5) {
    const offset = (Number(page) - 1) * Number(limit);
    return {
      offset,
      limit
    };
  }
}

export default Pagination;
