var Adherents = require('../models/adherents');
var adherents = new Adherents();

const getAdherents = (req, res) => {
    adherents.get(result => {
        res.json({route: '/adherents', method: 'GET', adherents: Object.values(result)});
    });
}

const getById = (req, res) => {
    adherents.getById(req.params.id, error => {
        res.json({route: '/adherents/' + req.params.id, method: 'GET', data: error});
    }, result => {
        res.json({route: '/adherents/' + req.params.id, method: 'GET', data: result});
    })
}

const postAdherents = (req, res) => {
    let adherent = req.body;

    if (adherent === undefined || !adherent.firstname || !adherent.lastname 
        || !adherent.email || !adherent.phone || !adherent.donation || !adherent.date) {
            res.json({route: '/adherents', method: 'POST', data: {error: 'Unfullfilled form.'}});
    } else {
        adherents.insert(adherent, result => {
            res.json({route: '/adherents', method: 'POST', adherent: result});
        });
    }
}

const putAdherents = (req, res) => {
    adherents.update(req.params.id, result => {
        res.json({route: '/adherents', method: 'PUT', data: result});
    })
}

const deleteAdherents = (req, res) => {
    adherents.delete(req.params.id, result => {
        res.json({route: '/adherents', method: 'POST', data: result});
    })
}

module.exports = {
    get: getAdherents,
    getById: getById,
    post: postAdherents,
    put: putAdherents,
    delete: deleteAdherents
}