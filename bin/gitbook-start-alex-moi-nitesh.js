#! /usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs-extended');
var ejs = require("ejs");
var path = require("path");
var child = require("child_process");


var author      = argv.a || '';
var name        = argv.n || '';
var repo_url    = argv.u || '';
var directorio  = argv.c;
var help        = argv.h;


//Despliegue en iaas
var deploy_iaas = argv.d;
var ip_iaas     = argv.iaas_ip;
var path_iaas   = argv.iaas_path;



function crear_estructura(dir){
      
      //creamos el directorio raiz
      fs.createDir(path.join(process.cwd(), dir), function(err){
        if(err)
          console.log(err);
    	});
      
      
      //creamos el directorio txt
      fs.createDir(path.join(process.cwd(), dir , 'txt'), function(err){
        if(err)
          console.log(err);
    	});
    	
    	
    	//creamos el directorio scripts
    	fs.createDir(path.join(process.cwd(), dir , 'scripts'), function(err){
        if(err)
          console.log(err);
    	});
    	
    	
    	//copiamos lo que hay en txt y lo ponemos en el txt creado
      fs.copyDir(path.join(__dirname, '..', 'txt'), path.join(process.cwd(), dir , 'txt'), function (err) {
      	if (err)
          console.error(err)
    	});
      
      
      //copiamos lo que hay en scripts y lo ponemos en el spripts creado
      fs.copyDir(path.join(__dirname, '..', 'scripts'), path.join(process.cwd(), dir , 'scripts'), function (err) {
      	if (err)
          console.error(err)
    	});
     
     
      //copiamos gulpfile
      fs.copyFile(path.join(__dirname,'..','gulpfile.js'), path.join(process.cwd(), dir , 'gulpfile.js'),function(err){
        if(err)
          console.log(err);
      });
    
    
      //copiamos el book
      fs.copyFile(path.join(__dirname,'..','book.json'),path.join(process.cwd(), dir , 'book.json'),function(err){
        if(err)
        console.log(err);
      });
      
      //copiamos server.js
      fs.copyFile(path.join(__dirname,'..','server.js'),path.join(process.cwd(), dir , 'server.js'),function(err){
        if(err)
        console.log(err);
      }); 
      
}


if(help){
  console.log("\nAyuda GitBook-Start-Alex-Moi-Nitesh:"
              +"\n\nLos argumentos aceptados son:"
              +"\n -a: Especificar el autor del gitbook"
              +"\n -n: Especificar el nombre del gitbook"
              +"\n -c: Especificar el nombre del directorio"
              +"\n -u: Especificar la url del repositorio git"
              +"\n -h: Help (Ayuda)"
              +"\n -d: Deploy en IaaS(iaas.ull.es)"
              +"\n --iaas_ip: Especificar la IP del IaaS"
              +"\n --iaas_path: Especificar la PATH de IaaS\n");

}
else{
  
  //OPCION 1
  if(directorio && !deploy_iaas){ //Si se especifica la opcion -c y las -a, -n, -u como opcionales. Este caso NO incluye la opcion deploy-iaas
    
      crear_estructura(directorio);
      
      //renderizando package.json sin opciones de iaas
      ejs.renderFile(path.join(__dirname,'..','template','package.ejs'),{ autor: author , nombre: name, repourl: repo_url, ip_iaas_ull: "" , path_iaas_ull: ""}, 
        function(err,data){
            if(err) {
                console.error(err);
            }
            if(data) {
                fs.writeFile(path.join(process.cwd(),directorio,'package.json'), data);
            }
        });
  }
  
  else if(deploy_iaas){

      //OPCION 2
      if(!directorio){//Si especificas deploy solo
        
          crear_estructura("Book");
          
          child.exec('npm install --save-dev gitbook-start-iaas-ull-es-alex-moi', function(error, stdout, stderr){
            if(error)
              console.log(error)
            
            console.log(stderr);
            console.log(stdout);
          })
          
          //añadir las tareas al gulp
          var iaas = require(path.join(__dirname,'../..','gitbook-start-iaas-ull-es-alex-moi','gitbook-start-iaas-ull-es'));
          iaas.initialize("Book");
          
          
          //renderizando package.json con opciones de iaas
          ejs.renderFile(path.join(__dirname,'..','template','package.ejs'),{ autor: author , nombre: name, repourl: repo_url, ip_iaas_ull: ip_iaas , path_iaas_ull: path_iaas}, 
            function(err,data){
                if(err) {
                    console.error(err);
                }
                if(data) {
                    fs.writeFile(path.join(process.cwd(),"Book",'package.json'), data);
                }
            });
      }
    

      //OPCION 3
      if(directorio){//Si especificas la opcion -c y las opciones del deploy-iaas. Este es el caso de pasar TODOS los argumentos
        
          crear_estructura(directorio);
          
          child.exec('npm install --save-dev gitbook-start-iaas-ull-es-alex-moi', function(error, stdout, stderr){
            if(error)
              console.log(error)
            
            console.log(stderr);
            console.log(stdout);
          })
            
            
          //añadir las tareas al gulp  
          var iaas = require(path.join(__dirname,'../..','gitbook-start-iaas-ull-es-alex-moi','gitbook-start-iaas-ull-es'));
          iaas.initialize(directorio);
         
         
          //renderizando package.json con opciones de iaas
          ejs.renderFile(path.join(__dirname,'..','template','package.ejs'),{ autor: author , nombre: name, repourl: repo_url, ip_iaas_ull: ip_iaas , path_iaas_ull: path_iaas}, 
            function(err,data){
                if(err) {
                    console.error(err);
                }
                if(data) {
                    fs.writeFile(path.join(process.cwd(),directorio,'package.json'), data);
                }
            });
      }
  }
  else{
    console.log("Especifique al menos el nombre del directorio");
  }

}