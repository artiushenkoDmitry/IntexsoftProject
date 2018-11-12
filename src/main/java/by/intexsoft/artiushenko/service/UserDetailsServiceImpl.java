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


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private static Logger log = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    @Autowired
    private UserService userService;

    /*public UserDetailsServiceImpl(UserService userService) {
        this.userService = userService;
    }*/

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("=====>Мы в методе loadUserByUsername UserDetailsServiceImpl-а 1 <=====");
        log.info("=====>username = "+username+" <=====");
        User user = userService.findByUsername(username);
        log.info("=====>Мы в методе loadUserByUsername UserDetailsServiceImpl-а 2 <=====");
        Set<GrantedAuthority> roles = new HashSet<>();
        log.info("=====>Мы в методе loadUserByUsername UserDetailsServiceImpl-а 3 <=====");
        log.info("=====>role: "+user.getRole()+" <=====");
        log.info("=====>role.type: "+user.getRole().getType()+" <=====");
        roles.add(new SimpleGrantedAuthority(user.getRole().getType()));
        log.info("=====>Мы в методе loadUserByUsername UserDetailsServiceImpl-а 4 <=====");
        log.info("=====>full_name: "+user.getFullName()+" <=====");
        log.info("=====>username: "+user.getUsername()+" <=====");
        log.info("=====>password: "+user.getPassword()+" <=====");
        log.info("=====>role: "+user.getRole()+" <=====");
        log.info("=====>role.type: "+user.getRole().getType()+" <=====");
        log.info("=====>roles: "+roles+" <=====");
        return new org.springframework.security.core.userdetails.User(user.getUsername(),
                        user.getPassword(),
                        roles);
    }
}
