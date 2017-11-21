
package tests;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;


public class Tests {


    public static void main(String[] args) throws JAXBException, FileNotFoundException {
        JAXBContext ctx = JAXBContext.newInstance(ListaUsuarios.class);
        
        Marshaller marsh = ctx.createMarshaller();
        marsh.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
        
        File file = new File("pruebas.xml");
        ListaUsuarios ls = new ListaUsuarios();
        
        UsuarioModel u1 = new UsuarioModel("usuario 1", "asd", 11);
        UsuarioModel u2 = new UsuarioModel("usuario 2", "asd", 11);
        ls.agregar_usuario(u1);
        ls.agregar_usuario(u2);
        
        marsh.marshal(ls, file);
        
        
        // ---------------------------------------------------------------------
        
         file = new File("pruebas.xml");
         JAXBContext jaxbContext = JAXBContext.newInstance(ListaUsuarios.class);    
         
        Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();    
        ListaUsuarios e = (ListaUsuarios) jaxbUnmarshaller.unmarshal(file);    
        
        System.out.println(e.toString());
              
    }
}
   
