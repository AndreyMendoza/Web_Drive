package Model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Archivo extends Directorio{

// -----------------------------------------------------------------------------
    
    private String extension;
    
// -----------------------------------------------------------------------------

    public Archivo() {
    }

// -----------------------------------------------------------------------------
    
    public Archivo(String Nombre, String ruta, float tamanho, Almacenamiento tipo, String extension) {
        super(Nombre, ruta, tamanho, tipo);
        this.extension = extension;
    }

// -----------------------------------------------------------------------------
    
    public boolean modificar_contenido(String contenido)
    {
        return false;
    }
    
// -----------------------------------------------------------------------------
    
    public String ver_contenido()
    {
        return null;
    }
    
// -----------------------------------------------------------------------------

    @XmlElement
    public String getExtension() {
        return extension;
    }
    
// -----------------------------------------------------------------------------

    public void setExtension(String extension) {
        this.extension = extension;
    }
    
// -----------------------------------------------------------------------------
    
}
