package Controller;

import Model.Almacenamiento;
import Model.Carpeta;
import Model.ListaUsuarios;
import Model.Usuario;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.File;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;


public class Herramientas {

// -----------------------------------------------------------------------------

    private final static String drive_path = 
            "C:\\Users\\Andrey\\Documents\\Git\\Web_Drive\\Back-End\\WebService\\Drive";
    
// -----------------------------------------------------------------------------
    
    public static ListaUsuarios leer_usuarios()
    {
        ListaUsuarios usuarios = new ListaUsuarios();
        try {
            File file = new File(drive_path + "\\usuarios.xml");
            JAXBContext jaxbContext = JAXBContext.newInstance(ListaUsuarios.class);
            
            Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
            usuarios = (ListaUsuarios) jaxbUnmarshaller.unmarshal(file);
            
        } catch (JAXBException ex) {
            Logger.getLogger(Herramientas.class.getName()).log(Level.SEVERE, null, ex);
        }
        return usuarios;
    }
    
// -----------------------------------------------------------------------------
    
    public static boolean agregar_usuario(Usuario usuario) throws Exception
    {
        try {
            
           ListaUsuarios usuarios = leer_usuarios();
           if (usuarios.agregar_usuario(usuario))
           {
               JAXBContext ctx = JAXBContext.newInstance(ListaUsuarios.class);            
               Marshaller marsh = ctx.createMarshaller();
               marsh.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true); 

               File file = new File(drive_path + "\\usuarios.xml");
               marsh.marshal(usuarios, file);

               String nombre_usuario = usuario.getUsuario();
               crear_carpeta(nombre_usuario);
               crear_carpeta(nombre_usuario + "\\Archivos Compartidos");
               crear_file_system(nombre_usuario);
               return true;
           }
        } catch (JAXBException ex) {
            throw new Exception("Error");
        }
        return false;
    }
    
// -----------------------------------------------------------------------------
    
    public static boolean login(String usuario, String password)
    {
        ListaUsuarios usuarios = leer_usuarios();        
        return usuarios.login(usuario, password);
    }
    
// -----------------------------------------------------------------------------

    public static boolean crear_carpeta(String ruta_nombre)
    {
        File dir = new File(drive_path + "\\" + ruta_nombre);
        
        if (!dir.exists())
        {
            return dir.mkdir();
        }
        return false;
    }
    
// -----------------------------------------------------------------------------
    
    public static String crear_json(Object objeto)
    {
        Gson gson = new GsonBuilder().create();
        String result = gson.toJson(objeto);
        return result;
    }
    
// -----------------------------------------------------------------------------

    public static boolean crear_file_system(String usuario) throws Exception
    {
        try {
            // Creando estructura en memoria
            Carpeta directorio = new Carpeta(usuario,
                    usuario,
                    0,
                    Almacenamiento.CARPETA);
            Carpeta compartidos = new Carpeta(usuario,
                    directorio.getRuta() + "\\Archivos Compartidos",
                    0,
                    Almacenamiento.CARPETA);
            directorio.agregar_hijo(compartidos);
            
            // Guardar estructura en memoria a un XML   
            JAXBContext ctx = JAXBContext.newInstance(Carpeta.class);
            Marshaller marsh = ctx.createMarshaller();
            marsh.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
            
            File file = new File(drive_path + "\\" + usuario + "\\file_system.xml");
            marsh.marshal(directorio, file);
            return true;
        } catch (JAXBException ex) {
            throw new Exception("Error");
        }
    }
    
// -----------------------------------------------------------------------------
    
    public static Carpeta cargar_file_system(String usuario)
    {
        Carpeta directorio = null;
        try {
            File file = new File(drive_path + "\\" + usuario + "\\file_system.xml");
            JAXBContext jaxbContext = JAXBContext.newInstance(Carpeta.class);
            
            Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
            directorio = (Carpeta) jaxbUnmarshaller.unmarshal(file);
            
        } catch (JAXBException ex) {
            Logger.getLogger(Herramientas.class.getName()).log(Level.SEVERE, null, ex);
        }
        return directorio;
    }
    
// -----------------------------------------------------------------------------

    private static Carpeta buscar_carpeta(String usuario, String nombre_carpeta)
    {
        
        
        return null;
    }
}
