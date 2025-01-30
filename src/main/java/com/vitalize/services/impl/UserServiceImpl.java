package com.vitalize.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vitalize.entities.User;
import com.vitalize.repositories.UserRepo;
import com.vitalize.services.UserService;
import com.vitalize.helpers.AppConstants;
import com.vitalize.helpers.ResourceNotFoundException;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder encoder;
    Logger logger=LoggerFactory.getLogger(this.getClass());
    @Override
    public User saveUser(User user) {
        String userId = UUID.randomUUID().toString();
        user.setUserId(userId);
        user.setPassword(encoder.encode(user.getPassword()));
        user.setRoles(List.of(AppConstants.ROLE_USER));
       return userRepo.save(user);
    }

    @Override
    public Optional<User> getUserById(String userId) {
       return userRepo.findById(userId);
    }

    @Override
    public Optional<User> updateUser(User user) {
        User user2 = userRepo.findById(user.getUserId()).orElseThrow(()->{throw new ResourceNotFoundException("User not found");});
        user2.setName(user.getName());
        user2.setEmail(user.getEmail());
        user2.setPassword(user.getPassword());
        user2.setAbout(user.getAbout());
        user2.setProfilePic(user.getProfilePic());
        user2.setPhoneNumber(user.getPhoneNumber());
        user2.setEnabled(user.isEnabled());
        user2.setVerifiedEmail(user.isVerifiedEmail());
        user2.setVerifiedPhone(user.isVerifiedPhone());
        user2.setProvider(user.getProvider());
        user2.setProviderId(user.getProviderId());
        User save = userRepo.save(user2);
        return Optional.ofNullable(save);
    }

    @Override
    public void deleteUser(String userId) {
        User user2 = userRepo.findById(userId).orElseThrow(()->{throw new ResourceNotFoundException("User not found");});
        userRepo.delete(user2);
    }

    @Override
    public boolean isUserExist(String userId) {
        User byId = userRepo.findById(userId).orElse(null);
        return byId!=null?true:false;
    }
    @Override
    public boolean isUserExistByEmail(String email) {
    User byEmail = userRepo.findByEmail(email).orElse(null);
        return byEmail!=null?true:false;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }


}
