<div class="contenedorFlotante" ng-controller="popupMiembrosForo">
    <div>
        <div class="fondo" ng-click="cargarPopup('')"></div>
        <div class="title">Miembros del foro<span ng-click="cargarPopup('')">X</span></div>
        <div class="cuerpo fullPadding">

                <div class="fullPadding contenedorUsuarios marginArriba aCentro">
                    <!--Este es el que debe repetirse por cada integrante-->
                    <div class="contUsuario fullPadding inline aCentro marginArriba marginDer relative width150" ng-show="miembro.PersonaID != idUsuarioActivo" ng-repeat="miembro in arrayMiembros">
                        <!--Se le debe pasar el integrante a la func eliminarMiembro -->
                        <i class="fa fa-times-circle f20 cRojo absolute pDer pArriba pointer" aria-hidden="true" ng-click="eliminarMiembro(miembro.PersonaID)"></i>
                        <i class="fa fa-user block f30 cGrisOscuro" aria-hidden="true"></i>
                        <span class="f16 block">{{miembro.Nombre+" "+miembro.Apellido1}}</span>
                    </div>

                </div>

                <div class="flexFila fullWidth flexCenter">
                    <input class="fullPadding f16 sombra marginDer flexG1" type="text" ng-model="objUser.pIndicio">
                    <button class="fullPadding f20" ng-click="buscarUsuarios(objUser)">Buscar</button>
                </div>

                <span class="fullMargin block">Resultados de Búsqueda</span>
                <div class="width80p marginAuto height300 fullPadding">

                    <div class="aIzq flexFila fullWidth flexCenter marginArriba" ng-repeat="usuario in arrayUsuarios">
                        <label class="fullPadding f16 sombra marginDer flexG1" type="text"><i class="fa fa-user f30 cGrisOscuro" aria-hidden="true"></i> {{usuario.Nombre+" "+usuario.Apellido1+" "+usuario.Apellido2}}</label>
                        <button class="fullPadding f20" ng-click="agregarMiembro(usuario.PersonaID)">Agregar</button>
                    </div>

                </div>

        </div>
    </div>
</div>
