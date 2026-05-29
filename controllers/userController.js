const User = require('../models/userModel');
const Admin = require('../models/adminModel');

const userController = {

    // ================= HOME =================
    home: (req, res) => {
        res.render('index');
    },

    // ================= LOGIN =================
    showLogin: (req, res) => {
        res.render('login');
    },

    // VALIDAR LOGIN
    login: async (req, res) => {

        try {

            const { email, senha } = req.body;

            const admin = await Admin.getAdmin();

            if (!admin) {
                return res.send(`
                    <h1>Administrador não encontrado</h1>
                    <a href="/login">Voltar</a>
                `);
            }

            if (
                email === admin.email &&
                senha === admin.password
            ) {

                return res.redirect('/lista');

            } else {

                return res.send(`
                    <h1>Login inválido</h1>
                    <a href="/login">Voltar</a>
                `);
            }

        } catch (error) {

            console.log(error);

            res.send(`
                <h1>Erro ao fazer login</h1>
            `);
        }
    },

    // ================= LISTA =================
    list: async (req, res) => {

        try {

            const users = await User.getAll();

            res.render('lista', { users });

        } catch (error) {

            console.log(error);

            res.send('Erro ao listar usuários');
        }
    },

    // ================= ADD =================
    showAddForm: (req, res) => {
        res.render('addUser');
    },

    add: async (req, res) => {

        try {

            await User.create(req.body);

            res.redirect('/lista');

        } catch (error) {

            console.log(error);

            res.send('Erro ao cadastrar usuário');
        }
    },

    // ================= EDIT =================
    showEditForm: async (req, res) => {

        try {

            const user = await User.getById(req.params.id);

            if (!user) {
                return res.send('Usuário não encontrado');
            }

            res.render('editUser', { user });

        } catch (error) {

            console.log(error);

            res.send('Erro ao carregar usuário');
        }
    },

    edit: async (req, res) => {

        try {

            await User.update(req.params.id, req.body);

            res.redirect('/lista');

        } catch (error) {

            console.log(error);

            res.send('Erro ao atualizar usuário');
        }
    },

    // ================= DELETE =================
    delete: async (req, res) => {

        try {

            await User.delete(req.params.id);

            res.redirect('/lista');

        } catch (error) {

            console.log(error);

            res.send('Erro ao excluir usuário');
        }
    },

    // ================= CONFIG ADMIN =================
    adminConfig: async (req, res) => {

        try {

            const admin = await Admin.getAdmin();

            res.render('admin', { admin });

        } catch (error) {

            console.log(error);

            res.send('Erro ao abrir configurações');
        }
    },

    // ================= ALTERAR SENHA ADMIN =================
    updateAdmin: async (req, res) => {

        try {

            const {
                email,
                senhaAntiga,
                novaSenha,
                confirmarSenha
            } = req.body;

            const admin = await Admin.getAdmin();

            // VERIFICA SENHA ANTIGA
            if (senhaAntiga !== admin.password) {

                return res.send(`
                    <h1>Senha antiga incorreta</h1>
                    <a href="/admin">Voltar</a>
                `);
            }

            // VERIFICA NOVA SENHA
            if (novaSenha !== confirmarSenha) {

                return res.send(`
                    <h1>As novas senhas não coincidem</h1>
                    <a href="/admin">Voltar</a>
                `);
            }

            // TAMANHO MÍNIMO
            if (novaSenha.length < 4) {

                return res.send(`
                    <h1>A nova senha deve ter no mínimo 4 caracteres</h1>
                    <a href="/admin">Voltar</a>
                `);
            }

            // ATUALIZA ADMIN
            await Admin.updateAdmin(
                admin.id,
                email,
                novaSenha
            );

            res.send(`
                <h1>Senha alterada com sucesso</h1>
                <a href="/">Ir para login</a>
            `);

        } catch (error) {

            console.log(error);

            res.send(`
                <h1>Erro ao atualizar administrador</h1>
            `);
        }
    }
};

module.exports = userController;