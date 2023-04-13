package com.freeuni.daskalos.utils;

import com.freeuni.daskalos.dto.UserDTO;
import com.freeuni.daskalos.repository.entities.Student;
import com.freeuni.daskalos.repository.entities.Teacher;
import com.freeuni.daskalos.repository.entities.User;

import java.util.Arrays;
import java.util.List;

public class UserUtils {

    public static final String URL_DELIMITER = "|";

    public static final String PASSWORD_PATTERN_REGEX = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}";

    public static List<String> getNetworkUrls(String networkUrls) {
        return Arrays.stream(networkUrls.split(URL_DELIMITER)).toList();
    }

    public static String urlNetworks(List<String> networkUrls) {
        return String.join(", ", networkUrls);
    }

    public static User toUserEntity(UserDTO userDTO) {
        return userDTO.getUserType().equals(UserType.TEACHER.name()) ?
                new Teacher(userDTO.getEmail(), userDTO.getPassword(), userDTO.getName(), userDTO.getSurname(), UserType.fromName(userDTO.getUserType()))
                :
                new Student(userDTO.getEmail(), userDTO.getPassword(), userDTO.getName(), userDTO.getSurname(), UserType.fromName(userDTO.getUserType()));
    }

    public static UserDTO toUserDao(User userEntity) {
        return new UserDTO(userEntity.getEmail(), userEntity.getPassword(), userEntity.getName(), userEntity.getSurname(), userEntity.getUserType().name());
    }
}
