<div class="contenedorFlotante" ng-controller="popupEditarPreguntas">
    <div>
        <div class="fondo" ng-click="cargarPopup('')"></div>
        <div class="title">Creación de Encuesta<span ng-click="cargarPopup('')">X</span></div>
        <div class="cuerpo fullPadding">
            <form ng-submit="agregarPregunta(obj)">
                <div class="flexFila fullWidth flexCenter">
                    <textarea class="fullPadding f16 sombra marginDer flexG1 " ng-model="obj.Descripcion" placeholder="Digite la pregunta.." rows="3"></textarea>
                    <button class="fullPadding f20" type="submit">Agregar</button>
                </div>

                <span class="fullMargin block">Preguntas Realizadas</span>
                <hr/>
                <div class="fullPadding contenedorUsuarios marginArriba aCentro height300">
                    <!--Este es el que debe repetirse por cada archivo-->
                    <div class="aIzq flexFila fullWidth flexCenter marginArriba" ng-repeat="pregunta in arrayPreguntas">
                        <div class="fullPadding fullWidth sombra flexFila flexCenter" type="text">
                            <div class="f16 aIzq flexG1 break">{{pregunta.Descripcion}} {{pregunta.likes}}<i class="fa fa-thumbs-o-up cCeleste" aria-hidden="true"></i> {{pregunta.disLikes}}<i class="fa fa-thumbs-o-down cCeleste" aria-hidden="true"></i></div>
                            <boton class="f18 pointer marginIzq" title="Eliminar foro" ng-click="eliminarPregunta(pregunta)"><i class="fa fa-trash" aria-hidden="true"></i></boton>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    </div>
</div>
