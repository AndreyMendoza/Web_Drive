
package Controller;

import Model.MensajeModel;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;


@Path("prueba")
public class Prueba {
   
    @GET
    public String operar(@QueryParam("nombre") String nombre)
    {
        Gson gson = new GsonBuilder().create();
        MensajeModel msg = new MensajeModel();
        msg.setMensaje("Hola " + nombre);
        String result = gson.toJson(msg);
        return result;
    }
    
    
}
