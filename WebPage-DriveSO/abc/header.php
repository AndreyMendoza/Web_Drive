<div ng-show="!sesionIniciada" class="fullPadding f22">Hola!, Bienvenido(a) al Drive S.O.</div>
<nav ng-show="sesionIniciada">
    <ul class="mp">
        <li><a href="#!/verArchivos"><i class="fa fa-home" aria-hidden="true"></i><span> Inicio</span></a>
            <ul>
                <li><a href="#!/verArchivos"><span>Mis Archivos</span></a></li>
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
            <li><a href="#!/cambiarPass"><i class="fa fa-lock" aria-hidden="true"></i><span> Contraseña</span></a></li>
            <li><a href="" ng-click="cerrarSesion()"><i class="fa fa-sign-out" aria-hidden="true"></i><span> Salir</span></a></li>
        </ul>
    </li>

</ul>
