const constants = require('../../constants');
var knex = require('knex'); 

var Conexion = (function () {
    var instance;
 
    function createInstance() {
        var object = new knex(
			{
				client: constants.client,
				connection: {
					host : constants.host,
                    port: constants.port,
					user : constants.user,
					password : constants.password,
					database : constants.database
				},
				pool: { min: 1, max: 7 },
				acquireConnectionTimeout: 120000
			}
		);
        return object;
    }
 
    return {
        getInstance:function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

exports.get = function(table){
	return Conexion.getInstance().transaction(function (trx) {
		Conexion.getInstance()(table)
		.select('*')
		.then(trx.commit)
		.catch(trx.rollback);
	});
}

exports.find= function(table,name,value){
	return Conexion.getInstance().transaction(function (trx) {
		Conexion.getInstance()(table)
		.transacting(trx)
		.select('*')
		.where(name,value)
		//.then((res)=>{callback(res);})
		.then(trx.commit)
		.catch(trx.rollback);
	});
	
}

exports.create = function(table,value,data){
	return Conexion.getInstance().transaction(function (trx) {
		Conexion.getInstance()(table).transacting(trx).insert(data)
		.returning(value)
		.then(trx.commit)
		.catch(trx.rollback);
	});
}


exports.update = function(table,primary_key,id,data){
	return Conexion.getInstance().transaction(function (trx) {
		Conexion.getInstance()(table)
		.transacting(trx)
		.where(primary_key, '=', id)
		.update(data)
		.then(trx.commit)
		.catch(trx.rollback);
	});
}

exports.delete = function(table,primary_key,id){
	return Conexion.getInstance().transaction(function (trx) {
		Conexion.getInstance()(table)
		.where(primary_key, id)
	  	.del()
		.then(trx.commit)
		.catch(trx.rollback);
	});
}

exports.querySql = function(sql){
	return Conexion.getInstance().transaction(function (trx) {
		Conexion.getInstance()
		.raw(sql)
		//.then((res)=>{callback(res);})
		.then(trx.commit)
		.catch(trx.rollback);
	});
}


exports.create = function(table,value,data){
	return Conexion.getInstance().transaction(function (trx) {
		Conexion.getInstance()(table).transacting(trx).insert(data)
		.returning(value)
		.then(trx.commit)
		.catch(trx.rollback);
	});
}