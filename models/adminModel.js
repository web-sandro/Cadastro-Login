const db = require('../config/db');

const Admin = {

    getAdmin: async () => {

        const [rows] = await db.query(
            'SELECT * FROM admin LIMIT 1'
        );

        return rows[0];
    },

    updateAdmin: async (id, email, password) => {

        await db.query(
            'UPDATE admin SET email = ?, password = ? WHERE id = ?',
            [email, password, id]
        );
    }
};

module.exports = Admin;