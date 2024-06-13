const jwt=require("jsonwebtoken")

const JWT_SECRET_KEY = '16#18'; 

function checkAuth(req,res,next){
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. No token provided.' });
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden. Invalid token.' });
        }

        const sql = 'SELECT token FROM tokens WHERE token = ?';
        connection.execute(sql, [token], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'An error occurred while verifying token.' });
            }

            if (results.length === 0) {
                return res.status(403).json({ message: 'Forbidden. Invalid token.' });
            }

            req.user = decoded;
            next();
        });
    });
}

module.exports={
    checkAuth : checkAuth,
    JWT_SECRET_KEY

}