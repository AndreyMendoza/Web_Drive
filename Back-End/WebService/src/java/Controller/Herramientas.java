package Controller;

import Model.Almacenamiento;
import Model.Archivo;
import Model.Carpeta;
import Model.ListaUsuarios;
import Model.Usuario;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;


public class Herramientas {

// -----------------------------------------------------------------------------

    private final static String drive_path = 
            "C:/xampp/htdocs/Web_Drive/Back-End/WebService/Drive";
            //"C:\\Users\\Andrey\\Documents\\Git\\Web_Drive\\Back-End\\WebService\\Drive";
    
// -----------------------------------------------------------------------------
    
    public static ListaUsuarios leer_usuarios()
    {
        ListaUsuarios usuarios = new ListaUsuarios();
        try {
            File file = new File(drive_path + "/usuarios.xml");
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

               File file = new File(drive_path + "/usuarios.xml");
               marsh.marshal(usuarios, file);

               String nombre_usuario = usuario.getUsuario();
               crear_carpeta_os(nombre_usuario);
               crear_carpeta_os(nombre_usuario + "/Archivos Compartidos");
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

    private static boolean crear_carpeta_os(String ruta_nombre)
    {
        File dir = new File(drive_path + "/" + ruta_nombre);
        
        if (!dir.exists())
        {
            return dir.mkdir();
        }
        return false;
    }

// -----------------------------------------------------------------------------
    
    public static boolean crear_carpeta_fs(String usuario, String ruta, String nombre) throws Exception
    {       
        String ruta_completa = ruta + "/" + nombre;
        
        if (crear_carpeta_os(ruta_completa))
        {
            try {
                Carpeta directorio = cargar_file_system(usuario);
                Carpeta nueva_carpeta = new Carpeta(nombre,
                        ruta_completa,
                        0,
                        Almacenamiento.CARPETA);
                directorio.agregar_hijo(ruta, nueva_carpeta);
                return guardar_file_system(usuario, directorio);
            } catch (Exception ex) {
                throw new Exception("Error");
            }
        }
        return false;
    }
    
// -----------------------------------------------------------------------------
    
    public static boolean crear_archivo_fs(String usuario, String ruta, 
                                           String nombre,String extension, 
                                           String contenido, boolean reemplazar) throws Exception
    {
        try {
            // Tamanho en megabytes
            long tamanho = crear_archivo_os(usuario, drive_path + "/" + ruta + "/", nombre + extension,contenido, reemplazar);
            if (tamanho != -999)
            {
                Carpeta directorio = cargar_file_system(usuario);
                Archivo archivo = new Archivo(nombre, ruta, tamanho, Almacenamiento.ARCHIVO, extension);
                
                directorio.agregar_hijo(ruta, archivo);
                
                if (directorio.modificar_peso_archivo(ruta, nombre, tamanho))
                    directorio.atualizar_pesos();
                
                guardar_file_system(usuario, directorio);

                return true;

            }
            return false;
        } catch (Exception ex) {
            throw new Exception("Error");
        }
    }
    
// -----------------------------------------------------------------------------
    
    private static long crear_archivo_os(String usuario, String ruta, String nombre, String contenido, boolean reemplazar) throws Exception
    {
        String tmp = ruta + "tmp-" + nombre;
        String ruta_nombre = ruta + nombre;
        
        try {
            File archivo = new File(ruta_nombre);
            long tamanho_actual = archivo.length();   
            
            if(!archivo.exists() && !archivo.isDirectory())
            {   
                
                FileOutputStream fos = new FileOutputStream(archivo);
                BufferedWriter handler = new BufferedWriter(new OutputStreamWriter(fos));     

                handler.write(contenido);
                handler.close();
                fos.close(); 
                
                if (!espacio_disponible(usuario, archivo.length(), 0))
                   Files.delete(Paths.get(ruta_nombre));
                else
                    return archivo.length();
            }
            else
            {
                if (reemplazar)
                {
                    File temporal = new File(tmp);
                    FileOutputStream fos = new FileOutputStream(temporal);
                    BufferedWriter handler = new BufferedWriter(new OutputStreamWriter(fos));     

                    handler.write(contenido);
                    handler.close();
                    fos.close(); 
                    
                    if (espacio_disponible(usuario, temporal.length(), tamanho_actual))
                    {
                       Files.delete(Paths.get(tmp));
                       FileOutputStream fileoutput = new FileOutputStream(archivo);
                       BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fileoutput));     

                       bw.write(contenido);
                       bw.close();
                       fos.close(); 
                       return archivo.length();
                    }
                    Files.delete(Paths.get(ruta_nombre));
                        
                }
            }
            
        } catch (Exception ex) {
            throw new Exception("Error");
        } 
        return -999;
    }
    
// -----------------------------------------------------------------------------
    
    public static boolean espacio_disponible(String usuario, long espacio, long actual) throws Exception
    {
        ListaUsuarios usuarios = leer_usuarios();
        Carpeta directorio = cargar_file_system(usuario);
        
        for (Usuario u : usuarios.getUsuarios())
            if (u.getUsuario().equals(usuario))
            {
                float disponible = u.getTamanho_drive() - directorio.getTamanho() + actual;
                if (disponible - espacio >= 0)
                {
//                    directorio.setTamanho(directorio.getTamanho() + actual);
//                    guardar_file_system(usuario, directorio);
                    return true;
                }
                break;
            }
        return false;
    }
    
// -----------------------------------------------------------------------------
    
    public static Carpeta buscar_directorio(String usuario, String ruta)
    {
        Carpeta directorio = cargar_file_system(usuario);
        return directorio.buscar_directorio(ruta);
    }
    
// -----------------------------------------------------------------------------
    
    public static String crear_json(Object objeto)
    {
        Gson gson = new GsonBuilder().create();
        String result = gson.toJson(objeto);
        return result;
    }

// -----------------------------------------------------------------------------
    
    public static String leer_archivo(String ruta) throws IOException 
    {
        File file = new File(ruta);
        String contenido = new Scanner(file).useDelimiter("\\Z").next();
        return contenido;
}
    
// -----------------------------------------------------------------------------

    public static boolean crear_file_system(String usuario) throws Exception
    {
        // Creando estructura en memoria
        Carpeta directorio = new Carpeta(usuario,
                usuario,
                0,
                Almacenamiento.CARPETA);
        Carpeta compartidos = new Carpeta("Archivos Compartidos",
                directorio.getRuta() + "/Archivos Compartidos",
                0,
                Almacenamiento.CARPETA);
        directorio.agregar_hijo(directorio.getRuta(), compartidos);        
        
        // Guardar estructura en memoria en un XML
        return guardar_file_system(usuario, directorio);
    }

// -----------------------------------------------------------------------------
    
    public static boolean guardar_file_system(String usuario, Carpeta file_system) throws Exception
    {
        try {
            // Guardar estructura en memoria a un XML
            JAXBContext ctx = JAXBContext.newInstance(Carpeta.class);
            Marshaller marsh = ctx.createMarshaller();
            marsh.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
            
            File file = new File(drive_path + "/" + usuario + "/file_system.xml");
            marsh.marshal(file_system, file);
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
            File file = new File(drive_path + "/" + usuario + "/file_system.xml");
            JAXBContext jaxbContext = JAXBContext.newInstance(Carpeta.class);
            
            Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
            directorio = (Carpeta) jaxbUnmarshaller.unmarshal(file);
            
        } catch (JAXBException ex) {
            Logger.getLogger(Herramientas.class.getName()).log(Level.SEVERE, null, ex);
        }
        return directorio;
    }
    
// -----------------------------------------------------------------------------
    
}
