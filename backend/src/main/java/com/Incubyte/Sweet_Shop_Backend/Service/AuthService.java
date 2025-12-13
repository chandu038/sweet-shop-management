package com.Incubyte.Sweet_Shop_Backend.Service;

import com.Incubyte.Sweet_Shop_Backend.Model.User;

public interface AuthService {
    User register(User user);

    String login(String username, String password);
}