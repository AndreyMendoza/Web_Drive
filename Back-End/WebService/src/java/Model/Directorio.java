
package Model;

import java.util.Date;


public class Directorio {

// -----------------------------------------------------------------------------
    
    private String Nombre;
    private String ruta;
    private float tamanho;
    private Date fecha_creado;
    private Date fecha_modificado;
    private Almacenamiento tipo;

// -----------------------------------------------------------------------------

    public Directorio() {
    }
    
// -----------------------------------------------------------------------------
    
    public Directorio(String Nombre, String ruta, float tamanho, Almacenamiento tipo) {
        this.Nombre = Nombre;
        this.ruta = ruta;
        this.tamanho = tamanho;
        this.fecha_creado = new Date();
        this.fecha_modificado = new Date();
        this.tipo = tipo;
    }
    
 // -----------------------------------------------------------------------------   
    
    public String getNombre() {
        return Nombre;
    }

// -----------------------------------------------------------------------------
    
    public void setNombre(String Nombre) {
        this.Nombre = Nombre;
    }

// -----------------------------------------------------------------------------
    
    public String getRuta() {
        return ruta;
    }

// -----------------------------------------------------------------------------
    
    public void setRuta(String ruta) {
        this.ruta = ruta;
    }

// -----------------------------------------------------------------------------
    
    public float getTamanho() {
        return tamanho;
    }

    public void setTamanho(float tamanho) {
        this.tamanho = tamanho;
    }

// -----------------------------------------------------------------------------
    
    public Date getFecha_creado() {
        return fecha_creado;
    }

// -----------------------------------------------------------------------------
    
    public void setFecha_creado(Date fecha_creado) {
        this.fecha_creado = fecha_creado;
    }

// -----------------------------------------------------------------------------
    
    public Date getFecha_modificado() {
        return fecha_modificado;
    }

// -----------------------------------------------------------------------------
    
    public void setFecha_modificado(Date fecha_modificado) {
        this.fecha_modificado = fecha_modificado;
    }
    
// -----------------------------------------------------------------------------

    public Almacenamiento getTipo() {
        return tipo;
    }
    
// -----------------------------------------------------------------------------

    public void setTipo(Almacenamiento tipo) {
        this.tipo = tipo;
    }

// -----------------------------------------------------------------------------  
    
}
