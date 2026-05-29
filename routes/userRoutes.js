const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

// INICIO
router.get('/', userController.home);

// LOGIN
router.get('/login', userController.showLogin);
router.post('/login', userController.login);

// LISTA
router.get('/lista', userController.list);

// CADASTRO
router.get('/addUser', userController.showAddForm);
router.post('/addUser', userController.add);

// EDITAR
router.get('/edit/:id', userController.showEditForm);
router.post('/edit/:id', userController.edit);

// EXCLUIR
router.get('/delete/:id', userController.delete);

// ADMIN
router.get('/admin', userController.adminConfig);
router.post('/admin/update', userController.updateAdmin);

module.exports = router;