//slider


window.addEventListener('load',function(){
    console.log('Content load success!');
    var i = 0;
    function changeImage(){
        
        document.public.src = 'img/image'+ i+'.jpg';
        if(i<2){
            i++;
            
        }else{
            i=0;
        }
        
        
    }
    
   setInterval(changeImage, 3000);
    
});

//Fin slider


  
