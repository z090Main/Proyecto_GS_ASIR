const router = require('express').Router();
const connectMysql = require('../database');

router.get('/',async(req,res) =>{
    await connectMysql.query('SELECT * FROM products ORDER BY nClick desc LIMIT 4', (error,result)=>{
        if(error) throw error;
        //console.log(result[0]);
        connectMysql.query('SELECT * FROM category',(error,category) =>{
            if(error) throw error;
            connectMysql.query('SELECT * FROM products ORDER BY RAND() LIMIT 16',(error,randown) =>{
                if(error) throw error;
                connectMysql.query('SELECT * FROM products WHERE not offers = 0 ',(error,offers) =>{
                    if(error) throw error;
                    connectMysql.query('SELECT * FROM products WHERE category_id = "asCs" ORDER BY up_at DESC LIMIT 2',(error,art) =>{
                        if(error) throw error;
                        connectMysql.query('SELECT * FROM products WHERE category_id = "bkCa" ORDER BY up_at DESC LIMIT 2',(error,book) =>{
                            if(error) throw error;
                            connectMysql.query('SELECT * FROM products WHERE category_id = "PC" ORDER BY up_at DESC LIMIT 2',(error,computer) =>{
                                if(error) throw error;
                                connectMysql.query('SELECT * FROM products WHERE category_id = "elcs" ORDER BY up_at DESC LIMIT 2',(error,electronic) =>{
                                    if(error) throw error;
                                    connectMysql.query('SELECT * FROM products WHERE category_id = "gnPs" ORDER BY up_at DESC LIMIT 2',(error,garden) =>{
                                        if(error) throw error;
                                        connectMysql.query('SELECT * FROM products WHERE category_id = "stHe" ORDER BY up_at DESC LIMIT 2',(error,home) =>{
                                            if(error) throw error;
                                            connectMysql.query('SELECT * FROM products WHERE category_id = "ssOrs" ORDER BY up_at DESC LIMIT 2',(error,sport) =>{
                                                if(error) throw error;
                                                connectMysql.query('SELECT * FROM products WHERE category_id = "tsBy" ORDER BY up_at DESC LIMIT 2',(error,toys) =>{
                                                    if(error) throw error;
                                                    connectMysql.query('SELECT * FROM products WHERE category_id = "voGs" ORDER BY up_at DESC LIMIT 2',(error,game) =>{
                                                        if(error) throw error;
                                                        res.render('index',{result,category,randown,offers,art,book,computer,electronic,garden,home,sport,toys,game});
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });


});

router.post('/search',async(req,res) =>{
    const search = req.body.search;

    await connectMysql.query('SELECT * FROM products WHERE title like "%"?"%"',[search],(error,searchResult) =>{
        if(error) throw error;
        //console.log(searchResult);
        res.render('product/show',{searchResult});
    });
    
});

router.get('/users/session',(req,res) =>{
    res.render('users/session');
});

module.exports = router;