package Model;

import java.util.ArrayList;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
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
    
    public boolean agregar_hijo(String ruta, Directorio hijo)
    {
        if (ruta.equals(this.ruta))
            return agregar_hijo_aux(hijo);
        else 
        {
            for (Directorio d : hijos)
            {
                if (d.getTipo() == Almacenamiento.CARPETA)
                {
                     if (((Carpeta) d).agregar_hijo(ruta, hijo))
                         return true;
                }
            }
            return false;
        }
    }
    
// -----------------------------------------------------------------------------
    
    public boolean remove()
    {
        return false;
    }
    
// -----------------------------------------------------------------------------

    @XmlElement
    public ArrayList<Directorio> getHijos() {
        return hijos;
    }
    
// -----------------------------------------------------------------------------

    public void setHijos(ArrayList<Directorio> hijos) {
        this.hijos = hijos;
    }
    
// -----------------------------------------------------------------------------
    
    public boolean agregar_hijo_aux(Directorio hijo)
    {
        // Verificar que no se repita
        for (Directorio d : hijos)
        {
            if (d.getTipo() == hijo.getTipo() &&
                d.getNombre().equals(hijo.getNombre()))
                return false;
        }                    
        hijos.add(hijo);
        return true;
    }
    
// -----------------------------------------------------------------------------
    
    public Carpeta buscar_directorio(String ruta)
    {
        if (ruta.equals(this.ruta))
            return this;
        else 
        {
            for (Directorio d : hijos)
            {
                if (d.getTipo() == Almacenamiento.CARPETA)
                {
                    Carpeta result = ((Carpeta) d).buscar_directorio(ruta);
                    if (result != null)
                        return result;
                }
            }
            return null;
        }
    }

    
// -----------------------------------------------------------------------------
    
}
