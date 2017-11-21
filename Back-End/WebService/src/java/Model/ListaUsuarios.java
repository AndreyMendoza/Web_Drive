
package Model;

import java.util.ArrayList;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ListaUsuarios {

// -----------------------------------------------------------------------------
    
    private ArrayList<Usuario> usuarios = new ArrayList<>();

// -----------------------------------------------------------------------------
    
    public ListaUsuarios() {
        super();
    }
    
// -----------------------------------------------------------------------------
    
    @XmlElement
    public ArrayList<Usuario> getUsuarios() {
        return usuarios;
    }

// -----------------------------------------------------------------------------
    
    public boolean agregar_usuario(Usuario usuario)
    {
        for (Usuario u : usuarios)
        {
            // Verificar que el usuario no este repetido
            if (u.getUsuario().equals(usuario.getUsuario()))
                return false;
        }        
        usuarios.add(usuario);
        return true;
    }
    
// -----------------------------------------------------------------------------
    
    public void setUsuarios(ArrayList<Usuario> usuarios) {
        this.usuarios = usuarios;
    }
    
// -----------------------------------------------------------------------------   

    public boolean login(String usuario, String password)
    {
        for (Usuario u : usuarios)
        {
            // Verificar que el usuario no este repetido
            if (u.getUsuario().equals(usuario) &&
                u.getPassword().equals(password))
                return true;
        } 
        return false;
    }
    
// -----------------------------------------------------------------------------  
    
}
