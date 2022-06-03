// On créé l'accès aux variable du .env
const dotenv = require("dotenv").config();
const secretToken = process.env.SECRET_TOKEN;

// Connexion à la base de données
const pool = require("../config/database");

console.log("tokenAuth connected with the database");

// On importe le package jsonwebtoken qui va permettre de créer des tokens et de les vérifier
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
      const query = `SELECT * FROM post where id = ${req.params.id} `;
      pool.query(query, (error, results) => {
            if (results) {
                  const token = req.headers.authorization.split(" ")[1];
                  // Décodage du token
                  const decodedToken = jwt.verify(token, secretToken);
                  // Récupération du userId encodé dans le token
                  const userId = decodedToken.userId;

                  // Comparaison du userId de la sauce et celui du token
                  if (results[0].userId && results[0].userId !== userId) {
                        res.status(403).json({ message: "Unauthorized request !" });
                  } else {
                        next();
                  }
            }
      });
};
