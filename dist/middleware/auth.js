import jwt from 'jsonwebtoken';
const verifyAuthToken = (req, res, next) => {
    try {
        const { TOKEN_SECRET } = process.env;
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
    }
};
export default verifyAuthToken;
