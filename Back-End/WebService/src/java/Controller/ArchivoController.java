
package Controller;

import Model.MensajeModel;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;


@Path("Archivo")
public class ArchivoController {

// -----------------------------------------------------------------------------
    
    @Path("crear_carpeta")
    @GET
    public String crear_carpeta(
            @QueryParam("usuario") String usuario,
            @QueryParam("ruta") String ruta,
            @QueryParam("nombre") String nombre)
    {
        MensajeModel mensaje = new MensajeModel();
        try {
            if (Herramientas.crear_carpeta_fs(usuario, ruta, nombre))
            {
                mensaje.setMensaje("OK");
                mensaje.addObjeto(Herramientas.buscar_directorio(usuario, ruta));
                return Herramientas.crear_json(mensaje);
            }
            else
                mensaje.setMensaje("No fue posible agregar la carpeta.");
        } catch (Exception ex) {
            mensaje.setMensaje("ERROR");
        }        
        return Herramientas.crear_json(mensaje);
    }
  
// -----------------------------------------------------------------------------

    @Path("crear_archivo")
    @GET
    public String agregar_archivo(
            @QueryParam("usuario") String usuario,
            @QueryParam("ruta") String ruta,
            @QueryParam("nombre") String nombre,
            @QueryParam("extension") String extension,
            @QueryParam("contenido") String contenido)
    {
        MensajeModel mensaje = new MensajeModel();
        try {
            if (Herramientas.crear_archivo_fs(usuario, ruta, nombre, extension, contenido))
            {
                mensaje.setMensaje("OK");
                mensaje.addObjeto(Herramientas.buscar_directorio(usuario, ruta));
                return Herramientas.crear_json(mensaje);
            }
            else
                mensaje.setMensaje("No fue posible agregar el archivo.");
        } catch (Exception ex) {
            mensaje.setMensaje("ERROR");
        }        
        return Herramientas.crear_json(mensaje);
    }
   
// -----------------------------------------------------------------------------
}
