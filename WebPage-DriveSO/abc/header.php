<div ng-show="!sesionIniciada" class="fullPadding f22">Hola!, Bienvenido(a) al Drive S.O.</div>
<nav ng-show="sesionIniciada">
    <ul class="mp">
        <li><a href="#!/"><i class="fa fa-home" aria-hidden="true"></i><span> Inicio</span></a> </li>
        <li> <a href="#!/verForos"><i class="fa fa-comments-o" aria-hidden="true"></i><span> Foros</span></a>
            <ul>
                <li><a href="#!/misForos" ng-click="cargarArchivo('agregarProducto')"><span>Mis Foros</span></a></li>
                <li><a href="#!/verForos"><span>Ver Foros</span></a></li>
            </ul>
        </li>
        <li><a href="#!/verEventos" target="_self"><i class="fa fa-users" aria-hidden="true"></i><span> Eventos</span></a>
            <ul>
                <li><a href="#!/misEventos" target="_self" ng-click="cargarArchivo('registrarUsuario')"><span>Mis Eventos</span></a></li>
                <li><a href="#!/verEventos" target="_self"><span>Ver Eventos</span></a></li>
            </ul>
        </li>
        <li><a href="#!/verArticulos"><i class="fa fa-bookmark" aria-hidden="true"></i><span> Artículos</span></a>
            <ul>
                <li><a href="#!/misArticulos"><span>Mis Artículos</span></a></li>
                <li><a href="#!/verArticulos"><span>Ver Artículos</span></a></li>
            </ul>
        </li>
        <li><a href="#!/verElecciones"><i class="fa fa-university" aria-hidden="true" ></i><span> Elecciones</span></a>
            <ul>
                <li><a href="#!/administrarElecciones" ng-show="tipoUsuarioActivo == 'admin'"><span>Administrar Elecciones</span></a></li>
                <li><a href="#!/verElecciones"><span>Ver Elecciones</span></a></li>
            </ul>
        </li>
        <li><a href="#!/verProyectos"><i class="fa fa-briefcase" aria-hidden="true"></i><span> Proyectos</span></a>
            <ul>
                <li><a href="#!/misProyectos"><span>Mis Proyectos</span></a></li>
                <li><a href="#!/verProyectos"><span>Ver Proyectos</span></a></li>
            </ul>
        </li>
        <li><a href="#!/busqueda"><i class="fa fa-search" aria-hidden="true"></i><span> Buscar</span></a> </li>
    </ul>
</nav>
<ul class="mp" ng-show="sesionIniciada">
    <li><a href=""><span><i class="fa fa-bars" aria-hidden="true"></i>
 {{nombreUsuarioActivo}}</span></a>
        <ul>
            <li><a href="#!/verPerfil/{{idUsuarioActivo}}"><i class="fa fa-user" aria-hidden="true"></i><span> Mi Perfil</span></a></li>
            <li><a href="#!/verDenuncias" ng-show="tipoUsuarioActivo == 'admin'"><i class="fa fa-font-awesome" aria-hidden="true"></i> <span>Denuncias</span></a></li>
            <li><a href="#!/cambiarPass"><i class="fa fa-lock" aria-hidden="true"></i><span> Contraseña</span></a></li>
            <li><a href="" ng-click="cerrarSesion()"><i class="fa fa-sign-out" aria-hidden="true"></i><span> Salir</span></a></li>
        </ul>
    </li>

</ul>
