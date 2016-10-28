# Sistemas y Tecnologías Web. Nueva Funcionalidad para el Paquete npm plugins

## Introducción

El objetivo de esta práctica es extender el package NodeJS publicado en npm en una práctica anterior con una nueva funcionalidad que permita que los usuarios con conocimientos de NodeJS puedan extender la conducta del ejecutable para que este realice el despliegue en una máquina de **iaas.ull.es**.
Para ello, el plugin utilizado se puede encontrar en [gitbook-start-iaas-ull-es-alex-moi](https://www.npmjs.com/package/gitbook-start-iaas-ull-es-alex-moi).

##Instalación

```shell
npm install -g gitbook-start-alex-moi-nitesh
npm install --save gitbook-start-alex-moi-nitesh
```

##Tutorial para su ejecución

Para ejecutar, ponemos el siguiente comando:

`gitbook-start-alex-moi-nitesh [opciones]`

[opciones] serían:
*    -a: Especificar el autor del gitbook
*    -n: Especificar el nombre del gitbook
*    -c: Especificar el nombre del directorio
*    -u: Especificar la url del repositorio git
*    -h: Help (ayuda)
*    -d: Realizar un deploy a IaaS

Si queremos que al ejecutar el comando se nos genere una estructura de directorios es necesario especificar la opción '-c', excepto en el caso de realizar un deploy-iaas(opción -d) en cuyo caso se genera un directorio por defecto.

El resto de opciones(-a, -n, -u, -h) son totalmente opcionales en cualquier ejecución del paquete que se desee realizar.

Una vez instalado y ejecutado, hacemos:

```shell
npm install
gitbook install
```

Una vez completado los "ficheros.md" de nuestro book, para construirlo y publicarlo en github (gh-pages) hacemos:

```shell
gulp build
gulp deploy
```

Un ejemplo de la versión final del gitbook sería: [Ejemplo](https://alu0100782851.github.io/prueba/)

##Funcionamiento del argumento "-d"

Este argumento se corresponde con la opción del deploy en el iaas y tiene asociado dos argumentos mas que deben ser especificados obligatoriamente, ademas de los restantes de los que dispone el paquete.

Por tanto, la ejecución se llevaría a cabo de la siguiente manera:

`gitbook-start-alex-moi-nitesh -d iaas-ull-es [Obligatorias] [Otras Opciones]`

[Obligatorias] serían:
```
--iaas_ip: Especificar la IP del IaaS
	Ejemplo: 10.2.1.128
--iaas_path: Especificar la PATH de IaaS(sin '/' al final de la ruta)
	Ejemplo: /home/nombre_usuario/ruta
```


[Otras Opciones] serían:

```
-a: Especificar el autor del gitbook
-n: Especificar el nombre del gitbook
-c: Especificar el nombre del directorio
-u: Especificar la url del repositorio git
```

Ejemplo con la parte obligatoria:
`gitbook-start-alex-moi-nitesh -d iaas-ull-es --iaas_ip 192.162.30.50 --iaas_path /home/usuario/MyPath`

Con la parte obligarotia, se crea el gitbook:
*   sin un nombre del autor
*   sin un nombre del gitbook
*   sin una URL para el repositorio
*   con nombre del directorio: /Book (por defecto)

Ahora bien, si queremos especificarle las otras opciones, pondríamos:

*   Ejemplo Completo:
`gitbook-start-alex-moi-nitesh -d iaas-ull-es --iaas_ip 192.162.30.50 --iaas_path /home/usuario/MyPath -a AuthorsName -n MyGitbook -c /MyDirectorio -u http://MyUrl.git` 


## Enlaces importantes
*  [Página en NPM gitbook-start-alex-moi-nitesh](https://www.npmjs.com/package/gitbook-start-alex-moi-nitesh)
*  [Página en NPM gitbook-start-iaas-ull-es-alex-moi Plugin](https://www.npmjs.com/package/gitbook-start-iaas-ull-es-alex-moi)
*  [Repositorio GitHub](https://github.com/ULL-ESIT-SYTW-1617/gitbook-start-iaas-ull-es-alex-moi)
*  [Descripción de la práctica](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicaplugin.html)
*  [Campus Virtual](https://campusvirtual.ull.es/1617/course/view.php?id=1175)

## Autores

* Alexander Cole Mora | [Página Personal](http://alu0100767421.github.io/)
* Moisés Yanes Carballo | [Página Personal](http://alu0100782851.github.io/)
