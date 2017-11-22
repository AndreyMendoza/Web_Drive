
package tests;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Scanner;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;


public class Tests {


    public static void main(String[] args) throws JAXBException, FileNotFoundException, UnsupportedEncodingException, IOException {
//        JAXBContext ctx = JAXBContext.newInstance(ListaUsuarios.class);
//        
//        Marshaller marsh = ctx.createMarshaller();
//        marsh.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
//        
//        File file = new File("pruebas.xml");
//        ListaUsuarios ls = new ListaUsuarios();
//        
//        UsuarioModel u1 = new UsuarioModel("usuario 1", "asd", 11);
//        UsuarioModel u2 = new UsuarioModel("usuario 2", "asd", 11);
//        ls.agregar_usuario(u1);
//        ls.agregar_usuario(u2);
//        
//        marsh.marshal(ls, file);
//        
//        
//        // ---------------------------------------------------------------------
//        
//         file = new File("pruebas.xml");
//         JAXBContext jaxbContext = JAXBContext.newInstance(ListaUsuarios.class);    
//         
//        Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();    
//        ListaUsuarios e = (ListaUsuarios) jaxbUnmarshaller.unmarshal(file);    
        
//          File archivo = new File("archivo.txt");
//          FileOutputStream fos = new FileOutputStream(archivo);
//          BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fos));
//          String a = "\nadasdasd\nasdasdasd\nasdasdasdasdasd\nasbbddbdbbd";
//          bw.write(a);
//          bw.write(a);
//          bw.close();
//          
//          
//        File file = new File("archivo.txt");
//        String content = new Scanner(file).useDelimiter("\\Z").next();
//        System.out.println(content);
        
        Files.delete(Paths.get("archivo.txt"));
        
    }
}
   
