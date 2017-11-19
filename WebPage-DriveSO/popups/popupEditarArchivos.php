<div class="contenedorFlotante" ng-controller="popupEditarArchivos">
    <div>
        <div class="fondo" ng-click="cargarPopup('')"></div>
        <div class="title">Archivos del foro<span ng-click="cargarPopup('')">X</span></div>
        <div class="cuerpo fullPadding">
            <form ng-submit="agregarArchivo(obj)">

                <div class="flexFila fullWidth flexCenter">
                   <input class="fullPadding f16 sombra marginDer flexG1 " placeholder="Nombre del archivo" ng-model="obj.NombreArchivo">
                    <input class="fullPadding f16 sombra marginDer flexG1" placeholder="URL" ng-model="obj.ArchivoURL">
                    <button class="fullPadding f20" type="submit">Agregar</button>
                </div>
                <div class="fullPadding contenedorUsuarios marginArriba aCentro">

                    <!--Este es el que debe repetirse por cada archivo-->
                    <div class="contUsuario fullPadding inline aCentro marginArriba marginDer relative" ng-repeat="archivo in arrayArchivos">
                        <!--Se le debe pasar el enlace a la func eliminarArchivo -->
                        <i class="fa fa-times-circle f20 cRojo absolute pDer pArriba pointer" aria-hidden="true" ng-click="eliminarArchivo(archivo.ArchivoID)"></i>
                        <i class="fa fa-file block f30 cGrisOscuro marginAbajo" aria-hidden="true"></i>
                        <span class="f16 block">{{archivo.NombreArchivo}}</span>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
