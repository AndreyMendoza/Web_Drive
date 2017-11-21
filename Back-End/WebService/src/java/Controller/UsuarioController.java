
package Controller;

import Model.MensajeModel;
import Model.UsuarioModel;
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
            UsuarioModel nuevo_usuario = new UsuarioModel(usuario, password, tamanho);
            if (Herramientas.agregar_usuario(nuevo_usuario))
                mensaje.setMensaje("OK");
            else
                mensaje.setMensaje("El nombre de usuario ya existe.");
        } catch (Exception ex) {
            mensaje.setMensaje("ERROR");
        }        
        return Herramientas.crear_json(mensaje);
    }
  
// -----------------------------------------------------------------------------
    
}
