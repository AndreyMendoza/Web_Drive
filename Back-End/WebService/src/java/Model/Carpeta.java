package Model;

import java.util.ArrayList;


public class Carpeta extends Directorio{

// -----------------------------------------------------------------------------
    
    private ArrayList<Directorio> hijos = new ArrayList<>();

// -----------------------------------------------------------------------------
    
    public Carpeta() {
    }

// -----------------------------------------------------------------------------
    
    public Carpeta(String Nombre, String ruta, float tamanho) {
        super(Nombre, ruta, tamanho);
    }
    
// -----------------------------------------------------------------------------
    
    public Directorio get_child()
    {
        return null;
    }
    
// -----------------------------------------------------------------------------
    
    public boolean remove()
    {
        return false;
    }
    
// -----------------------------------------------------------------------------

    public ArrayList<Directorio> getHijos() {
        return hijos;
    }
    
// -----------------------------------------------------------------------------

    public void setHijos(ArrayList<Directorio> hijos) {
        this.hijos = hijos;
    }
    
// -----------------------------------------------------------------------------
    
}
