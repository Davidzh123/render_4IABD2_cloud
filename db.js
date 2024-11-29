// db.js

require('dotenv').config(); // Charge les variables d'environnement en local

const { Sequelize } = require('sequelize');

// Utilisez `DATABASE_URL` si disponible, sinon construisez la chaîne de connexion
const DATABASE_URL = process.env.DATABASE_URL || `postgres://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DB_NAME}`;

// Créer une instance de Sequelize en utilisant la chaîne de connexion
const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true, // Requis pour les connexions sécurisées
            rejectUnauthorized: false, // Ajustez selon vos besoins de sécurité
        },
    },
    define: {
        createdAt: 'added',
        updatedAt: 'updated',
    },
});

// Tester la connexion
sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données réussie !');
    })
    .catch((err) => {
        console.error('Impossible de se connecter à la base de données :', err);
    });

// Synchroniser les modèles
sequelize.sync();

module.exports = sequelize;
