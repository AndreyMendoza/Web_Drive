package Model;


public class Archivo extends Directorio{

// -----------------------------------------------------------------------------
    
    private String extension;
    
// -----------------------------------------------------------------------------

    public Archivo() {
    }

// -----------------------------------------------------------------------------
    
    public Archivo(String Nombre, String ruta, float tamanho) {
        super(Nombre, ruta, tamanho);
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

    public String getExtension() {
        return extension;
    }
    
// -----------------------------------------------------------------------------

    public void setExtension(String extension) {
        this.extension = extension;
    }
    
// -----------------------------------------------------------------------------
    
}
