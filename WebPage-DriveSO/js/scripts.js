var app = angular.module('app', ['ngRoute', 'ngCookies']);
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
host = "http://localhost:8080/democraticacr/";
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
    }).when("/verInfo/:idVer", {
        templateUrl: "subPages/verInfo.html"
        , controller: "verInfo"
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
            /*var obj = {}
            obj.usuario = user;
            obj.contrasenha = pass;
            $log.log("Login Cuenta");
            $log.log(obj);
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $http.post(host + "api/IniciarSesion.php", fd, {
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    var usuario = data.infoUsuario;
                    // guardar la sesion en una cookie
                    var sesion = {};
                    sesion.idUsuarioActivo = usuario.PersonaID;
                    sesion.nombreUsuarioActivo = usuario.Nombre;
                    sesion.apellido1UsuarioActivo = usuario.Apellido1;
                    sesion.apellido2UsuarioActivo = usuario.Apellido2;
                    sesion.tipoUsuarioActivo = usuario.TipoUsuario;
                    var tiempo = new Date();
                    tiempo.setHours(tiempo.getHours() + 12); // guardamos la sesion por 12 horas
                    $cookies.putObject("sesion", sesion, {
                        expires: tiempo
                    });
                    // actualizamos las variables de sesion
                    $rootScope.idUsuarioActivo = sesion.idUsuarioActivo;
                    $rootScope.nombreUsuarioActivo = sesion.nombreUsuarioActivo;
                    $rootScope.apellido1UsuarioActivo = sesion.apellido1UsuarioActivo;
                    $rootScope.apellido2UsuarioActivo = sesion.apellido2UsuarioActivo;
                    $rootScope.tipoUsuarioActivo = sesion.tipoUsuarioActivo;
                    //$rootScope.userUsuarioActivo = sesion.userUsuarioActivo;
                    $rootScope.sesionIniciada = true;
                    $location.path("/");
                } else {
                    $log.log(data.message);
                    alert("Datos incorrectos, intente de nuevo");
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
            */
            var sesion = {};
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
            $location.path("/");
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
            obj.TipoUsuario = "regular";
            var fd = new FormData();
            $log.log("agregando cuenta");
            $log.log(obj);
            fd.append("obj", JSON.stringify(obj));
            $http.post(host + "api/AgregarCuenta.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
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
        $scope.Archivo = {};
        $scope.Carpeta = {};
        
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
        
        
        /*----------------- Funciones de crear archivos y carpetas -----------------*/
        $scope.crearArchivo = function(Archivo){
            $log.log("Creando un archivo");
            $log.log(Archivo);
        }
        
        $scope.crearCarpeta = function(Carpeta){
            $log.log("Creando una carpeta");
            $log.log(Carpeta);
        }
        
        
        /*----------------- Ver y Editar Contenido de un archivo -----------------*/
        $scope.verContenido = function(Archivo){
            $scope.varVerArchivo();
            $scope.Archivo = $scope.arrayArchivos [2];
            
        }
        $scope.editarContenido = function(Archivo){
            $scope.varEditarArchivo();
            $scope.Archivo = $scope.arrayArchivos [3];
            
        }
        
        
        /*----------------- Funciones de eliminación -----------------*/
        $scope.eliminarArchivo = function(ArchivoID, Nombre){
            $log.log("Eliminando el archivo: ");
            $log.log(ArchivoID);
            if (confirm('Seguro que desea eliminar el archivo: '+Nombre)) {
                $log.log("Confirmado.. Borrado");
            } else {
                $log.log("Cancelado");
            }
        }
        
        $scope.eliminarCarpeta = function(CarpetaID, Nombre){
            $log.log("Eliminando la carpeta: ");
            $log.log(CarpetaID);
            if (confirm('Seguro que desea eliminar la carpeta: '+Nombre)) {
                $log.log("Confirmado.. Borrada");
            } else {
                $log.log("Cancelado");
            }
        }
        
        /*----------------- Función de compartir un archivo con otro usuario -----------------*/
        $scope.compartirArchivo = function(ArchivoID, Nombre){
            $log.log("Compartiendo el archivo: "+ Nombre);
            $log.log(ArchivoID);
            
        }
        
        
        /*----------------- Función para actualizar el contenido del archivo -----------------*/
        $scope.actualizarArchivo = function(Archivo){
            $log.log("Actualizando el archivo: "+ Archivo.nombre);
            
        }
        
        /*----------------- Función para ver la carpeta -----------------*/
        $scope.verCarpeta = function(CarpetaID){
            $log.log("Viendo la carpeta "+ CarpetaID)
        }
        
        
        /*----------------- Función para ver todos los archivos en una ruta específica -----------------*/
        $scope.verArchivos = function () {
            
            $scope.arrayArchivos = [
                {
                    "nombre": "Los Bandoleros",
                    "fechaCreado": "10/11/2018",
                    "fechaModificado": "20/11/2019",
                    "tamanho": 600,
                    "extension": "C:/Users/Armando/Dropbox/TEC",
                    "tipo": 0,
                    "id": 1,
                    "contenido": ""
                },
                {
                    "nombre": "Harry Potter",
                    "fechaCreado": "20/11/2016",
                    "fechaModificado": "22/12/2016",
                    "tamanho": 500,
                    "extension": "C:/Users/Armando/Dropbox/TEC",
                    "tipo": 0,
                    "id": 2,
                    "contenido": ""
                },
                {
                    "nombre": "Outer Space",
                    "fechaCreado": "21/08/2015",
                    "fechaModificado": "02/11/2016",
                    "tamanho": 400,
                    "extension": "C:/Users/Armando/Dropbox/TEC",
                    "tipo": 1,
                    "id": 3,
                    "contenido": "Usualmente los artículos son breves y poco accesibles a los no especialistas. La introducción no suele explicar en detalle ciertos asuntos técnicos y en su lugar se remite a otras referencias que sí contienen dichos detalles. En general, un lector que no conozca lo esencial de las referencias puede tener dificultades de comprensión, ya que los artículos científicos no son obras de divulgación y están destinados a un público con conocimientos específicos, con el objeto de ser escritos breves."
                },
                {
                    "nombre": "Tego Calderon",
                    "fechaCreado": "10/11/2018",
                    "fechaModificado": "22/10/2019",
                    "tamanho": 300,
                    "extension": "C:/Users/Armando/Dropbox/TEC",
                    "tipo": 1,
                    "id": 4,
                    "contenido": "Cuando un trabajo no está aún publicado, pero ya ha sido aceptado por el comité editorial para su publicación, se dice que está «en prensa». Para el principios del siglo XXI se estimó que el número de artículos científicos publicados en el mundo tenía un crecimiento exponencial, duplicándose el número total de artículos publicados cada 9 años2​1​ Hacia 2012 el número de artículos publicados al años se estimaba en 1,8 millones (algo más de 1/3 de los mismos pertenecían a publicaciones sobre ciencias naturales). Además los datos muestran que el desempeño científico internacional está fuertemente correlacionado en el PIB, debido a que los países con mayor ingreso nacional destinan una mayor cantidad de recursos a la investigación científica."
                },
                {
                    "nombre": "Don Omar",
                    "fechaCreado": "21/11/2015",
                    "fechaModificado": "03/10/2016",
                    "tamanho": 200,
                    "extension": "C:/Users/Armando/Dropbox/TEC",
                    "tipo": 1,
                    "id": 5,
                    "contenido": "En ocasiones los artículos científicos son síntesis de informes o tesis de mayor envergadura, que orientan los esfuerzos de quienes puedan estar interesados en consultar la obra original. A veces la palabra inglesa paper posee una acepción ligeramente más amplia, pues incluye también a las ponencias."
                },
                {
                    "nombre": "Manhattan Streets",
                    "fechaCreado": "19/11/2017",
                    "fechaModificado": "20/11/2019",
                    "tamanho": 100,
                    "extension": "C:/Users/Armando/Dropbox/TEC",
                    "tipo": 1,
                    "id": 6,
                    "contenido": "Los artículos científicos deben estar cuidadosamente redactados para expresar de un modo claro y sintético lo que se pretende comunicar, e incluir las citas y referencias bibliográficas indispensables para contextualizar, justificar y verificar los antecedentes e ideas o datos previos contenidos en el trabajo. El contenido debe exponer además toda la información necesaria para poder reproducir los resultados originales que se dan a conocer en el mismo"
                }
                
        ];
            
        };
        
        $scope.verArchivos();
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
        $scope.buscarArchivos = function (obj) {
            $log.log("Buscando Archivos");
            /*$log.log(obj);
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $http.post(host + "api/buscarUsuario.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log("Datos");
                $log.log(data);
                if (data.message == "OK") {
                    $scope.usuariosEncontrados = data.PersonasEncontradas;
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })*/
            var json = {
                "archivos": [
                    {
                        "nombre": "Archivo1"
                        , "id": 1
                    }
                    , {
                        "nombre": "Archivo2"
                        , "id": 2
                    }
                    , {
                        "nombre": "Archivo3"
                        , "id": 3
                    }
                            ]
            };
            $scope.archivosEncontrados = json;
        }
    }
});
/* Plantilla controller */
app.controller("plantilla", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    }
    else {}
});