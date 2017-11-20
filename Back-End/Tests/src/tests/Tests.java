
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
        JAXBContext ctx = JAXBContext.newInstance(Persona.class);
        
        Marshaller marsh = ctx.createMarshaller();
        marsh.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
        
        Persona p1 = new Persona(20, "Andrey", "201508");
        p1.setPersona();
        
        marsh.marshal(p1, new FileOutputStream("persona.xml"));
        
        // ---------------------------------------------------------------------
        
         File file = new File("persona.xml");
         JAXBContext jaxbContext = JAXBContext.newInstance(Persona.class);    
         
        Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();    
        Persona e = (Persona) jaxbUnmarshaller.unmarshal(file);    
        System.out.println(e.getId()+" "+e.getNombre()+" "+e.getEdad());  
        
        Persona p2 = e.getP();
        System.out.println(p2.getId() + " " + p2.getNombre() + " " + p2.getEdad());  
              
    }
}
   
