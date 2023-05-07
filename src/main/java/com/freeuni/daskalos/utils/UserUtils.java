package com.freeuni.daskalos.utils;

import com.freeuni.daskalos.dto.UserAddressDTO;
import com.freeuni.daskalos.dto.UserDTO;
import com.freeuni.daskalos.repository.entities.Student;
import com.freeuni.daskalos.repository.entities.Teacher;
import com.freeuni.daskalos.repository.entities.User;
import com.freeuni.daskalos.repository.embeddables.UserAddress;

import java.util.Arrays;
import java.util.List;

public class UserUtils {

    public static final String URL_DELIMITER = "|";

    public static final double SEARCH_RADIUS = 20; // TODO REMOVE HARDCODED IN FUTURE

    public static final double EARTH_RADIUS = 6371;

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
        return new UserDTO(userEntity.getEmail(), userEntity.getPassword(), userEntity.getName(), userEntity.getSurname(), userEntity.getAddress(), userEntity.getUserType().name());
    }

    public static boolean isInRadius(UserAddress currentAddress, UserAddressDTO targetAddress, double radius) {
        double lat1 = currentAddress.getLatitude(), lon1 = currentAddress.getLongitude();
        double lat2 = targetAddress.getLatitude(), lon2 = targetAddress.getLongitude();

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = EARTH_RADIUS * c;

        return distance <= radius;
    }
}
