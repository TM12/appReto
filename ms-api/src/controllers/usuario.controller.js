const db = require('../db/config');
const tbusuario="usuario";
const tbauditoria="auditoria";

exports.create = function(req,res){
    let usuario = {};
    usuario = req.body;
    usuario.fecRegistro = new Date();
    db.create(tbusuario,"id",usuario)
    .then(
        (resp) =>{
            console.log("resp create--> ",resp);
            let obj = {};
            obj.id = resp;
            obj.observacion = "Usuario registrado"
            let audit = getInfAudit(obj);
            db.create(tbauditoria,"id",audit)
            .then(
                (rsp) =>{
                    let json = {"action" : 1,"message" : "Usuario registrado correctamente"};
                    res.send(json);
                },
                (err)=>{
                    res.status(500).send(err);
                }
            );
        },
        (err)=>{
            res.status(500).send(err);
        }
    );
}

exports.read = function(req,res){
    let obj = {};
    obj = req.body;
    db.get(tbusuario)
    .then(
        (resp) =>{
            let json = {"action" : 2,"message" : resp};
            res.send(json);
        },
        (err)=>{
            res.status(500).send(err);
        }
    );
}

exports.update = function(req,res){
    let usuario = {};
    usuario = req.body;
    db.update(tbusuario,"id",usuario.id,usuario)
    .then(
        (resp) =>{
            let obj = {};
            obj.id = obj.id;
            obj.observacion = "Usuario modificado";
            let audit = getInfAudit(obj);
            db.create(tbauditoria,"id",audit)
            .then(
                (rsp) =>{
                    let json = {"action" : 3,"message" : "Usuario actualizado exitosamente"};
                    res.send(json);
                },
                (err)=>{
                    res.status(500).send(err);
                }
            );

        },
        (err)=>{
            res.status(500).send(err);
        }
    );
}

exports.delete = function(req,res){
    let usuario = {};
    usuario = req.body;
    db.delete(tbusuario,"id",usuario.id)
    .then(
        (resp) =>{
            let obj = {};
            obj.id = obj.id
            obj.observacion = "Usuario eliminado"
            let audit = getInfAudit(resp);
            db.create(tbauditoria,"id",audit)
            .then(
                (rsp) =>{
                    let json = {"action" : 4,"message" : "Usuario eliminado exitosamente"};
                    res.send(json);
                },
                (err)=>{
                    res.status(500).send(err);
                }
            );
        },
        (err)=>{
            console.log(err)
            res.status(500).send(err);
        }
    );
}

function getInfAudit(obj){
    let audit={
        idRegistro: obj.id,
        observacion: obj.observacion,
        fecRegistro: new Date()
    };
    return audit;
}