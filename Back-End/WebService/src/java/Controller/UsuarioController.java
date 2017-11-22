
package Controller;

import Model.MensajeModel;
import Model.Usuario;
import java.util.ArrayList;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;


@Path("Usuario")
public class UsuarioController {

// -----------------------------------------------------------------------------
    
    @Path("agregar_usuario")
    @GET
    // return Response.ok(output).header("Access-Control-Allow-Origin", "*").build();
    public Response agregar_usuario(
            @QueryParam("usuario") String usuario,
            @QueryParam("password") String password,
            @QueryParam("tamanho") float tamanho)
    {
        MensajeModel mensaje = new MensajeModel();
        try {
            Usuario nuevo_usuario = new Usuario(usuario, password, tamanho);
            if (Herramientas.agregar_usuario(nuevo_usuario))
            {
                mensaje.setMensaje("OK");
            }
            else
                mensaje.setMensaje("El nombre de usuario ya existe.");
        } catch (Exception ex) {
            mensaje.setMensaje("ERROR");
        }        
        //return Herramientas.crear_json(mensaje);
        String output = Herramientas.crear_json(mensaje);
        return Response.ok(output).header("Access-Control-Allow-Origin", "*").build();
    }
  
// -----------------------------------------------------------------------------
    
    @Path("login")
    @GET
    public Response login(
            @QueryParam("usuario") String usuario,
            @QueryParam("password") String password)
    {
        MensajeModel mensaje = new MensajeModel();
        String output = "";
        try {
            if (Herramientas.login(usuario, password))
            {
                mensaje.setMensaje("OK");
                mensaje.addObjeto(Herramientas.cargar_file_system(usuario));
                //output = Herramientas.crear_json(mensaje);
                //return Response.ok(output).header("Access-Control-Allow-Origin", "*").build();
            }
            else
                mensaje.setMensaje("Usuario o contrasenha incorrectas.");
        } catch (Exception ex) {
            mensaje.setMensaje("ERROR");
        }        
        //return Herramientas.crear_json(mensaje);
        output = Herramientas.crear_json(mensaje);
        return Response.ok(output).header("Access-Control-Allow-Origin", "*").build();
    }
}
