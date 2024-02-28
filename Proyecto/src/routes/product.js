const router = require('express').Router();
const connectMysql = require('../database');
const uuid = require('uuid/v4');
const { unlink } = require('fs-extra');
const path = require('path');
const { isAuthenticated } = require('../helpers/auth');

//Testing
router.get('/product',async(req,res) =>{
    await connectMysql.query('SELECT * FROM products',(error,products_result) =>{
        if(error) throw error;
        connectMysql.query('SELECT * FROM category',(error,category) =>{
            res.render('product/show',{products_result,category});
        });
        
    });
    
});
//Content
/*
router.get('/product/type2',async(req,res) =>{
    const type1 = "elcs";
    await connectMysql.query('SELECT * FROM products WHERE category_id = ?',[type1],(error,products_result) =>{
        if(error) throw error;
        res.render('product/show',{products_result});
    });
    
});

router.get('/product/type3',async(req,res) =>{
    const type1 = "PC";
    await connectMysql.query('SELECT * FROM products WHERE category_id = ?',[type1],(error,products_result) =>{
        if(error) throw error;
        res.render('product/show',{products_result});
    });
    
});

router.get('/product/type4',async(req,res) =>{
    const type1 = "stHe";
    await connectMysql.query('SELECT * FROM products WHERE category_id = ?',[type1],(error,products_result) =>{
        if(error) throw error;
        res.render('product/show',{products_result});
    });
    
});

router.get('/product/type5',async(req,res) =>{
    const type1 = "asCs";
    await connectMysql.query('SELECT * FROM products WHERE category_id = ?',[type1],(error,products_result) =>{
        if(error) throw error;
        res.render('product/show',{products_result});
    });
    
});

router.get('/product/type6',async(req,res) =>{
    const type1 = "tsBy";
    await connectMysql.query('SELECT * FROM products WHERE category_id = ?',[type1],(error,products_result) =>{
        if(error) throw error;
        res.render('product/show',{products_result});
    });
    
});

router.get('/product/type7',async(req,res) =>{
    const type1 = "gnPs";
    await connectMysql.query('SELECT * FROM products WHERE category_id = ?',[type1],(error,products_result) =>{
        if(error) throw error;
        res.render('product/show',{products_result});
    });
    
});

router.get('/product/type8',async(req,res) =>{
    const type1 = "ssOrs";
    await connectMysql.query('SELECT * FROM products WHERE category_id = ?',[type1],(error,products_result) =>{
        if(error) throw error;
        res.render('product/show',{products_result});
    });
    
});
router.get('/product/type9',async(req,res) =>{
    const type1 = "voGs";
    await connectMysql.query('SELECT * FROM products WHERE category_id = ?',[type1],(error,products_result) =>{
        if(error) throw error;
        res.render('product/show',{products_result});
    });
    
});
*/


router.get('/product/upload', isAuthenticated, async(req,res) =>{
    await connectMysql.query('SELECT * FROM category',(error,category) =>{
        if (error) throw error;
        //console.log(category);
        res.render('product/upload',{ category });
    });
});

