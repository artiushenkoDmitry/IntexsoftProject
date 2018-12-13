package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.controller.VendorCodeController;
import by.intexsoft.artiushenko.entity.Order;
import by.intexsoft.artiushenko.repository.IOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.util.List;
import java.util.Properties;

/**
 * Сервис описывающий основые методы для работы с сущностью Order
 */
@Service
public class OrderService {
    @Autowired
    IOrderRepository IOrderRepository;

    /**
     * Возвращает список сущностей order
     */
    public List<Order> findAll(){
        List<Order> list = IOrderRepository.findAll();
        return list;
    }

    /**
     * Вносит запись в базу данных (в таблицу t_order)
     */
    public Order create(Order order) {
        return IOrderRepository.save(order);
    }

    /**
     * Удаляет запись из базы данных (из таблицы t_order)
     */
    public void delete(int id) {
        IOrderRepository.deleteById(id);
    }

    /**
     * Высылает письмо покупателю о том, что его заказ подтверждени и удаляет соответствующую запись из
     * даблицы заказов.
     * @param id - идентификатор заказа
     */
    public void deleteAndSendMessage(int id) {
        final Properties properties= new Properties();

        Order order = select(id);
        try {
            properties.load(VendorCodeController.class.getClassLoader().getResourceAsStream("mail.properties"));
            Session session = Session.getDefaultInstance(properties);
            MimeMessage mimeMessage = new MimeMessage(session);
            mimeMessage.setFrom(new InternetAddress("intexsoftProject@gmail.com"));
            mimeMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(order.getCustomerEMail()));
            mimeMessage.setSubject("Your order has been approved");
            mimeMessage.setText("Hi! \n" +
                    "Your order number: "+order.getId()+" has been approved. \n"+
                    "\n"+
                    "Best regards,\n"+
                    "Artiushenko Dmitry"
            );

            Transport transport = session.getTransport();
            transport.connect(null, "Toi3aich");
            transport.sendMessage(mimeMessage, mimeMessage.getAllRecipients());
            transport.close();
        } catch (IOException | MessagingException e) {
            e.printStackTrace();
        }
        IOrderRepository.deleteById(id);
    }
    /**
     * Выбирает запись из базы данных (из таблицы t_order) по id
     */
    public Order select(Integer id) {
        return IOrderRepository.findById(id).get();
    }

}
