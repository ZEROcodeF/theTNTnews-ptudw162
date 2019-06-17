var mysql = require('mysql');

var createConnection = () => {
  return mysql.createConnection({
    host: 'localhost', //db4free.net IP
    port: 3308,
    user: 'root',
    password: 'root',
    database: 'tntnewsalphadb'
  });
}

module.exports = {
  load: sql => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.connect();
      connection.query(sql, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
        connection.end();
      });
    });
  },

  add: (tableName, entity) => {
    return new Promise((resolve, reject) => {
      var sql = `insert into ${tableName} set ?`;
      var connection = createConnection();
      connection.connect();
      connection.query(sql, entity, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value.insertId);
          console.log('From DB: ' + value.insertId);
        }
        connection.end();
      });
    });
  },

  addIgnore: (tableName, entity) => {
    return new Promise((resolve, reject) => {
      var sql = `insert ignore into ${tableName} set ?`;
      var connection = createConnection();
      connection.connect();
      connection.query(sql, entity, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value.insertId);
        }
        connection.end();
      });
    });
  },

  update: (tableName, fieldName, entity) => {
    return new Promise((resolve, reject) => {
      var id = entity[fieldName];
      delete entity[fieldName];
      var sql = `update ${tableName} set ? where ${fieldName} = ?`;
      var connection = createConnection();
      connection.connect();
      connection.query(sql, [entity, id], (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value.changedRows);
        }
        connection.end();
      });
    });
  },

  delete: (tableName, idField, id) => {
    return new Promise((resolve, reject) => {
      var sql = `delete from ${tableName} where ${idField} = ?`;
      var connection = createConnection();
      connection.connect();
      connection.query(sql, id, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value.affectedRows);
        }
        connection.end();
      });
    });
  },
};