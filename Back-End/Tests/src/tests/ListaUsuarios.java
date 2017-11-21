
package tests;

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
    
    public void agregar_usuario(UsuarioModel usuario)
    {
        usuarios.add(usuario);
    }
    
// -----------------------------------------------------------------------------
    
    public void setUsuarios(ArrayList<UsuarioModel> usuarios) {
        this.usuarios = usuarios;
    }
    
// -----------------------------------------------------------------------------   

    @Override
    public String toString() {
        return "ListaUsuarios{" + "usuarios=" + usuarios + '}';
    }
    


}
