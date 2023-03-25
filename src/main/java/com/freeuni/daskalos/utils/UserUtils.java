package com.freeuni.daskalos.utils;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class UserUtils {

    public static final String URL_DELIMITER = "|";

    public static List<String> getNetworkUrls(String networkUrls) {
        return Arrays.stream(networkUrls.split(URL_DELIMITER)).toList();
    }

    public static String urlNetworks(List<String> networkUrls) {
        return networkUrls.stream().collect(Collectors.joining(", "));
    }
}
