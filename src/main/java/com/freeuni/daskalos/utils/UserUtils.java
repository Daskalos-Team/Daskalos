package com.freeuni.daskalos.utils;

import com.freeuni.daskalos.dto.TeacherDTO;
import com.freeuni.daskalos.dto.TeacherRatingDTO;
import com.freeuni.daskalos.dto.UserAddressDTO;

import java.util.Arrays;
import java.util.List;

public class UserUtils {

    public static final String URL_DELIMITER = "|";

    public static final double EARTH_RADIUS = 6371;

    public static final String PASSWORD_PATTERN_REGEX = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}";

    public static List<String> getNetworkUrls(String networkUrls) {
        return Arrays.stream(networkUrls.split(URL_DELIMITER)).toList();
    }

    public static String urlNetworks(List<String> networkUrls) {
        return String.join(", ", networkUrls);
    }

    public static boolean isInRadius(UserAddressDTO currentAddress, UserAddressDTO targetAddress, double radius) {
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

    public static Double teacherAverageRating(TeacherDTO teacherDTO) {
        double res = teacherDTO.getTeacherRatings().stream().mapToDouble(TeacherRatingDTO::getRating).sum() / teacherDTO.getTeacherRatings().size();
        return Double.isNaN(res) ? 0 : res;
    }
}
