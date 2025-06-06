package com.vitalize.services;

import java.util.List;
import java.util.Optional;

import com.vitalize.entities.User;

public interface UserService {
    User saveUser(User user);
    Optional<User> getUserById(String userId);
    Optional<User> updateUser(User user);
    void deleteUser(String userId);
    boolean isUserExist(String userId);
    boolean isUserExistByEmail(String email);
    List<User> getAllUsers();
    User getUserByEmail(String email);
}
