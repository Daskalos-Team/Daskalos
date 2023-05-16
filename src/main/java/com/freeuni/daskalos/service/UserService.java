package com.freeuni.daskalos.service;

import com.freeuni.daskalos.dto.UserAddressDTO;
import com.freeuni.daskalos.dto.UserDTO;
import com.freeuni.daskalos.repository.UserRepository;
import com.freeuni.daskalos.repository.entities.User;
import com.freeuni.daskalos.utils.AuthorizationStatus;
import com.freeuni.daskalos.utils.UserType;
import com.freeuni.daskalos.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String checkUserWithEmail(String mail) {
        Optional<User> currentUser = userRepository.findByEmail(mail);

        if (currentUser.isPresent()) {
            return AuthorizationStatus.OK.name();
        }

        return AuthorizationStatus.EMAIL_NOT_FOUND.name();
    }

    public String checkUserWithEmailAndPassword(String mail, String password) {
        Optional<User> currentUser = userRepository.findByEmail(mail);

        if (currentUser.isPresent()) {
            return AuthorizationStatus.ALREADY_EXISTS.name();
        }

        if (!password.matches(UserUtils.PASSWORD_PATTERN_REGEX)) {
            return AuthorizationStatus.ILLEGAL_PASSWORD.name();
        }

        return AuthorizationStatus.OK.name();
    }

    public String addUser(UserDTO user) {
        Optional<User> currentUser = userRepository.findByEmail(user.getEmail());

        if (currentUser.isEmpty()) {
            userRepository.save(UserUtils.toUserEntity(user));
            return AuthorizationStatus.SUCCESSFUL_REGISTRATION.name();
        }

        return AuthorizationStatus.ALREADY_EXISTS.name();
    }

    public String authorizeUser(UserDTO user) {
        Optional<User> currentUser = userRepository.findByEmail(user.getEmail());

        if (currentUser.isEmpty()) {
            return AuthorizationStatus.EMAIL_NOT_FOUND.name();
        } else if (!user.isUsingGoogle() && !currentUser.get().getPassword().equals(user.getPassword())) {
            return AuthorizationStatus.WRONG_PASSWORD.name();
        }

        return AuthorizationStatus.SUCCESSFUL_LOGIN.name();
    }

    public String changePassword(String email, String password) {
        if (!password.matches(UserUtils.PASSWORD_PATTERN_REGEX)) {
            return AuthorizationStatus.ILLEGAL_PASSWORD.name();
        }

        Optional<User> currentUser = userRepository.findByEmail(email);
        currentUser.ifPresent(user -> {
            user.setPassword(password);
            userRepository.save(user);
        });

        return AuthorizationStatus.SUCCESSFUL_CHANGE.name();
    }

    public List<UserDTO> getAllTeachersInRadius(UserAddressDTO address) {
        Iterable<User> all = userRepository.findAll();
        return StreamSupport.stream(all.spliterator(), false)
                .map(UserUtils::toUserDTO)
                .filter(userDTO -> userDTO.getUserType().equals(UserType.TEACHER.name()) && UserUtils.isInRadius(userDTO.getAddress(), address, UserUtils.SEARCH_RADIUS))
                .collect(Collectors.toList());
    }

    public List<UserDTO> getAllUsers() {
        Iterable<User> all = userRepository.findAll();
        return StreamSupport.stream(all.spliterator(), false).map(UserUtils::toUserDTO).collect(Collectors.toList());
    }
}
