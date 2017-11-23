
package Controller;

import Model.Carpeta;
import Model.MensajeModel;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;


@Path("Archivo")
public class ArchivoController {

// -----------------------------------------------------------------------------
    
    @Path("crear_carpeta")
    @GET
    public Response crear_carpeta(
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
            }
            else
                mensaje.setMensaje("No fue posible agregar la carpeta.");
        } catch (Exception ex) {
            mensaje.setMensaje("ERROR");
        }
        String output = Herramientas.crear_json(mensaje);
        return Response.ok(output).header("Access-Control-Allow-Origin", "*").build();
    }
  
// -----------------------------------------------------------------------------

    @Path("crear_archivo")
    @GET
    public Response agregar_archivo(
            @QueryParam("usuario") String usuario,
            @QueryParam("ruta") String ruta,
            @QueryParam("nombre") String nombre,
            @QueryParam("extension") String extension,
            @QueryParam("contenido") String contenido,
            @QueryParam("reemplazar") boolean reemplazar)
    {
        MensajeModel mensaje = new MensajeModel();
        try {
            if (Herramientas.crear_archivo_fs(usuario, ruta, nombre, extension, contenido, reemplazar))
            {
                mensaje.setMensaje("OK");
                mensaje.addObjeto(Herramientas.buscar_directorio(usuario, ruta));
            }
            else
                mensaje.setMensaje("No fue posible agregar el archivo.");
        } catch (Exception ex) {
            mensaje.setMensaje("ERROR");
        }        
        String output = Herramientas.crear_json(mensaje);
        return Response.ok(output).header("Access-Control-Allow-Origin", "*").build();
    }
   
// -----------------------------------------------------------------------------

    @Path("buscar_directorio")
    @GET
    public Response buscar_directorio(
            @QueryParam("usuario") String usuario,
            @QueryParam("ruta") String ruta)
    {
        MensajeModel mensaje = new MensajeModel();
        try {
            Carpeta directorio = Herramientas.buscar_directorio(usuario, ruta);
            if (directorio != null)
            {
                mensaje.setMensaje("OK");
                mensaje.addObjeto(directorio);
            }
            else
                mensaje.setMensaje("Directorio no encontrado.");
        } catch (Exception ex) {
            mensaje.setMensaje("ERROR");
        }        
        String output = Herramientas.crear_json(mensaje);
        return Response.ok(output).header("Access-Control-Allow-Origin", "*").build();
    }
    
// -----------------------------------------------------------------------------
    
    @Path("ver_archivo")
    @GET
    public Response ver_archivo(
            @QueryParam("ruta") String ruta,
            @QueryParam("nombre") String nombre)
    {
        MensajeModel mensaje = new MensajeModel();
        try {
            String contenido = Herramientas.leer_archivo(ruta, nombre);
            if (contenido != null)
            {
                mensaje.setMensaje("OK");
                mensaje.addObjeto(contenido);
            }
            else
                mensaje.setMensaje("Directorio no encontrado.");
        } catch (Exception ex) {
            mensaje.setMensaje("ERROR");
        }        
        String output = Herramientas.crear_json(mensaje);
        return Response.ok(output).header("Access-Control-Allow-Origin", "*").build();
    }

// -----------------------------------------------------------------------------
    
    @Path("modificar_archivo")
    @GET
    public Response modificar_archivo(
            @QueryParam("usuario") String usuario,
            @QueryParam("ruta") String ruta,
            @QueryParam("nombre") String nombre,
            @QueryParam("contenido") String contenido)
    {
        MensajeModel mensaje = new MensajeModel();
        try {
            if (Herramientas.modificar_archivo(usuario, ruta, nombre, contenido))
            {
                mensaje.setMensaje("OK");
                mensaje.addObjeto(Herramientas.buscar_directorio(usuario, ruta));
            }
            else
                mensaje.setMensaje("No fue posible modificar el archivo.");
        } catch (Exception ex) {
            mensaje.setMensaje("ERROR");
        }        
        String output = Herramientas.crear_json(mensaje);
        return Response.ok(output).header("Access-Control-Allow-Origin", "*").build();
    }

// -----------------------------------------------------------------------------
    
}
