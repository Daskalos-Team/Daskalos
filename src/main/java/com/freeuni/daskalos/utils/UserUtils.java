package com.freeuni.daskalos.utils;

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
}
