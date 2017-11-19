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
        templateUrl: "subPages/login.html",
        controller: "login"
    }).when("/registro", {
        templateUrl: "subPages/registro.html",
        controller: "registro"
    }).when("/misForos", {
        templateUrl: "subPages/misForos.html",
        controller: "misForos"
    }).when("/verForos", {
        templateUrl: "subPages/verForos.html",
        controller: "verForos"
    }).when("/misEventos", {
        templateUrl: "subPages/misEventos.html",
        controller: "misEventos"
    }).when("/verEventos", {
        templateUrl: "subPages/verEventos.html",
        controller: "verEventos"
    }).when("/misArticulos", {
        templateUrl: "subPages/misArticulos.html",
        controller: "misArticulos"
    }).when("/verArticulos", {
        templateUrl: "subPages/verArticulos.html",
        controller: "verArticulos"
    }).when("/administrarElecciones", {
        templateUrl: "subPages/administrarElecciones.html",
        controller: "administrarElecciones"
    }).when("/verElecciones", {
        templateUrl: "subPages/verElecciones.html",
        controller: "verElecciones"
    }).when("/misProyectos", {
        templateUrl: "subPages/misProyectos.html",
        controller: "misProyectos"
    }).when("/verProyectos", {
        templateUrl: "subPages/verProyectos.html",
        controller: "verProyectos"
    }).when("/busqueda", {
        templateUrl: "subPages/busqueda.html",
        controller: "busqueda"
    }).when("/cambiarPass", {
        templateUrl: "subPages/cambiarPass.html",
        controller: "cambiarPass"
    }).when("/verInfo/:idVer", {
        templateUrl: "subPages/verInfo.html",
        controller: "verInfo"
    }).when("/verPerfil/:idUsuario", {
        templateUrl: "subPages/verPerfil.html",
        controller: "verPerfil"
    }).when("/verDenuncias", {
        templateUrl: "subPages/verDenuncias.html",
        controller: "verDenuncias"
    }).when("/administrarElecciones", {
        templateUrl: "subPages/administrarElecciones.html",
        controller: "administrarElecciones"
    }).when("/", {
        templateUrl: "subPages/noticias.html",
        controller: "noticias"
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
        } else {
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
        } else if ($cookies.getObject("sesion")) {
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
        } else {
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
    } else {
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
    } else {
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
                } else {
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
    } else {
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
                } else {
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
                } else {
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

/* Popup Miembros Foro */
app.controller("popupMiembrosForo", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    } else {
        $scope.Foro = $rootScope.ForoSeleccionado;
        $scope.buscarUsuarios = function (obj) {
            $log.log("Buscando Usuarios");
            $log.log(obj);
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
                    $scope.arrayUsuarios = data.PersonasEncontradas;
                    $log.log("Usuarios consultados correctamente");
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.agregarMiembro = function (PersonaID) {
            $log.log("Añadiendo miembro al foro");
            var obj = {};
            obj.pForoID = $scope.Foro.ForoID;
            obj.pPersonaID = PersonaID;
            $log.log(obj);
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $http.post(host + "api/AgregarAccesoXForo.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log("Datos");
                $log.log(data);
                if (data.message == "OK") {
                    $scope.verMiembros();
                    $log.log("Miembro agregado correctamente");
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.eliminarMiembro = function (PersonaID) {
            var resp = confirm("¿Está seguro que desea eliminar el integrante?");
            if (resp == true) {
                var obj = {};
                obj.pForoID = $scope.Foro.ForoID;
                obj.pPersonaID = PersonaID;
                $log.log("Eliminando miembro");
                $log.log(obj);
                var fd = new FormData();
                fd.append("obj", JSON.stringify(obj));
                $http.post(host + "api/EliminarAccesoXForo.php", fd, {
                    headers: {
                        "Content-Type": undefined
                    }
                }).then(function (respuesta) {
                    var data = respuesta.data;
                    $log.log("Datos");
                    $log.log(data);
                    if (data.message == "OK") {
                        $log.log("Miembro eliminado correctamente");
                        $scope.verMiembros();
                    } else {
                        $log.log(data.message);
                    }
                }).catch(function (data) {
                    $log.log("Error de conexion, intente de nuevo");
                })
            }
        }
        $scope.verMiembros = function () {
            var obj = {};
            obj.pForoID = $scope.Foro.ForoID;
            $log.log("Ver miembros X foro");
            $log.log(obj);
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $http.post(host + "api/VerMiembrosXForo.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log("Datos");
                $log.log(data);
                if (data.message == "OK") {
                    $scope.arrayMiembros = data.MiembrosXForo;
                    $log.log("Miembros consultados correctamente");
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.verMiembros();
    }
});
/* Popup Editar Preguntas del Foro */
app.controller("popupEditarPreguntas", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    } else {
        $scope.Foro = $rootScope.ForoSeleccionado;
        $scope.cargarPreguntas = function () {
            var obj = {};
            obj.ForoID = $scope.Foro.ForoID;
            $log.log("Consultando preguntas X foro");
            $log.log(obj);
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $http.post(host + "api/VerEncuestaXForo.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log("Datos");
                $log.log(data);
                if (data.message == "OK") {
                    $scope.arrayPreguntas = data.EncuestaXForo;
                    $log.log("Preguntas consultados correctamente");
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }

        $scope.agregarPregunta = function (obj) {
            obj.ForoID = $scope.Foro.ForoID;
            $log.log("Agregando pregunta al foro");
            $log.log(obj);
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $http.post(host + "api/AgregarEncuesta.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log("Datos");
                $log.log(data);
                if (data.message == "OK") {
                    $log.log("Pregunta agregada correctamente");
                    //Se deben actualizar los archivos
                    $scope.cargarPreguntas();
                    obj.Descripcion = "";
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }


        $scope.eliminarPregunta = function (obj) {
            var txt;
            var resp = confirm("¿Está seguro que desea eliminar la pregunta?");
            if (resp == true) {
                $log.log("Eliminando pregunta del foro");
                $log.log(obj);
                var fd = new FormData();
                fd.append("obj", JSON.stringify(obj));
                $http.post(host + "api/EliminarPregunta.php", fd, {
                    headers: {
                        "Content-Type": undefined
                    }
                }).then(function (respuesta) {
                    var data = respuesta.data;
                    $log.log("Datos");
                    $log.log(data);
                    if (data.message == "OK") {
                        $log.log("Pregunta eliminada correctamente");
                        //Se deben actualizar los archivos
                        $scope.cargarPreguntas();
                    } else {
                        $log.log(data.message);
                    }
                }).catch(function (data) {
                    $log.log("Error de conexion, intente de nuevo");
                })
            }
        }

        $scope.cargarPreguntas();
    }
});
/* Popup Editar Archivos */
app.controller("popupEditarArchivos", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    } else {
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
                } else {
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
                } else {
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
                    } else {
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
app.controller("misArticulos", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    } else {
        $scope.controlAgregarArticulo = false;
        $scope.controlEditarArticulo = false;
        $scope.Articulo = {}; //Todo artículo es un foro..

        $scope.varEditarArticulo = function (Articulo) {
            if ($scope.controlEditarArticulo) {
                $scope.controlEditarArticulo = false;
            } else {
                $scope.controlEditarArticulo = true;
                $scope.Articulo = JSON.clone(Articulo);
                //Se cargan los datos en los campos para editarlos
                if ($scope.Articulo.Privado == "1") {
                    $scope.Articulo.Privado = true;
                } else {
                    $scope.Articulo.Privado = false;
                }
            }
        }
        $scope.varAgregarArticulo = function () {
            if ($scope.controlAgregarArticulo) {
                $scope.controlAgregarArticulo = false;
            } else {
                $scope.controlAgregarArticulo = true;
                $scope.Articulo = {};
            }
        }
        $scope.editarArticulo = function (obj) {
            obj.Privacidad = 1;
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log("Editando Articulo");
            $log.log(obj);
            $http.post(host + "api/ActualizarForo.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    $log.log("Articulo Editado correctamente");
                    $scope.verArticulos();
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.crearArticulo = function (obj) {
            $log.log(obj);
            obj.Tipo = "Articulo";
            obj.Propietario = $rootScope.idUsuarioActivo;
            obj.Privacidad = 1;
            var fd = new FormData();
            $log.log(obj);
            fd.append("obj", JSON.stringify(obj));
            $log.log("Creando Articulo");
            $http.post(host + "api/AgregarForo.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    $log.log("Articulo registrado correctamente");
                    $scope.verArticulos();
                    $scope.Articulo = {};
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.eliminarArticulo = function (ForoID) {
            var resp = confirm("¿Está seguro que desea eliminar el Artículo?");
            if (resp == true) {
                $log.log("You pressed OK!");
                var obj = {};
                obj.ForoID = ForoID;
                var fd = new FormData();
                fd.append("obj", JSON.stringify(obj));
                $log.log("Eliminando Artículo");
                $log.log(obj);
                $http.post(host + "api/EliminarForo.php", fd, {
                    headers: {
                        "Content-Type": undefined
                    }
                }).then(function (respuesta) {
                    var data = respuesta.data;
                    $log.log("Datos");
                    $log.log(data);
                    if (data.message == "OK") {
                        $log.log("Borrado con éxito");
                        $scope.verArticulos(); //Se actualizan los Artículos
                    } else {
                        $log.log(data.message);
                    }
                }).catch(function (data) {
                    $log.log("Error de conexion, intente de nuevo");
                })
            } else {
                $log.log("You pressed Cancel!");
            }
        }
        $scope.verArticulos = function () {
            var obj = {};
            obj.UsuarioID = $rootScope.idUsuarioActivo;
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log("Consultando mis Artículos");
            $http.post(host + "api/VerArticulosXUsuario.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log("Datos");
                $log.log(data);
                if (data.message == "OK") {
                    $scope.arrayArticulos = data.ArticulosXUsuario;
                    $log.log("Se han consultado correctamente");
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.verArticulos();
    }
});
/* Mis Eventos */
app.controller("misEventos", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    } else {
        var map = null;

        function initMap(scope) {
            var Tec = {
                lat: 9.857422,
                lng: -83.912486
            };
            if (map == null) {
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 17,
                    center: Tec
                });
            }
            var marker1 = new google.maps.Marker({
                position: Tec,
                map: null
            });
            map.addListener('click', function (e) {
                scope.latLngSelected = e.latLng;
                marker1.setMap(null);
                marker1 = new google.maps.Marker({
                    position: e.latLng,
                    map: map
                })
            });
        }
        var marker = null;
        var mapEdit = null;

        function initMapEdit(scope) {
            var Position = new google.maps.LatLng(scope.Evento.Latitud, scope.Evento.Longitud);
            if (mapEdit == null) {
                mapEdit = new google.maps.Map(document.getElementById('mapEdit'), {
                    zoom: 17,
                    center: Position
                });
            }
            if (marker == null) {
                marker = new google.maps.Marker({
                    position: Position,
                    map: null
                });
            }
            marker.setMap(null);
            marker = new google.maps.Marker({
                position: Position,
                map: mapEdit
            });
            mapEdit.panTo(Position);
            mapEdit.addListener('click', function (e) {
                scope.latLngSelected = e.latLng;
                marker.setMap(null);
                marker = new google.maps.Marker({
                    position: e.latLng,
                    map: mapEdit
                })
            });
        }
        $scope.controlAgregarEvento = "ocultarA";
        $scope.controlEditarEvento = "ocultarA";
        $scope.Evento = {};
        $scope.varEditarEvento = function (Evento) {
            if ($scope.controlEditarEvento == "") {
                $scope.controlEditarEvento = "ocultarA";
            } else {
                $scope.controlEditarEvento = "";
                $scope.Evento = JSON.clone(Evento);
                $scope.Evento.Date = new Date($scope.Evento.Fecha);
                initMapEdit($scope);
            }
        }
        $scope.varAgregarEvento = function () {
            if ($scope.controlAgregarEvento == "") {
                $scope.controlAgregarEvento = "ocultarA";
            } else {
                $scope.controlAgregarEvento = "";
                $scope.Evento = {};
                initMap($scope);
            }
        }
        $scope.editarEvento = function (obj) {
            obj.Privacidad = 1;
            obj.Latitud = $scope.latLngSelected.lat();
            obj.Longitud = $scope.latLngSelected.lng();
            var f = obj.Date;
            obj.Fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate() + " " + f.getHours() + ":" + f.getMinutes() + ":00";
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $http.post(host + "api/ActualizarEvento.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    $log.log("Evento Editado correctamente");
                    $scope.verEventos();
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.crearEvento = function (obj) {
            obj.Tipo = "Evento";
            obj.Propietario = $rootScope.idUsuarioActivo;
            obj.Privacidad = 1;
            obj.Latitud = $scope.latLngSelected.lat();
            obj.Longitud = $scope.latLngSelected.lng();
            var f = obj.Date;
            obj.Fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate() + " " + f.getHours() + ":" + f.getMinutes() + ":00";
            var fd = new FormData();
            $log.log(obj);
            fd.append("obj", JSON.stringify(obj));
            $log.log("Creando Evento");
            $http.post(host + "api/AgregarEvento.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    $log.log("Evento registrado correctamente");
                    $scope.verEventos();
                    $scope.Evento = {};
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.eliminarEvento = function (ForoID) {
            var resp = confirm("¿Está seguro que desea eliminar el Evento?");
            if (resp == true) {
                $log.log("You pressed OK!");
                var obj = {};
                obj.ForoID = ForoID;
                var fd = new FormData();
                fd.append("obj", JSON.stringify(obj));
                $log.log("Eliminando Evento");
                $log.log(obj);
                $http.post(host + "api/EliminarEvento.php", fd, {
                    headers: {
                        "Content-Type": undefined
                    }
                }).then(function (respuesta) {
                    var data = respuesta.data;
                    $log.log("Datos");
                    $log.log(data);
                    if (data.message == "OK") {
                        $log.log("Borrado con éxito");
                        $scope.verEventos(); //Se actualizan los Eventos
                    } else {
                        $log.log(data.message);
                    }
                }).catch(function (data) {
                    $log.log("Error de conexion, intente de nuevo");
                })
            } else {
                $log.log("You pressed Cancel!");
            }
        }
        $scope.verEventos = function () {
            var obj = {};
            obj.UsuarioID = $rootScope.idUsuarioActivo;
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log("Consultando mis Eventos");
            $http.post(host + "api/VerEventosXUsuario.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log("Datos");
                $log.log(data);
                if (data.message == "OK") {
                    $scope.arrayEventos = data.EventosXUsuario;
                    $log.log("Se han consultado correctamente");
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.verEventos();
    }
});
/* Mis Foros */
app.controller("misForos", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    } else {
        $scope.controlCrearForo = false;
        $scope.controlEditarForo = false;
        $scope.Foro = $rootScope.ForoSeleccionado;
        $scope.varEditarForo = function (Foro) {
            if ($scope.controlEditarForo) {
                $scope.controlEditarForo = false;
            } else {
                $scope.controlEditarForo = true;
                $scope.Foro = JSON.clone(Foro);
                //Se cargan los datos en los campos para editarlos
                if ($scope.Foro.Privado == "1") {
                    $scope.Foro.Privado = true;
                } else {
                    $scope.Foro.Privado = false;
                }
            }
        }
        $scope.varAgregarForo = function () {
            if ($scope.controlCrearForo) {
                $scope.controlCrearForo = false;
            } else {
                $scope.controlCrearForo = true;
                $scope.Foro = {};
            }
        }
        $scope.editarForo = function (obj) {
            if (obj.Privado) {
                obj.Privacidad = 1;
            } else {
                obj.Privacidad = 0;
            }
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log("Editando Foro");
            $log.log(obj);
            $http.post(host + "api/ActualizarForo.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    $log.log("Foro Editado correctamente");
                    $scope.verForos();
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.crearForo = function (obj) {
            obj.Tipo = "Foro";
            obj.Propietario = $rootScope.idUsuarioActivo;
            if (obj.Privado) {
                obj.Privacidad = 1;
            } else {
                obj.Privacidad = 0;
            }
            var fd = new FormData();
            $log.log(obj);
            fd.append("obj", JSON.stringify(obj));
            $log.log("Creando Foro");
            $http.post(host + "api/AgregarForo.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    $log.log("Foro registrado correctamente");
                    $scope.verForos();
                    $scope.Foro = {};
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.agregarArchivo = function (Foro) {
            $log.log("Agregando archivo al foro");
            $rootScope.ForoSeleccionado = Foro;
            $rootScope.cargarPopup('popupEditarArchivos');
        }
        $scope.editarMiembrosForo = function (foro) {
            $log.log("Editando miembros de un Foro");
            $rootScope.ForoSeleccionado = foro;
            $rootScope.cargarPopup('popupMiembrosForo');
        }
        $scope.editarPreguntasForo = function (foro) {
            $log.log("Editando preguntas de un foro");
            $rootScope.ForoSeleccionado = foro;
            $rootScope.cargarPopup('popupEditarPreguntas');
        }

        $scope.eliminarForo = function (ForoID) {
            var resp = confirm("¿Está seguro que desea eliminar el foro?");
            if (resp == true) {
                $log.log("You pressed OK!");
                var obj = {};
                obj.ForoID = ForoID;
                var fd = new FormData();
                fd.append("obj", JSON.stringify(obj));
                $log.log("Eliminando Foro");
                $log.log(obj);
                $http.post(host + "api/EliminarForo.php", fd, {
                    headers: {
                        "Content-Type": undefined
                    }
                }).then(function (respuesta) {
                    var data = respuesta.data;
                    $log.log("Datos");
                    $log.log(data);
                    if (data.message == "OK") {
                        $log.log("Borrado con éxito");
                        $scope.verForos(); //Se actualizan los foros
                    } else {
                        $log.log(data.message);
                    }
                }).catch(function (data) {
                    $log.log("Error de conexion, intente de nuevo");
                })
            } else {
                $log.log("You pressed Cancel!");
            }
        }
        $scope.verForos = function () {
            var obj = {};
            obj.UsuarioID = $rootScope.idUsuarioActivo;
            $log.log("Obj consulta");
            $log.log(obj);
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log("Consultando mis foros");
            $http.post(host + "api/VerForosXUsuario.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log("Datos");
                $log.log(data);
                if (data.message == "OK") {
                    $scope.arrayForos = data.ForosXUsuario;
                    $log.log("Se han consultado correctamente");
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.verForos();
    }
});
/* Mis Proyectos */
app.controller("misProyectos", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    } else {
        $scope.controlAgregarProyecto = false;
        $scope.controlEditarProyecto = false;
        $scope.Proyecto = {}; //Todo artículo es un foro..
        $scope.varEditarProyecto = function (Proyecto) {
            if ($scope.controlEditarProyecto) {
                $scope.controlEditarProyecto = false;
            } else {
                $scope.controlEditarProyecto = true;
                $scope.Proyecto = JSON.clone(Proyecto);
            }
        }
        $scope.varAgregarProyecto = function () {
            if ($scope.controlAgregarProyecto) {
                $scope.controlAgregarProyecto = false;
            } else {
                $scope.controlAgregarProyecto = true;
                $scope.Proyecto = {};
            }
        }
        $scope.editarProyecto = function (obj) {
            obj.Privacidad = 1;
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log("Editando Proyecto");
            $log.log(obj);
            $http.post(host + "api/ActualizarForo.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    $log.log("Proyecto Editado correctamente");
                    $scope.verProyectos();
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.crearProyecto = function (obj) {
            $log.log(obj);
            obj.Tipo = "Proyecto";
            obj.Propietario = $rootScope.idUsuarioActivo;
            obj.Privacidad = 0;
            var fd = new FormData();
            $log.log(obj);
            fd.append("obj", JSON.stringify(obj));
            $log.log("Creando Proyecto");
            $http.post(host + "api/AgregarForo.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    $log.log("Proyecto registrado correctamente");
                    $scope.verProyectos();
                    $scope.Proyecto = {};
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.eliminarProyecto = function (ForoID) {
            var resp = confirm("¿Está seguro que desea eliminar el Artículo?");
            if (resp == true) {
                $log.log("You pressed OK!");
                var obj = {};
                obj.ForoID = ForoID;
                var fd = new FormData();
                fd.append("obj", JSON.stringify(obj));
                $log.log("Eliminando Proyecto");
                $log.log(obj);
                $http.post(host + "api/EliminarForo.php", fd, {
                    headers: {
                        "Content-Type": undefined
                    }
                }).then(function (respuesta) {
                    var data = respuesta.data;
                    $log.log("Datos");
                    $log.log(data);
                    if (data.message == "OK") {
                        $log.log("Borrado con éxito");
                        $scope.verProyectos(); //Se actualizan los Proyectos
                    } else {
                        $log.log(data.message);
                    }
                }).catch(function (data) {
                    $log.log("Error de conexion, intente de nuevo");
                })
            } else {
                $log.log("You pressed Cancel!");
            }
        }
        $scope.verProyectos = function () {
            var obj = {};
            obj.UsuarioID = $rootScope.idUsuarioActivo;
            $log.log(obj);
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log("Consultando mis Proyectos");
            $http.post(host + "api/VerProyectosXUsuario.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log("Datos");
                $log.log(data);
                if (data.message == "OK") {
                    $scope.arrayProyectos = data.ProyectosXUsuario;
                    $log.log("Se han consultado correctamente");
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.verProyectos();
    }
});
/* Noticias */
app.controller("noticias", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    } else {
        $scope.VerTopNoticias = function () {
            var obj = {};
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log("Consultando top noticias");
            $http.post(host + "api/VerTopNoticias.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    $scope.arrayNoticias = data.Noticias;
                    $log.log("Se han consultado correctamente");
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.VerTopNoticias();
    }
});
/* Ver Articulos */
app.controller("verArticulos", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    } else {
        $scope.VerArticulos = function () {
            var obj = {};
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log("Consultando todos los Artículos");
            $http.post(host + "api/VerArticulos.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log("Datos");
                $log.log(data);
                if (data.message == "OK") {
                    $scope.arrayArticulos = data.Articulos;
                    $log.log("Se han consultado correctamente");
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.VerArticulos();
    }
});
/* Ver Eventos */
app.controller("verEventos", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    } else {
        $scope.VerEventos = function () {
            var obj = {};
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log("Consultando todos los Eventos");
            $http.post(host + "api/VerEventos.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log("Datos");
                $log.log(data);
                if (data.message == "OK") {
                    $scope.arrayEventos = data.Eventos;
                    $log.log("Se han consultado correctamente");
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.VerEventos();
    }
});
/* Ver Foros */
app.controller("verForos", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    } else {
        $scope.verForos = function () {
            var obj = {};
            obj.pPersonaID = $rootScope.idUsuarioActivo;
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log("Consultando todos los foros");
            $http.post(host + "api/VerForos.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log("Datos");
                $log.log(data);
                if (data.message == "OK") {
                    $scope.arrayForos = data.Foros;
                    $log.log("Se han consultado correctamente");
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.verForos();
    }
});
/* Ver Proyectos */
app.controller("verProyectos", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    } else {
        $scope.VerProyectos = function () {
            var obj = {};
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log("Consultando todos los Proyectos");
            $http.post(host + "api/VerProyectos.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log("Datos");
                $log.log(data);
                if (data.message == "OK") {
                    $scope.arrayProyectos = data.Proyectos;
                    $log.log("Se han consultado correctamente");
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.VerProyectos();
    }
});

/* Administración Elecciones */
app.controller("administrarElecciones", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    } else {
        $scope.controlAgregarEleccion = false;
        $scope.Eleccion = {};

        $scope.varAgregarEleccion = function () {
            if ($scope.controlAgregarEleccion) {
                $scope.controlAgregarEleccion = false;
            } else {
                $scope.Eleccion = {};
                $scope.controlAgregarEleccion = true;

            }
        }

        $scope.crearEleccion = function (objAux) {
            var obj = {};
            obj.CreadorID = $rootScope.idUsuarioActivo;
            obj.Activo = 1;
            obj.Titulo = objAux.Titulo;
            var f;
            f = objAux.DateInic;
            obj.FechaInicio = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate() + " " + f.getHours() + ":" + f.getMinutes() + ":00";
            f = objAux.DateFin;
            obj.FechaFin = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate() + " " + f.getHours() + ":" + f.getMinutes() + ":00";

            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log("Creando elección");
            $log.log(obj);
            $http.post(host + "api/AgregarProcesoElectoral.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log("Datos");
                $log.log(data);
                if (data.message == "OK") {
                    $log.log("Proceso de elección creado con éxito");
                    $scope.verElecciones();
                    $scope.Eleccion = {};
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }

        $scope.cerrarEleccion = function (IDEleccion) {

            var obj = {};
            obj.ProcesoEleccionID = IDEleccion;

            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log("Cerrar elección");
            $log.log(obj);
            $http.post(host + "api/CerrarProcesoElectoral.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log("Datos");
                $log.log(data);
                if (data.message == "OK") {
                    $log.log("Proceso de elección cerrado con éxito");
                    $scope.verElecciones();
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }

        $scope.eliminarEleccion = function (IDEleccion) {
            var resp = confirm("¿Está seguro que desea eliminar la elección?");
            if (resp == true) {
                var obj = {};
                obj.ProcesoEleccionID = IDEleccion;

                var fd = new FormData();
                fd.append("obj", JSON.stringify(obj));
                $log.log("Eliminando un proceso de elección");
                $log.log(obj);
                $http.post(host + "api/EliminarProcesoElectoral.php", fd, {
                    headers: {
                        "Content-Type": undefined
                    }
                }).then(function (respuesta) {
                    var data = respuesta.data;
                    $log.log("Datos");
                    $log.log(data);
                    if (data.message == "OK") {
                        $log.log("Elección borrada con éxito");
                        $scope.verElecciones();
                    } else {
                        $log.log(data.message);
                    }
                }).catch(function (data) {
                    $log.log("Error de conexion, intente de nuevo");
                })
            }
        }

        $scope.verElecciones = function () {
            var obj;
            obj = {};
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log("Consultando elecciones");
            $http.post(host + "api/VerProcesosElectorales.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log("Datos");
                $log.log(data);
                if (data.message == "OK") {
                    $scope.arrayElecciones = data.ProcesosElectorales;
                    $log.log("Procesos de elección consultados con éxito");
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.verElecciones();
    }
});


/* Ver Elecciones */
app.controller("verElecciones", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    } else {}
});
/* Ver informacion del foro */
app.controller("verInfo", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log, $routeParams) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    } else {
        $scope.of = {};
        var mapVer = null;
        var markerVer = null;

        function cargarMapa() {
            var Position = new google.maps.LatLng($scope.of.Latitud, $scope.of.Longitud);
            if (mapVer == null) {
                mapVer = new google.maps.Map(document.getElementById('mapVer'), {
                    zoom: 16,
                    center: Position
                });
            }
            if (markerVer != null) {
                markerVer.setMap(null);
            }
            markerVer = new google.maps.Marker({
                position: Position,
                map: mapVer
            });
            mapVer.panTo(Position);
        }
        $scope.controlVerEvento = "ocultarA";
        $scope.varVerEvento = function () {
            if ($scope.controlVerEvento == "") {
                $scope.controlVerEvento = "ocultarA";
            } else {
                $scope.controlVerEvento = "";
                cargarMapa();
            }
        }
        var idVer = $routeParams.idVer;

        function cargarinfo() {
            var obj = {};
            obj.pForoID = idVer;
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            //$log.log(obj);
            $http.post(host + "api/VerInfoForo.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                //$log.log(data);
                if (data.message == "OK") {
                    $scope.of = data.InfoForo[0];
                    cargarArchivos();
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }

        function cargarEncuesta() {
            var obj = {};
            obj.ForoID = idVer;
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log(obj);
            $http.post(host + "api/VerEncuestaXForo.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    $scope.of.encuestas = data.EncuestaXForo;
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }

        function cargarArchivos() {
            var obj = {};
            obj.ForoID = idVer;
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            //$log.log(obj);
            $http.post(host + "api/VerArchivosXForo.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                //$log.log(data);
                if (data.message == "OK") {
                    $scope.of.archivos = data.ArchivosXForo;

                    cargarEncuesta();
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.votarEncuesta = function (idEncuesta, voto) {
            var obj = {};
            obj.EncuestaID = idEncuesta;
            obj.VotanteID = $rootScope.idUsuarioActivo;
            obj.Respuesta = voto;
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log(obj);
            $http.post(host + "api/AgregarVotoEncuesta.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                //$log.log(data);
                if (data.message == "OK") {
                    cargarEncuesta();
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.meGustarForo = function () {
            var obj = {};
            obj.ForoID = idVer;
            obj.PersonaID = $rootScope.idUsuarioActivo;
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log(obj);
            $http.post(host + "api/AgregarMeGustaForo.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    $scope.of.Likes++;
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.meGustarComentario = function (idComentario) {
            var obj = {};
            obj.ComentarioID = idComentario;
            obj.PersonaID = $rootScope.idUsuarioActivo;
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log(obj);
            $http.post(host + "api/AgregarMeGustaComentario.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    $scope.cargarComentarios();
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.eliminarComentario = function (idComentario) {
            var obj = {};
            obj.pComentarioID = idComentario;
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log(obj);
            $http.post(host + "api/EliminarComentario.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    $scope.cargarComentarios();
                    alert("El comentario se ha eliminado");
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.denunciarComentario = function (idComentario) {
            var obj = {};
            obj.ComentarioID = idComentario;
            obj.PersonaID = $rootScope.idUsuarioActivo;
            obj.pForoID = idVer;
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log(obj);
            $http.post(host + "api/AgregarDenunciaComentario.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    alert("Se ha denunciado el comentario");
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.denunciarForo = function () {
            var obj = {};
            obj.ForoID = idVer;
            obj.PersonaID = $rootScope.idUsuarioActivo;
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log(obj);
            $http.post(host + "api/AgregarDenunciaForo.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    alert("El foro se ha marcado como inadecuado");
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.agregarComentario = function (texto) {
            if (texto.length != 0) {
                var obj = {};
                obj.ForoID = idVer;
                obj.Comentario = texto;
                obj.PersonaID = $rootScope.idUsuarioActivo;
                var fd = new FormData();
                fd.append("obj", JSON.stringify(obj));
                $log.log(obj);
                $http.post(host + "api/AgregarComentario.php", fd, {
                    headers: {
                        "Content-Type": undefined
                    }
                }).then(function (respuesta) {
                    var data = respuesta.data;
                    $log.log(data);
                    if (data.message == "OK") {
                        $scope.txtComentario = "";
                        $scope.cargarComentarios();
                    } else {
                        $log.log(data.message);
                    }
                }).catch(function (data) {
                    $log.log("Error de conexion, intente de nuevo");
                })
            }
        }
        $scope.cargarComentarios = function () {
            var obj = {};
            obj.ForoID = idVer;
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log(obj);
            $http.post(host + "api/VerComentariosForo.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    $scope.of.comentarios = data.ComentariosForo;
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        cargarinfo();
    }
});
/* Ver perfil de una persona y editar los datos si es el usuario registrado */
app.controller("verPerfil", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log, $routeParams) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    } else {
        var idUsuario = $routeParams.idUsuario;
        $scope.idUsuario = idUsuario;

        function cargarinfo() {
            var obj = {};
            obj.pPersonaID = idUsuario;
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log(obj);
            $http.post(host + "api/VerDatosXPersona.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    $scope.op = data.DatosXPersona[0];
                    cargarArchivos();
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.cambiarTipoUsuario = function (tipoUsuario) {
            var obj = {};
            obj.PersonaID = idUsuario;
            obj.TipoUsuario = tipoUsuario;
            $log.log(obj);
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $http.post(host + "api/ActualizarTipoUsuario.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                $scope.calificado = true;
                if (data.message == "OK") {
                    cargarinfo();
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.calificarPersona = function (calificacion) {
            var obj = {};
            obj.VotanteID = $rootScope.idUsuarioActivo;
            obj.PersonaID = idUsuario;
            obj.Calificacion = calificacion;
            $log.log(obj);
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $http.post(host + "api/CalificarPersona.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                $scope.calificado = true;
                if (data.message == "OK") {
                    cargarinfo();
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.editarPerfil = function () {
            $scope.objEditar = JSON.clone($scope.op);
            $scope.editarInformacion = true;
        }
        $scope.ActualizarPersona = function (obj) {
            obj.PersonaID = $rootScope.idUsuarioActivo;
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log(obj);
            $http.post(host + "api/ActualizarPersona.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    cargarinfo();
                    $scope.editarInformacion = false;
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        cargarinfo();
    }
});
/* Plantilla controller */
app.controller("busqueda", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    } else {
        $scope.buscarUsuarios = function (obj) {
            $log.log("Buscando Usuarios");
            $log.log(obj);
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
            })
        }
    }
});
app.controller("verDenuncias", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    } else {
        function ListarDenunciasXComentario() {
            obj = {};
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $http.post(host + "api/ListarDenunciasXComentario.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log("Datos");
                $log.log(data);
                if (data.message == "OK") {
                    $scope.comentariosDenunciados = data.DenunciasXComentario;
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }

        function ListarDenunciasXForo() {
            obj = {};
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $http.post(host + "api/ListarDenunciasXForo.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log("Datos");
                $log.log(data);
                if (data.message == "OK") {
                    $scope.forosDenunciados = data.DenunciasXForo;
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.eliminarComentario = function (idComentario) {
            var obj = {};
            obj.pComentarioID = idComentario;
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log(obj);
            $http.post(host + "api/EliminarComentario.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    ListarDenunciasXComentario();
                    alert("El comentario se ha eliminado");
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        $scope.eliminarForo = function (idForo) {
            var obj = {};
            obj.ForoID = idForo;
            var fd = new FormData();
            fd.append("obj", JSON.stringify(obj));
            $log.log(obj);
            $http.post(host + "api/EliminarForo.php", fd, {
                headers: {
                    "Content-Type": undefined
                }
            }).then(function (respuesta) {
                var data = respuesta.data;
                $log.log(data);
                if (data.message == "OK") {
                    ListarDenunciasXComentario();
                    ListarDenunciasXForo();
                } else {
                    $log.log(data.message);
                }
            }).catch(function (data) {
                $log.log("Error de conexion, intente de nuevo");
            })
        }
        ListarDenunciasXComentario();
        ListarDenunciasXForo();
    }
});

/* Plantilla controller */
app.controller("plantilla", function ($scope, $rootScope, $location, $http, $cookies, $interval, $filter, $log) {
    if (!$rootScope.sesionActiva()) { // verificamos si una sesion ya fue iniciada
        $location.path("login");
    } else {}
});
