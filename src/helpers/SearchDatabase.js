import db from '../database/models';

const { Company } = db;

/** Search Database Class */
class SearchDatabase {
  /**
   *
   * @param {string} code
   * @return {object} object
   */
  static async findCompany(code) {
    const company = await Company.findOne({ where: { code } });
    return company;
  }
}

export default SearchDatabase;
