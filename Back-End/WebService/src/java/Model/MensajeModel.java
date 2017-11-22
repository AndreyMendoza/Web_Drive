package Model;

import java.util.ArrayList;

public class MensajeModel {

// -----------------------------------------------------------------------------
    
    private String mensaje;
    private ArrayList<Object> result = new ArrayList<>();

// -----------------------------------------------------------------------------
    
    public String getMensaje() {
        return mensaje;
    }

// -----------------------------------------------------------------------------
    
    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

// -----------------------------------------------------------------------------

    public ArrayList<Object> getResult() {
        return result;
    }

// -----------------------------------------------------------------------------
    
    public void setResult(ArrayList<Object> result) {
        this.result = result;
    }
    
// -----------------------------------------------------------------------------
    
    public void addObjeto(Object objeto)
    {
        result.add(objeto);
    }
    
}
