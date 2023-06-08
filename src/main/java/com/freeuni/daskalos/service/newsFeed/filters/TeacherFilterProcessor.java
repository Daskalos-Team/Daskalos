package com.freeuni.daskalos.service.newsFeed.filters;

import com.freeuni.daskalos.dto.FilterDTO;
import com.freeuni.daskalos.dto.SubjectDTO;
import com.freeuni.daskalos.dto.TeacherDTO;
import com.freeuni.daskalos.service.teacher.UserService;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

// TODO add filtering by subject days
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
        return checkSubjects(userID) && checkPriceRange(userID) && checkFavourites(userID) && checkOnPlace(userID);
    }

    private boolean checkSubjects(Long userID) {
        Set<String> userSubjects = userService.getTeacherDTO(userID).getTeacherSubjects().stream().map(SubjectDTO::getName).collect(Collectors.toSet());
        List<String> chosenSubjects = filter.getSubjectsOnly();
        for (String subject : chosenSubjects) {
            if (!userSubjects.contains(subject)) {
                return false;
            }
        }
        return true;
    }

    private boolean checkPriceRange(Long userID) {
        Map.Entry<Integer, Integer> teacherMinMaxPrice = userService.getTeacherMinMaxPrice(userID);
        return filter.getMaxPrice() >= teacherMinMaxPrice.getValue() || filter.getMinPrice() <= teacherMinMaxPrice.getKey();
    }

    private boolean checkFavourites(Long userID) {
        Set<Long> studentFavouriteIDs = userService.getStudentFavouriteTeachers(studentID).stream().map(TeacherDTO::getID).collect(Collectors.toSet());
        return studentFavouriteIDs.contains(userID);
    }

    private boolean checkOnPlace(Long userID) {
        TeacherDTO teacher = userService.getTeacherDTO(userID);
        return teacher.getIsOnPlace() == filter.getOnPlace();
    }
}
