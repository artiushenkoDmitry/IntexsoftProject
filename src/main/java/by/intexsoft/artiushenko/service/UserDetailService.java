package by.intexsoft.artiushenko.service;

import by.intexsoft.artiushenko.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashSet;
import java.util.Set;

/**
 * Сервис предоставляющий имя, пароль и роль пользователя
 */
@Service
public class UserDetailService implements UserDetailsService {

    @Autowired
    UserService userService;

    /**
     * Возвращает объект user с заполненными полями
     * @param username - имя пользователя
     * @return - Возвращает пользователя с заполненными полями
     * @throws UsernameNotFoundException - генерируемое исключение
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findByUsername(username);
        Set<GrantedAuthority> roles = new HashSet<>();
        roles.add(new SimpleGrantedAuthority(user.getRole().getType()));
        return new org.springframework.security.core.userdetails.User(user.getUsername(),
                        user.getPassword(),
                        roles);
    }
}
