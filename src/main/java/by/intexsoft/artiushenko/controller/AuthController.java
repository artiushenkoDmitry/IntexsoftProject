package by.intexsoft.artiushenko.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Контроллер содержащий методы для авторизации пользователя
 */
@CrossOrigin
@RestController
@RequestMapping("auth")
public class AuthController {

    /**
     * Метод авторизации пользователя
     */
    @GetMapping
    public User getAuthorize(Authentication authentication) {
        return (User) authentication.getPrincipal();
    }
}