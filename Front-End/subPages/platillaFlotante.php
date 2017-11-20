<div class="contenedorFlotante" ng-controller="agregarProducto">
    <div>
        <div class="fondo" ng-click="cargarArchivo('')"></div>
        <div class="title">Agregar Producto<span ng-click="cargarArchivo('')">X</span></div>
        <div class="cuerpo paddingAll">
            <form ng-init="objAgregar = {}" ng-submit="agregarProducto(objAgregar)">
                <table>
                    <tr>
                        <td>Codigo del Producto:</td>
                        <td>
                            <input id="codBarrasIn" ng-model="objAgregar.codigoBarras" ng-keydown="analizarEntrada($event)" type="text" required autofocus> </td>
                    </tr>
                    <tr>
                        <td>Categoria:</td>
                        <td>
                            <select id="catIn" ng-model="objAgregar.fk_categoriaProducto" ng-options="categoriaProducto.id as categoriaProducto.categoria for categoriaProducto in categoriaProductos"></select>
                        </td>
                    </tr>
                    <tr>
                        <td>Unidad de Medida:</td>
                        <td>
                            <select ng-model="objAgregar.fk_unidadMedida" ng-options="unidadMedida.id as unidadMedida.unidad for unidadMedida in unidadesMedida"></select>
                        </td>
                    </tr>
                    <tr>
                        <td>Descripción:</td>
                        <td>
                            <textarea class="fullWidth" required ng-model="objAgregar.descripcion" rows="4" maxlength="100"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td> Cantidad: </td>
                        <td>
                            <input ng-model="objAgregar.existencias" min="0" type="number" step="0.001" required> </td>
                        </td>
                    </tr>
                    <tr>
                        <td> Cantidad alerta: </td>
                        <td>
                            <input ng-model="objAgregar.cantidadMinima" min="0" type="number" step="0.001" required> </td>
                        </td>
                    </tr>
                    <tr>
                        <td>Precio Costo:</td>
                        <td>
                            <input ng-model="objAgregar.precioCosto" step="0.001" ng-keyup="calcularPorcGanancia(objAgregar.precioVenta)" min="0" type="number" required> </td>
                    </tr>
                    <tr>
                        <td>% de Ganancia:</td>
                        <td>
                            <input ng-model="objAgregar.porcGanancia" step="0.001" ng-change="calcularPrecioVenta(objAgregar.porcGanancia)" min="0" type="number"> </td>
                    </tr>
                    <tr>
                        <td>Precio Venta:</td>
                        <td>
                            <input ng-model="objAgregar.precioVenta" step="0.001" ng-change="calcularPorcGanancia(objAgregar.precioVenta)" min="0" type="number" required> </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="derecha">
                            <input type="submit" value="Agregar Producto"> </td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
</div>
