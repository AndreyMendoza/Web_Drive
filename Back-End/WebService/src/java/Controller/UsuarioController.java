
package Controller;

import Model.MensajeModel;
import Model.Usuario;
import java.util.ArrayList;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;


@Path("Usuario")
public class UsuarioController {

// -----------------------------------------------------------------------------
    
    @Path("agregar_usuario")
    @GET
    public String agregar_usuario(
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
        return Herramientas.crear_json(mensaje);
    }
  
// -----------------------------------------------------------------------------
    
    @Path("login")
    @GET
    public String login(
            @QueryParam("usuario") String usuario,
            @QueryParam("password") String password)
    {
        MensajeModel mensaje = new MensajeModel();
        try {
            if (Herramientas.login(usuario, password))
            {
                mensaje.setMensaje("OK");
                ArrayList<Object> result = new ArrayList<>();
                result.add(mensaje);
                result.add(Herramientas.cargar_file_system(usuario));
                return Herramientas.crear_json(result);
            }
            else
                mensaje.setMensaje("Usuario o contrasenha incorrectas.");
        } catch (Exception ex) {
            mensaje.setMensaje("ERROR");
        }        
        return Herramientas.crear_json(mensaje);
    }
}
