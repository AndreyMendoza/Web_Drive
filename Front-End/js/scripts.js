var app = angular.module('app', ['ngRoute', 'ngCookies', 'angularTreeview']);
// en caso de que necesitemos clonar un objeto JSON
JSON.clone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};

function notificarMapaCargado() {
    mapaCargado = true;
    console.log("Mapa cargado");
}

function focus(eName) {
    window.setTimeout('document.getElementById("' + eName + '").focus()', 100);
}
host = "http://localhost:33150/WebService/api/";
// control del archivo html que se carga en el ngview de la página dependiendo del path en la url
app.config(function ($routeProvider) {
    $routeProvider.when("/login", {
        templateUrl: "subPages/login.html"
        , controller: "login"
    }).when("/registro", {
        templateUrl: "subPages/registro.html"
        , controller: "registro"
    }).when("/verArchivos", {
        templateUrl: "subPages/misArchivos.html"
        , controller: "misArchivos"
    }).when("/busqueda", {
        templateUrl: "subPages/busqueda.html"
        , controller: "busqueda"
    }).when("/cambiarPass", {
        templateUrl: "subPages/cambiarPass.html"
        , controller: "cambiarPass"
    }).when("/treeNode", {
        templateUrl: "subPages/treeNode.html"
        , controller: "treeNode"
    }).when("/verPerfil/:idUsuario", {
        templateUrl: "subPages/verPerfil.html"
        , controller: "verPerfil"
    }).when("/", {
        templateUrl: "subPages/misArchivos.html"
        , controller: "misArchivos"
    }).otherwise({
        redirectTo: "/login"
    });
});

