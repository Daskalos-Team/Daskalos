package com.freeuni.daskalos.service.newsFeed.filters;

import com.freeuni.daskalos.dto.FilterDTO;
import com.freeuni.daskalos.dto.SubjectDTO;
import com.freeuni.daskalos.dto.TeacherDTO;
import com.freeuni.daskalos.service.user.UserService;

import java.util.List;
import java.util.Map;
import java.util.OptionalInt;
import java.util.Set;
import java.util.stream.Collectors;

public class TeacherFilterProcessor implements FilterProcessor {

    private final UserService userService;

    private final FilterDTO filter;

    private final Long studentID;

    public TeacherFilterProcessor(FilterDTO filter, UserService userService, Long studentID) {
        this.filter = filter;
        this.userService = userService;
        this.studentID = studentID;
    }

    @Override
    public boolean checkUser(Long userID) {
        TeacherDTO teacherDTO = userService.getTeacherDTO(userID);
        return checkSubjects(teacherDTO) &&
                checkPriceRange(teacherDTO) &&
                checkFavourites(userID) &&
                checkOnPlace(teacherDTO) &&
                checkNameSurname(teacherDTO);
    }

    private boolean checkSubjects(TeacherDTO teacherDTO) {
        List<String> chosenSubjects = filter.getSubjectsOnly();
        if (chosenSubjects == null || chosenSubjects.isEmpty()) {
            return true;
        }
        Set<String> userSubjects = teacherDTO.getTeacherSubjects().stream().map(SubjectDTO::getName).collect(Collectors.toSet());
        for (String subject : chosenSubjects) {
            if (userSubjects.contains(subject)) {
                return true;
            }
        }
        return false;
    }

    private boolean checkPriceRange(TeacherDTO teacherDTO) {
        if (filter.getMinPrice() == null && filter.getMaxPrice() == null) {
            return true;
        }
        if (teacherDTO.getTeacherSubjects().isEmpty()) {
            return false;
        }
        Map.Entry<Integer, Integer> teacherMinMaxPrice = getTeacherMinMaxPrice(teacherDTO);
        if (filter.getMinPrice() == null) {
            return filter.getMaxPrice() >= teacherMinMaxPrice.getValue();
        }
        if (filter.getMaxPrice() == null) {
            return filter.getMinPrice() <= teacherMinMaxPrice.getKey();
        }
        return filter.getMaxPrice() >= teacherMinMaxPrice.getValue() && filter.getMinPrice() <= teacherMinMaxPrice.getKey();
    }

    private boolean checkFavourites(Long userID) {
        if (filter.getFavouritesOnly() == null || !filter.getFavouritesOnly()) {
            return true;
        }
        Set<Long> studentFavouriteIDs = userService.getStudentFavouriteTeachers(studentID).stream().map(TeacherDTO::getID).collect(Collectors.toSet());
        return studentFavouriteIDs.contains(userID);
    }

    private boolean checkOnPlace(TeacherDTO teacherDTO) {
        if (filter.getOnPlace() == null) {
            return true;
        }
        return teacherDTO.getOnPlace() == filter.getOnPlace();
    }

    private boolean checkNameSurname(TeacherDTO teacherDTO) {
        if (filter.getName() == null && filter.getSurname() == null) {
            return false;
        }
        if (filter.getName() == null) {
            if (filter.getSurname() == null) {
                return true;
            }
            return teacherDTO.getSurname().toLowerCase().contains(filter.getSurname().toLowerCase());
        }
        if (filter.getSurname() == null) {
            return teacherDTO.getName().toLowerCase().contains(filter.getName().toLowerCase());
        }
        return teacherDTO.getName().toLowerCase().contains(filter.getName().toLowerCase()) &&
                teacherDTO.getSurname().toLowerCase().contains(filter.getSurname().toLowerCase());
    }

    private Map.Entry<Integer, Integer> getTeacherMinMaxPrice(TeacherDTO teacherDTO) {
        List<SubjectDTO> teacherSubjects = teacherDTO.getTeacherSubjects();
        if (teacherSubjects.isEmpty()) {
            return Map.entry(Integer.MAX_VALUE, Integer.MIN_VALUE);
        }
        OptionalInt minPrice = teacherSubjects.stream().mapToInt(SubjectDTO::getPrice).min();
        OptionalInt maxPrice = teacherSubjects.stream().mapToInt(SubjectDTO::getPrice).max();
        if (minPrice.isEmpty() || maxPrice.isEmpty()) {
            int minP = minPrice.isEmpty() ? Integer.MIN_VALUE : minPrice.getAsInt();
            int maxP = maxPrice.isEmpty() ? Integer.MAX_VALUE : maxPrice.getAsInt();
            return Map.entry(minP, maxP);
        }
        return Map.entry(minPrice.getAsInt(), maxPrice.getAsInt());
    }
}
