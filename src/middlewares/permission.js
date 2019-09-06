import Response from '../helpers/Response';

const permit = (...permited) => (req, res, next) => {
  const { payload } = req.payload;
  if (permited.indexOf(payload.role) !== -1) {
    next();
  } else {
    const response = new Response(false, 403, 'access denied', {});
    return res.status(response.code).json(response);
  }
};
export default permit;
