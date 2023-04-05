package com.freeuni.daskalos.utils;

import com.freeuni.daskalos.dto.UserDTO;
import com.freeuni.daskalos.repository.entities.Student;
import com.freeuni.daskalos.repository.entities.Teacher;
import com.freeuni.daskalos.repository.entities.User;

import java.util.Arrays;
import java.util.List;

public class UserUtils {

    public static final String URL_DELIMITER = "|";

    public static List<String> getNetworkUrls(String networkUrls) {
        return Arrays.stream(networkUrls.split(URL_DELIMITER)).toList();
    }

    public static String urlNetworks(List<String> networkUrls) {
        return String.join(", ", networkUrls);
    }

    public static User toUserEntity(UserDTO userDTO) {
        return userDTO.getUserType().equals("Teacher") ?
                new Teacher(userDTO.getMail(), userDTO.getPassword())
                :
                new Student(userDTO.getMail(), userDTO.getPassword());
    }

    public static UserDTO toUserDao(User userEntity) {
        return new UserDTO(userEntity.getMail(), userEntity.getPassword(), userEntity.getUserType().name());
    }
}
