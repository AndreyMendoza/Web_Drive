
package Model;

import java.util.ArrayList;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ListaUsuarios {

// -----------------------------------------------------------------------------
    
    private ArrayList<UsuarioModel> usuarios = new ArrayList<>();

// -----------------------------------------------------------------------------
    
    public ListaUsuarios() {
        super();
    }
    
// -----------------------------------------------------------------------------
    
    @XmlElement
    public ArrayList<UsuarioModel> getUsuarios() {
        return usuarios;
    }

// -----------------------------------------------------------------------------
    
    public boolean agregar_usuario(UsuarioModel usuario)
    {
        for (UsuarioModel u : usuarios)
        {
            // Verificar que el usuario no este repetido
            if (u.getUsuario().equals(usuario.getUsuario()))
                return false;
        }        
        usuarios.add(usuario);
        return true;
    }
    
// -----------------------------------------------------------------------------
    
    public void setUsuarios(ArrayList<UsuarioModel> usuarios) {
        this.usuarios = usuarios;
    }
    
// -----------------------------------------------------------------------------   

    public boolean login(String usuario, String password)
    {
        for (UsuarioModel u : usuarios)
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
