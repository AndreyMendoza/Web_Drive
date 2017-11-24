package Model;

import Controller.Herramientas;
import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;
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
                     {
                         d.setTamanho(d.getTamanho() + hijo.getTamanho());
                         return true;
                     }
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
    
        public boolean modificar_peso_archivo(String ruta, String nombre, float peso)
    {
        for (Directorio d : hijos)
        {
            if (d.getTipo() == Almacenamiento.ARCHIVO &&
                ruta.equals(d.getRuta()) && nombre.equals(d.getNombre()))
            {
                d.setTamanho(peso);
                return true;
            }
            else if (d.getTipo() == Almacenamiento.CARPETA)
                ((Carpeta) d).modificar_peso_archivo(ruta, nombre, peso);
        }
        return false;
    }
    
// -----------------------------------------------------------------------------

    public float atualizar_pesos()
    {
        float peso = 0;
        for (Directorio d : hijos)
        {
            if (d instanceof Carpeta)
            {
                peso = peso + ((Carpeta) d).atualizar_pesos();
            }
            else
                peso = d.getTamanho() + peso;
        }
        tamanho = peso;
        return peso;
    }
    
// -----------------------------------------------------------------------------

    public boolean eliminar_archivo(String ruta, String nombre) throws Exception
    {
        Iterator itr = hijos.iterator();
        while (itr.hasNext())
        {
            Directorio d = (Directorio)itr.next();
            if (d.getTipo() == Almacenamiento.ARCHIVO &&
                d.getRuta().equals(ruta) && d.getNombre().equals(nombre))
            {
                Herramientas.eliminar_archivo_os(d.getRuta(), d.getNombre(), ".txt");
                itr.remove();
                return true;
            }
            else if (d.getTipo() == Almacenamiento.CARPETA)
                if (((Carpeta) d).eliminar_archivo(ruta, nombre))
                    return true;
        }
        return false;
    }
    
// -----------------------------------------------------------------------------
    
        public boolean eliminar_carpeta(String ruta, String nombre) throws Exception
    {
        Iterator itr = hijos.iterator();
        while (itr.hasNext())
        {
            Directorio d = (Directorio)itr.next();
            if (d.getTipo() == Almacenamiento.CARPETA)
            {
                if (d.getRuta().equals(ruta) && d.getNombre().equals(nombre))
                {
                    if (Herramientas.eliminar_carpeta_os(d.getRuta(), true))
                    {
                        itr.remove();
                        return true;
                    }
                }
                else
                    if (((Carpeta) d).eliminar_carpeta(ruta, nombre))
                        return true;                    
            }
        }
        return false;
    }
    
// -----------------------------------------------------------------------------
    
}
