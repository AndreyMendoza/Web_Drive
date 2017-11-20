

package tests;

import java.util.ArrayList;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Persona {

    private int edad;
    private String nombre;
    private String id;
    private final ArrayList<String> list = new ArrayList<>();
    Persona p;
    
    public Persona() {
    }

    public Persona(int edad, String nombre, String apellido) {
        super();
        this.edad = edad;
        this.nombre = nombre;
        this.id = apellido;
        list.add("hola");
        list.add("adios");
    }
    
    
    public void setPersona()
    {
        p = new Persona(30, "Armando", "201589");
    }
    
    @XmlElement
    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }
    
    @XmlElement
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @XmlAttribute
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
    @XmlElement
    public ArrayList<String> getList() {
        return list;
    }

    @XmlElement
    public Persona getP() {
        return p;
    }

    public void setP(Persona p) {
        this.p = p;
    }
    
    
    
    
}
