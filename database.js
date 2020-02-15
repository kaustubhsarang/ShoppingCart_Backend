const mysql = require('mysql');

var config =
{
    host: 'idsmysql-mysqldbserver.mysql.database.azure.com',
    user: 'idsmysql@idsmysql-mysqldbserver',
    password: 'DbPassword!',
    database: 'ids520',
    port: 3306,
    ssl: true
};

const pool = new mysql.createPool(config);

const connectSql = (sql, req, res) => {
    try {
        pool.getConnection(function(err, connection) {
            if (err) { 
                console.log("!!! Cannot connect !!! Error:");
                // throw err;
            }
            console.log("Connection established.");

            connection.query(sql, [], function(err, results) {
                    connection.release(); // always put connection back in pool after last query
                    if(err) { 
                        return res.json({error: "Invalid query!"});
                    }
                    return res.json(results);
            });
        });
    } catch (e) { console.log(e)}
}

const queryData = async (query, req, res) => {
    console.log(query);
    conn.query(query,  (err, results, fields) => {
            if (err) throw err;
            console.log('Selected ' + results.length + ' row(s).');

            for (i = 0; i < results.length; i++) {
                console.log('Row: ' + JSON.stringify(results[i]));
            }
            console.log('Done.');

            return res.json(results);
        })
    //    conn.end(
    //        function (err) { 
    //             if (err) throw err;
    //             else  console.log('Closing connection.') 
    //     });
}

// Heartbeat function to keep the connection to the database up
// const keepAlive = function() {
//     connect(function(err, conn) {
//       if (err)
//         return;
  
//       conn.ping();
//       conn.release();
//     });
//   };
  
// // Set up a keepalive heartbeat
// setInterval(keepAlive, 30000);


module.exports = {
    config,
    queryData,
    pool,
    connectSql
}