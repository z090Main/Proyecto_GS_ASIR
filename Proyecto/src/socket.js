//socket server
const connectMysql = require('./database');
module.exports = function(io){
    
    io.on('connection', socket =>{
        console.log('New user Connected');

        socket.on('send message', function(data,data2){
            //Resend message to other client
            const username = data2;
            console.log(data,data2);
            io.sockets.emit('new message', data,username);

        });

    //visitor counter
        socket.on('Ncontador', function(valor,ID){
            connectMysql.query('UPDATE products SET nClick = nClick+? WHERE ID = ?',[valor,ID], function (error,result) {
                if(error) throw error;
                console.log(result);
                console.log(ID);
            });
        });
    
    //Filter
       socket.on('filter value',function(brand,priceMax,priceMin, valuation){
            console.log('????');
       }); 


    });
};