/* CONTROLADOR PRINCIPAL */
app.controller("mainController", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    $rootScope.verDetalles = function (ForoID) {
        $location.path("verInfo/" + ForoID);
    };
    // include de un archivo de la carpeta subPages
    $rootScope.cargarPopup = function (nombreArchivo) {
        if (nombreArchivo != "") {
            $rootScope.templateUrl = "popups/" + nombreArchivo + ".php";
        }
        else {
            $rootScope.templateUrl = "";
        }
    };
    $rootScope.irA = function (path) {
        $location.path(path);
    };
    // setea la variable fechaHora
    function actualizarFechaHora() {
        $rootScope.fechaHora = $filter('date')(new Date(), "dd/MM/yyyy hh:mm:ss a", "-0600");
    }
    $interval(actualizarFechaHora, 1000);
    // para mostrar el nombre del panel actual
    $rootScope.nombrePanelActual = "";
    // **** Datos de Usuario ****
    $rootScope.idUsuarioActivo = null;
    $rootScope.userUsuarioActivo = "";
    $rootScope.nombreUsuarioActivo = "";
    $rootScope.tipoUsuarioActivo = "";
    $rootScope.sesionIniciada = false;
    $rootScope.ForoSeleccionado = null;
    // PARA CONTROLAR LA SESION
    $rootScope.sesionActiva = function () {
        if ($rootScope.sesionIniciada) {
            return true;
        }
        else if ($cookies.getObject("sesion")) {
            // carga las variables necesarias para garantizar el correcto funcionamiento de la aplicacion
            var sesion = $cookies.getObject("sesion");
            $rootScope.idUsuarioActivo = sesion.idUsuarioActivo;
            $rootScope.userUsuarioActivo = sesion.userUsuarioActivo;
            $rootScope.nombreUsuarioActivo = sesion.nombreUsuarioActivo;
            $rootScope.tipoUsuarioActivo = sesion.tipoUsuarioActivo;
            $rootScope.sesionIniciada = true;
            var tiempo = new Date();
            tiempo.setHours(tiempo.getHours() + 12); // guardamos la sesion por 12 horas
            $cookies.putObject("sesion", sesion, {
                expires: tiempo
            });
            return true;
        }
        else {
            return false;
        }
    };
    $rootScope.cerrarSesion = function () {
        $cookies.remove("sesion");
        $rootScope.idUsuarioActivo = null;
        $rootScope.userUsuarioActivo = "";
        $rootScope.nombreUsuarioActivo = "";
        $rootScope.tipoUsuarioActivo = "";
        $rootScope.sesionIniciada = false;
        $location.path("login");
    };
});
/* LOGIN */
app.controller("login", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if ($rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("/");
    }
    else {
        $rootScope.nombrePanelActual = "";
        $scope.ingresar = function (user, pass) {
            $log.log("Login Cuenta");
            $log.log(user + " -- "+pass);
            
            
            $http.get(host + "Usuario/login?usuario="+user+"&password="+pass).then(function (data)  {
                $log.log(data);
                var data = data.data;
                if (data.mensaje == "OK") {
                    
                    // guardar la sesion en una cookie
                    var sesion = {};
                    sesion.nombreUsuarioActivo = user;
                    
                    //Guardado de la cookie
                    var tiempo = new Date();
                    tiempo.setHours(tiempo.getHours() + 1); // guardamos la sesion por 1 hora
                    $cookies.putObject("sesion", sesion, {
                        expires: tiempo
                    });
                    
                    // actualizamos las variables de sesion
                    $rootScope.nombreUsuarioActivo = sesion.nombreUsuarioActivo;
                    
                    //$rootScope.userUsuarioActivo = sesion.userUsuarioActivo;
                    $rootScope.sesionIniciada = true;
                    $location.path("/");
                } else {
                    $log.log(data.mensaje);
                    alert(data.mensaje);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
            
            /*var sesion = {};
            sesion.idUsuarioActivo = 201515424;
            sesion.nombreUsuarioActivo = "Armando López";
            sesion.apellido1UsuarioActivo = "usuarioApellido1";
            sesion.apellido2UsuarioActivo = "usuarioApellido2";
            sesion.tipoUsuarioActivo = "admin";
            var tiempo = new Date();
            tiempo.setHours(tiempo.getHours() + 12); // guardamos la sesion por 12 horas
            $cookies.putObject("sesion", sesion, {
                expires: tiempo
            });
            // actualizamos las variables de sesion
            $rootScope.idUsuarioActivo = 201515424;
            $rootScope.nombreUsuarioActivo = "Armando López";
            $rootScope.apellido1UsuarioActivo = "usuarioApellido1";
            $rootScope.apellido2UsuarioActivo = "usuarioApellido2";
            $rootScope.tipoUsuarioActivo = "admin";
            //$rootScope.userUsuarioActivo = sesion.userUsuarioActivo;
            $rootScope.sesionIniciada = true;
            $location.path("/");*/
        }
    }
});

/* REGISTRAR USUARIO */
app.controller("registro", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if ($rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        //$rootScope.cargarArchivo("");
        $location.path("/");
    }
    else {
        // *** agregarUsuario ***
        $scope.AgregarCuenta = function (obj) {
            $log.log("Añadiendo cuenta de usuario", obj);
            
            $http.get(host + "Usuario/agregar_usuario?usuario="+obj.Usuario+"&password="+obj.Contrasenha+"&tamanho="+obj.Bytes).then(function (data) {
                var data = data.data;
                $log.log(data);
                if (data.mensaje == "OK") {
                    $scope.objAgregar = {};
                    alert("Se ha registrado correctamente");
                    $location.path("login");
                }
                else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
    }
});


/* CAMBIO DE CONTRASEÑA USUARIO LOGEADO */
app.controller("cambiarPass", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    }
    else {
        function cambiarPass(objPass) {
            objPass.pPersonaID = $rootScope.idUsuarioActivo;
            $log.log(objPass);
            var fd = new FormData();
            fd.append("obj", JSON.stringify(objPass));
            $http.post(host + "api/modificarPass.php", fd, {
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    $scope.objPass = {};
                    alert("La contraseña se ha cambiado correctamente");
                }
                else {
                    $scope.msjRespuesta = "";
                    alert("Ha ocurrido un error al cambiar la contraseña, intente de nuevo");
                }
            }).catch(function (data) {
                alert("Error de conexion, intente de nuevo");
            })
        }
        $scope.cambiarPass = function (objPass) {
            if (objPass.pContrasenha && objPass.pNuevaContrasenha && objPass.passNuevaConf) {
                if (objPass.pNuevaContrasenha != objPass.passNuevaConf) {
                    alert("Las contraseñas no coinciden");
                }
                else {
                    cambiarPass(objPass);
                }
            }
        };
        $scope.verificarContrasenha = function (p1, p2) {
            if (p1 == p2 && p1 != null && p2 != null) {
                return true;
            }
            return false;
        };
    }
});



/* Popup Editar Archivos */
app.controller("popupEditarArchivos", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    }
    else {
        $scope.Foro = $rootScope.ForoSeleccionado;
        $scope.cargarArchivos = function () {
            var obj = {};
            obj.ForoID = $scope.Foro.ForoID;
            $log.log("Consultando archivos X foro");
            $log.log(obj);
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $http.post(host + "api/VerArchivosXForo.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log("Datos");
                $log.log(data);
                if (data.message == "OK") {
                    $scope.arrayArchivos = data.ArchivosXForo;
                    $log.log("Archivos consultados correctamente");
                }
                else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.agregarArchivo = function (obj) {
            obj.ForoID = $scope.Foro.ForoID;
            $log.log("Agregando archivo al foro");
            $log.log(obj);
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $http.post(host + "api/AgregarArchivoForo.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log("Datos");
                $log.log(data);
                if (data.message == "OK") {
                    //$scope.arrayArchivos = data.ArchivosXForo;
                    $log.log("Archivo agregado correctamente");
                    //Se deben actualizar los archivos
                    $scope.cargarArchivos();
                }
                else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.eliminarArchivo = function (IDArchivo) {
            var txt;
            var resp = confirm("¿Está seguro que desea eliminar el archivo?");
            if (resp == true) {
                var obj = {};
                obj.archivoid = IDArchivo;
                $log.log("Eliminando archivo del foro");
                $log.log(obj);
                var fd = new FormData();
                fd.append("obj", JSON.stringify(obj));
                $http.post(host + "api/EliminarArchivoXForo.php", fd, {
                    headers: {
                        "Content-Type": undefined
                    }
                }).then(function (respuesta) {
                    var data = respuesta.data;
                    $log.log("Datos");
                    $log.log(data);
                    if (data.message == "OK") {
                        //$scope.arrayArchivos = data.ArchivosXForo;
                        $log.log("Archivo eliminado correctamente");
                        //Se deben actualizar los archivos
                        $scope.cargarArchivos();
                    }
                    else {
                        $log.log(data.message);
                    }
                }).catch(function (data) {
                    $log.log("Error de conexion, intente de nuevo");
                })
            }
        }
        $scope.cargarArchivos();
    }
});

/* Mis Articulos */
app.controller("misArchivos", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    }
    else {
        $scope.controlAgregarArchivo = false;
        $scope.controlAgregarCarpeta = false;
        $scope.controlVerArchivo = false;
        $scope.controlEditarArchivo = false;
        $scope.controlCopiar = false;
        $scope.controlMover = false;
        $scope.controlCompartir = false;
        $scope.Archivo = {};
        $scope.Carpeta = {};
        $scope.usuarios = {};
        $scope.tamanhoDirectorioActual = 0;
        
        /*----------------- Controles para los Popups -----------------*/
        $scope.varAgregarArchivo = function (Archivo) {
            if ($scope.controlAgregarArchivo) {
                $scope.controlAgregarArchivo = false;
            }
            else {
                $scope.controlAgregarArchivo = true;
                $scope.Archivo = {};
            }
        }
        /***********************/
        $scope.varAgregarCarpeta = function () {
            if ($scope.controlAgregarCarpeta) {
                $scope.controlAgregarCarpeta = false;
            }
            else {
                $scope.controlAgregarCarpeta = true;
                $scope.Carpeta = {};
            }
        }
        /***********************/
        $scope.varVerArchivo = function(){
            if ($scope.controlVerArchivo) {
                $scope.controlVerArchivo = false;
            }
            else {
                $scope.controlVerArchivo = true;
                $scope.Archivo = {};
            }
        }
        /***********************/
        $scope.varEditarArchivo = function () {
            if ($scope.controlEditarArchivo) {
                $scope.controlEditarArchivo = false;
            }
            else {
                $scope.controlEditarArchivo = true;
                $scope.Archivo = {};
            }
        }
        /***********************/
        $scope.varCopiar = function(){
            if ($scope.controlCopiar) {
                $scope.controlCopiar = false;
            }
            else {
                $scope.controlCopiar = true;
                $scope.Archivo = {};
            }
        }
        /***********************/
        $scope.varMover = function(){
            if ($scope.controlMover) {
                $scope.controlMover = false;
            }
            else {
                $scope.controlMover = true;
                $scope.Archivo = {};
            }
        }
        /***********************/
        $scope.varCompartir = function(){
            if ($scope.controlCompartir) {
                $scope.controlCompartir = false;
            }
            else {
                $scope.controlCompartir = true;
                $scope.Archivo = {};
            }
        }
        
        /*----------------- Funciones de crear archivos y carpetas -----------------*/
        
        $scope.crearArchivo = function(Archivo){
            $log.log("Creando un archivo");
            $log.log(Archivo);
            
            if(!Archivo.chkReemplazar){
                Archivo.chkReemplazar = false;
            }
            if(Archivo.nombre && Archivo.extension && Archivo.contenido){
                
                $http.get(host + "Archivo/crear_archivo?usuario="+$rootScope.nombreUsuarioActivo+"&ruta="+$rootScope.rutaActual+"&nombre="+Archivo.nombre+"&extension="+Archivo.extension+"&contenido="+Archivo.contenido+"&reemplazar="+Archivo.chkReemplazar).then(function (data)  { 
                    var data = data.data;
                    $log.log(data);
                    if (data.mensaje == "OK") {
                        $log.log("Archivo Creado con éxito");
                        $rootScope.verArchivosRaiz($rootScope.rutaActual);
                        $scope.varAgregarArchivo();
                    } else {
                        $log.log("Archivo no creado "+data.mensaje);
                        alert(data.mensaje);
                    }
                }).catch(function (data) {
                    $log.log("Error de conexion, intente de nuevo");
                });    
            }else{
                $log.log("Parámetros incompletos");
                alert("Parámetros incompletos, intente de nuevo");
            }
            
        }
        
        $scope.crearCarpeta = function(Carpeta){
            $log.log("Creando una carpeta");
            $log.log(Carpeta.nombre);
            
            if(Carpeta.nombre){
                $http.get(host + "Archivo/crear_carpeta?usuario="+$rootScope.nombreUsuarioActivo+"&ruta="+$rootScope.rutaActual+"&nombre="+Carpeta.nombre).then(function (data)  { 
                    var data = data.data;
                    $log.log(data);
                    if (data.mensaje == "OK") {
                        $log.log("Carpeta Creada con éxito");
                        $rootScope.verArchivosRaiz($rootScope.rutaActual);
                        $scope.varAgregarCarpeta();
                    } else {
                        $log.log("Carpeta no creado "+data.mensaje);
                        alert(data.mensaje);
                    }
                }).catch(function (data) {
                    $log.log("Error de conexion, intente de nuevo");
                });    
            }else{
                $log.log("Parámetros incompletos");
                alert("Parámetros incompletos, intente de nuevo");
            }
        }
        
        
        /*----------------- Ver y Editar Contenido de un archivo -----------------*/
        $scope.cargarContenido = function(Archivo){
            $http.get(host + "Archivo/ver_archivo?ruta="+Archivo.ruta+"&nombre="+Archivo.Nombre).then(function (data)  {
                var data = data.data;
                $log.log(data);
                if (data.mensaje == "OK") {
                    $scope.Archivo.contenido = data.result[0];
                } else {
                    $log.log(data.mensaje);
                    alert(data.mensaje);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            });
        }
        
        $scope.verContenido = function(Archivo){
            $scope.varVerArchivo();
            $scope.Archivo = Archivo;
            $scope.cargarContenido(Archivo);
        }
        
        $scope.editarContenido = function(Archivo){
            $scope.varEditarArchivo();
            $scope.Archivo = Archivo;
            $scope.cargarContenido(Archivo);
            
        }
        
        /*----------------- Funciones de eliminación -----------------*/
        
        $scope.eliminar = function(Archivo){
            
            $http.get(host + "Archivo/eliminar_archivo?usuario="+$rootScope.nombreUsuarioActivo+ "&ruta="+Archivo.ruta+"&nombre="+Archivo.Nombre+"&tipo="+Archivo.tipo).then(function (data)  {
                var data = data.data;
                $log.log(data);
                if (data.mensaje == "OK") {
                    $rootScope.verArchivosRaiz($rootScope.rutaActual);
                } else {
                    $log.log(data.mensaje);
                    alert(data.mensaje);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            });
        }
        
        $scope.eliminarArchivo = function(Archivo){
            $log.log("Eliminando el archivo: ");
            $log.log(Archivo);
            if (confirm('Seguro que desea eliminar el archivo: '+Archivo.Nombre)) {
                $log.log("Confirmado.. Borrando archivo");
                $scope.eliminar(Archivo);
            } else {
                $log.log("Cancelado");
            }
            
        }
        
        $scope.eliminarCarpeta = function(Carpeta){
            $log.log("Eliminando la carpeta: ");
            $log.log(Carpeta);
            if (confirm('Seguro que desea eliminar la carpeta: '+Carpeta.Nombre)) {
                $log.log("Confirmado.. Borrando carpeta");
                $scope.eliminar(Carpeta);
            } else {
                $log.log("Cancelado");
            }
        }
        
        
        /*----------------- Función para actualizar el contenido del archivo -----------------*/
        $scope.actualizarArchivo = function(Archivo){
            $log.log("Actualizando el archivo: ");
            $log.log(Archivo);
            
            $http.get(host + "Archivo/modificar_archivo?usuario="+$rootScope.nombreUsuarioActivo+"&ruta="+Archivo.ruta+"&nombre="+Archivo.Nombre+"&contenido="+Archivo.contenido).then(function (data)  {
                var data = data.data;
                $log.log(data);
                if (data.mensaje == "OK") {
                    $scope.varEditarArchivo();
                } else {
                    $log.log(data.mensaje);
                    alert(data.mensaje);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            });
        }
        
        /*----------------- Función para ver la carpeta -----------------*/
        $scope.verCarpeta = function(Carpeta){
            $log.log("Viendo la carpeta ");
            $log.log(Carpeta);
            
            $rootScope.rutaActual = Carpeta.ruta;
            $scope.arrayArchivos = Carpeta.hijos;
            $scope.tamanhoDirectorioActual = Carpeta.tamanho;
        }
        
        
        /*----------------- Función para copiar un archivo o carpeta -----------------*/
        $scope.copiar = function(Archivo){
            $scope.varCopiar();
            if(Archivo.tipo == "ARCHIVO"){
                $scope.cargarContenido(Archivo);
            }
            $scope.Archivo = Archivo;
        }
        
        $scope.moverArchivo = function(Archivo, ruta, eliminar){
            if(Archivo.Nombre && Archivo.contenido){
                $http.get(host + "Archivo/crear_archivo?usuario="+$rootScope.nombreUsuarioActivo+"&ruta="+ruta+"&nombre="+Archivo.Nombre+"&extension=.txt"+"&contenido="+Archivo.contenido+"&reemplazar=true").then(function (data)  { 
                    var data = data.data;
                    $log.log(data);
                    if (data.mensaje == "OK") {
                        $log.log("Archivo Copiado con éxito");
                        if(eliminar){
                            $scope.eliminar(Archivo);
                            $scope.varMover();
                        }
                    } else {
                        $log.log("Archivo no copiado "+data.mensaje);
                        alert(data.mensaje);
                    }
                }).catch(function (data) {
                    $log.log("Error de conexion, intente de nuevo");
                });    
            }else{
                $log.log("Parámetros incompletos");
                alert("Parámetros incompletos, intente de nuevo");
            }
            
        }
        
        $scope.copiarVV = function(Archivo, ruta){
            if(Archivo.tipo =="ARCHIVO"){
                if(ruta){
                    //$scope.cargarContenido(Archivo);
                    $log.log("Copiando el archivo: ");
                    $log.log(Archivo);
                    $log.log("En el directorio: ");
                    $log.log(ruta);
                    
                    $scope.moverArchivo(Archivo, ruta, false);
                    
                    $scope.varCopiar();

                }else{
                    alert("Debe de seleccionar una ruta destino");
                }    
            }else{
                
            }
        }
        
        /*----------------- Función de compartir un archivo/carpeta con otro usuario -----------------*/
        $scope.cargarUsuarios = function(){
            $http.get(host + "Usuario/cargar_usuarios?usuario="+$rootScope.nombreUsuarioActivo).then(function (data)  { 
                var data = data.data;
                $log.log(data);
                if (data.mensaje == "OK") {
                    $log.log("Usuarios cargados correctamente");
                    $scope.usuarios = data.result[0];
                } else {
                    $log.log("Usuarios no cargados "+data.mensaje);
                    alert(data.mensaje);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            });    
        }
        
        $scope.compartir = function(Archivo){
            $scope.varCompartir();
            if(Archivo.tipo == "ARCHIVO"){
                $scope.cargarContenido(Archivo);
            }
            $scope.Archivo = Archivo;
            $scope.cargarUsuarios();
        }
        $scope.cambiarUsuario = function(usuario){
            $scope.usuarioSeleccionado = usuario;
        }
        
        $scope.compartirArchivo = function(Archivo, usuario, ruta, compartir){
            if(Archivo.Nombre && Archivo.contenido){
                $http.get(host + "Archivo/crear_archivo?usuario="+usuario+"&ruta="+ruta+"&nombre="+Archivo.Nombre+"&extension=.txt"+"&contenido="+Archivo.contenido+"&reemplazar=true").then(function (data)  { 
                    var data = data.data;
                    $log.log(data);
                    if (data.mensaje == "OK") {
                        $log.log("Archivo Compartido con éxito");
                        if(compartir){
                            $scope.varCompartir();
                        }
                    } else {
                        $log.log("Archivo no Compartido "+data.mensaje);
                        alert(data.mensaje);
                    }
                }).catch(function (data) {
                    $log.log("Error de conexion, intente de nuevo");
                });    
            }else{
                $log.log("Parámetros incompletos");
                alert("Parámetros incompletos, intente de nuevo");
            }
            
        }
        
        $scope.compartirElemento = function(Archivo, ruta){
            $log.log("Compartiendo el archivo: ");
            $log.log(Archivo);
            if(Archivo.tipo =="ARCHIVO"){
                if(ruta){
                    $scope.cargarContenido(Archivo);
                    $log.log("Compartiendo el archivo: ");
                    $log.log(Archivo);
                    var rutaFinal = ruta + "/Archivos Compartidos";
                    $log.log("Con el usuario: ");
                    $log.log(rutaFinal);
                    
                    $scope.compartirArchivo(Archivo, ruta, rutaFinal, true);
                }else{
                    alert("Debe de seleccionar un usuario de destino");
                }
            }else{
                
            }
            
        }
        
        /*----------------- Función de mover un archivo/carpeta -----------------*/
        $scope.mover = function(Archivo){
            $scope.varMover();
            if(Archivo.tipo == "ARCHIVO"){
                $scope.cargarContenido(Archivo);
            }
            $scope.Archivo = Archivo;
        }
        
        $scope.moverElemento = function(Archivo, ruta){
            if(Archivo.tipo =="ARCHIVO"){
                if(ruta){
                    var archivoDelete = Archivo;
                    $log.log("Moviendo el archivo: ");
                    $log.log(Archivo);
                    $log.log("En el directorio: ");
                    $log.log(ruta);

                    $scope.moverArchivo(Archivo, ruta, true);
                    $scope.verArchivosRaiz($rootScope.rutaActual);    
                }else{
                    alert("Debe de seleccionar una ruta destino");
                }
            }else{
                
            }
        }
        
        /*----------------- Función para ver todos los archivos en una ruta específica -----------------*/
        $rootScope.verArchivosRaiz = function (ruta) {
            $http.get(host + "Archivo/buscar_directorio?usuario="+$rootScope.nombreUsuarioActivo+"&ruta="+ruta).then(function (data)  {
                var data = data.data;
                $log.log(data);
                if (data.mensaje == "OK") {
                    var result = data.result[0];
                    $scope.arrayArchivos = result.hijos;
                    $rootScope.rutaActual = result.ruta;
                    $scope.tamanhoDirectorioActual = result.tamanho;
                    $rootScope.treedata = result.hijos;
                } else {
                    $log.log(data.mensaje);
                    alert(data.mensaje);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            });
        };
        
        /*----------------------------------------------------------------*/
        if($rootScope.controlCargarDirectorioEspecifico){
            $rootScope.verArchivosRaiz($rootScope.rutaActual);
            $rootScope.controlCargarDirectorioEspecifico = false;
        }else{
            $rootScope.verArchivosRaiz($rootScope.nombreUsuarioActivo);    
        }
    }
});

/* Ver perfil de una persona */
app.controller("treeNode", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log, $routeParams) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    }
    else {
        $scope.treedata = 
        [
            { "label" : "User", "id" : "role1", "children" : [
                { "label" : "subUser1", "id" : "role11", "children" : [] },
                { "label" : "subUser2", "id" : "role12", "children" : [
                    { "label" : "subUser2-1", "id" : "role121", "children" : [
                        { "label" : "subUser2-1-1", "id" : "role1211", "children" : [] },
                        { "label" : "subUser2-1-2", "id" : "role1212", "children" : [] }
                    ]}
                ]}
            ]},
            { "label" : "Admin", "id" : "role2", "children" : [] },
            { "label" : "Guest", "id" : "role3", "children" : [] }
        ];
    }
});

/* Ver perfil de una persona */
app.controller("verPerfil", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log, $routeParams) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    }
    else {
        var idUsuario = $routeParams.idUsuario;
        $scope.idUsuario = idUsuario;
        $scope.nombreUsuario = $rootScope.nombreUsuarioActivo;
        $scope.datosPerfil = {
            "espacioTotal": 1024
            , "espacioDisponible": 500
        };
    }
});

/* Busqueda de archivos */
app.controller("busqueda", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    }
    else {
        $rootScope.verArchivosRaiz($rootScope.nombreUsuarioActivo);
        
        $scope.cargarArchivos = function(ruta){
            $log.log("Cargando archivos de la ruta: "+ruta);
            $rootScope.rutaActual = ruta;
            $rootScope.controlCargarDirectorioEspecifico = true;
            $location.path("#!/verArchivos");
        };
        
    }
});

/* Plantilla controller */
app.controller("plantilla", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    }
    else {}
});
