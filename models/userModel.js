const db = require('../config/db');

const User = {

    // LISTAR TODOS
    getAll: async () => {

        const [rows] = await db.query(
            'SELECT * FROM users'
        );

        return rows;
    },

    // BUSCAR POR ID
    getById: async (id) => {

        const [rows] = await db.query(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );

        return rows[0];
    },

    // CADASTRAR
    create: async (user) => {

        const {
            name,
            email,
            password
        } = user;

        const [result] = await db.query(
            `
            INSERT INTO users
            (name, email, password)
            VALUES (?, ?, ?)
            `,
            [name, email, password]
        );

        return result.insertId;
    },

    // ATUALIZAR
    update: async (id, user) => {

        const {
            name,
            email,
            password
        } = user;

        await db.query(
            `
            UPDATE users
            SET
                name = ?,
                email = ?,
                password = ?
            WHERE id = ?
            `,
            [name, email, password, id]
        );
    },

    // EXCLUIR
    delete: async (id) => {

        await db.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );
    }

};

module.exports = User;