
package Model;

import java.util.Date;
import javax.xml.bind.annotation.XmlElement;


public class Directorio {

// -----------------------------------------------------------------------------
    
    protected String Nombre;
    protected String ruta;
    protected float tamanho;
    protected Date fecha_creado;
    protected Date fecha_modificado;
    protected Almacenamiento tipo;

// -----------------------------------------------------------------------------

    public Directorio() {
    }
    
// -----------------------------------------------------------------------------
    
    public Directorio(String Nombre, String ruta, float tamanho, Almacenamiento tipo) {
        super();
        this.Nombre = Nombre;
        this.ruta = ruta;
        this.tamanho = tamanho;
        this.fecha_creado = new Date();
        this.fecha_modificado = new Date();
        this.tipo = tipo;
    }
    
 // -----------------------------------------------------------------------------   
    
    @XmlElement
    public String getNombre() {
        return Nombre;
    }

// -----------------------------------------------------------------------------
    
    public void setNombre(String Nombre) {
        this.Nombre = Nombre;
    }

// -----------------------------------------------------------------------------
    
    @XmlElement
    public String getRuta() {
        return ruta;
    }

// -----------------------------------------------------------------------------
    
    public void setRuta(String ruta) {
        this.ruta = ruta;
    }

// -----------------------------------------------------------------------------
    
    @XmlElement
    public float getTamanho() {
        return tamanho;
    }

    public void setTamanho(float tamanho) {
        this.tamanho = tamanho;
    }

// -----------------------------------------------------------------------------
    
    @XmlElement
    public Date getFecha_creado() {
        return fecha_creado;
    }

// -----------------------------------------------------------------------------
    
    public void setFecha_creado(Date fecha_creado) {
        this.fecha_creado = fecha_creado;
    }

// -----------------------------------------------------------------------------
    
    @XmlElement
    public Date getFecha_modificado() {
        return fecha_modificado;
    }

// -----------------------------------------------------------------------------
    
    public void setFecha_modificado(Date fecha_modificado) {
        this.fecha_modificado = fecha_modificado;
    }
    
// -----------------------------------------------------------------------------

    @XmlElement
    public Almacenamiento getTipo() {
        return tipo;
    }
    
// -----------------------------------------------------------------------------

    public void setTipo(Almacenamiento tipo) {
        this.tipo = tipo;
    }

// -----------------------------------------------------------------------------  
    
}