router.post('/product/upload', isAuthenticated, async(req,res) =>{
    const {title,price,category,description} = req.body;
    const {filename,path,mimetype} = req.file;
    const email = req.user;
    const errors = [];
    //Problem with save image when have error
    if(title.length <= 0){
        errors.push({text: "The title should not be empty"})
    }
    if(price.length <=0){
        errors.push({text: "The price should not be empty"})
    }
    if(category == "Choose..."){
        errors.push({text: "The category should not be empty"})
    }
    if(description.length <=0){
        errors.push({text: "The description should not be empty"})
    }
    if(description.length > 250){
        errors.push({text: "The description must be less than 250 Characters"})
    }
    if(errors.length > 0){
        if(category === 'Choose...'){
            await connectMysql.query('SELECT * FROM category',(error,li_category) =>{
                if (error) throw error;
                const category = li_category;
                /*console.log('./src/public/img/uploads/' + req.file.filename);
                unlink(path.resolve('./src/public/img/uploads/' + req.file.filename));*/
                res.render('product/upload',{errors, category, title, price, description});
            });
        }else{
            const sCategory = category
            /*console.log(path,'asdqwe');
            unlink(path.resolve('./src/public/img/uploads/' + req.file.filename));*/
            res.render('product/upload',{errors, sCategory, title, price, description});
        }
    }else{
        await connectMysql.query('SELECT id FROM category WHERE name = ?',[category],(error,result) =>{
            if (error) throw error;
            const product_data = { id: uuid(),title: title, price: price, category_id: result[0].id, seller: email[0].email , description: description, path: '/img/uploads/' + req.file.filename }

            connectMysql.query('INSERT INTO products SET ?',[product_data],(error,result) =>{
                if (error) throw error;
                
                const image_data = {id: uuid(), filename: filename, path: path, extname: mimetype, product_id: product_data.id}
                connectMysql.query('INSERT INTO image SET ?',[image_data],(error,result) =>{
                    if (error) throw error;
                    req.flash('success_msg', 'Product added success');
                    res.redirect('/profile');
                });
            });

        });
    }
    
});
//edit
router.get('/product/edit/:id', isAuthenticated, async(req,res) =>{
    
    await connectMysql.query('SELECT * FROM products WHERE id = ?',[req.params.id],(error,products_result) =>{
        if(error) throw error;
        connectMysql.query('SELECT * FROM category',(error,category) =>{
            if (error) throw error;
            //console.log(products_result[0].category_id,'tyhjfghj');
            connectMysql.query('SELECT name FROM category WHERE id = ?',[products_result[0].category_id],(error,originalCat) =>{
                if (error) throw error;
                originalCat = originalCat[0].name;
                res.render('product/edit',{products_result,category,originalCat});
            });
        });

    });

});

router.post('/product/edit-product/:id',isAuthenticated,async(req,res) =>{
    const { id,title,category,price,offers,description } = req.body;
    await connectMysql.query('SELECT id FROM category WHERE name = ?',[category],(error, category_id) =>{
        if (error) throw error;
        const product_data = { title: title, price: price, category_id: category_id[0].id, offers: offers,description: description,  }
        connectMysql.query('UPDATE products SET ? WHERE id = ?',[product_data,id],(error, result) =>{
            if (error) throw error;
            res.redirect('/product');
        });
    })
});
//end

router.get('/product/:id/delete',isAuthenticated,async(req,res) =>{
    const id = req.params.id;
    const hord = 1;
    await connectMysql.query('SELECT * FROM products WHERE id = ?',[id],(error,product_result) =>{
        if(error) throw error;
        connectMysql.query('DELETE FROM image WHERE product_id = ?',[id], (error,image_delete) =>{
            if(error) throw error;
            connectMysql.query('DELETE FROM products WHERE id = ?',[id],(error,delete_result) =>{
                if(error) throw error;
                unlink(path.resolve('./src/public/' + product_result[0].path));
            })
        })
    });
    req.flash('success_msg', 'Deleted');
    res.redirect('/profile');
});

router.get('/product/profile/:id',async(req,res) =>{
    const id = req.params.id;
    await connectMysql.query('SELECT * FROM products WHERE ID = ?', [id],(error,products_result) =>{
        if(error) throw error;
        connectMysql.query('SELECT * FROM category',(error,category) =>{
            res.render('product/product_profile',{products_result,category});
        });
    });
});
router.post('/product/:id',async(req,res) =>{
    console.log(req.body.id,'erftghhnbvf');
    const category_id_send = req.body.id;
    await connectMysql.query('SELECT * FROM products WHERE category_id = ?',[req.body.id],(error,products_result) =>{   //product info.
        if(error) throw error;
        connectMysql.query('SELECT * FROM category',(error,category) =>{    //menu
            /*//console.log(products_result[0].offers,'852085208520');  //Why cannot assignment value to variable global in local?  *Try with socket*
            const l = 0;
            for(var i = 0; i < 2;i++){
                 l = i;
            }
            console.log(l2);*/
            res.render('product/show',{products_result,category,category_id_send});
        });
    });
});

module.exports = router;