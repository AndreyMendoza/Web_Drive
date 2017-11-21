package Model;

public class Usuario {

// -----------------------------------------------------------------------------
    
    private String usuario;
    private String password;
    private float tamanho_drive;
    
// -----------------------------------------------------------------------------

    public Usuario() {
    }
    
// -----------------------------------------------------------------------------    

    public Usuario(String usuario, String password, float tamanho_drive) {
        super();
        this.usuario = usuario;
        this.password = password;
        this.tamanho_drive = tamanho_drive;
    }
    
// -----------------------------------------------------------------------------
    
    public String getUsuario() {
        return usuario;
    }

// -----------------------------------------------------------------------------
    
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

// -----------------------------------------------------------------------------
    
    public String getPassword() {
        return password;
    }

// -----------------------------------------------------------------------------
    
    public void setPassword(String password) {
        this.password = password;
    }

// -----------------------------------------------------------------------------
    
    public float getTamanho_drive() {
        return tamanho_drive;
    }

// -----------------------------------------------------------------------------
    
    public void setTamanho_drive(float tamanho_drive) {
        this.tamanho_drive = tamanho_drive;
    }
    
// -----------------------------------------------------------------------------
    
}
