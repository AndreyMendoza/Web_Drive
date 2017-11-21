package Model;

import java.util.ArrayList;


public class Carpeta extends Directorio{

// -----------------------------------------------------------------------------
    
    private ArrayList<Directorio> hijos = new ArrayList<>();

// -----------------------------------------------------------------------------
    
    public Carpeta() {
    }

// -----------------------------------------------------------------------------
    
    public Carpeta(String Nombre, String ruta, float tamanho, Almacenamiento tipo) {
        super(Nombre, ruta, tamanho, tipo);
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
    
    public void agregar_hijo(Directorio hijo)
    {
        // Verificar que no se repita
        for (Directorio d : hijos)
        {
            if (d.getTipo() == hijo.getTipo() &&
                d.getNombre().equals(hijo.getNombre()))
                break;
        }                    
        hijos.add(hijo);
    }
    
// -----------------------------------------------------------------------------
    
    
    
}
