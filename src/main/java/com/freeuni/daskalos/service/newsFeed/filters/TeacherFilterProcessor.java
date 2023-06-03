package com.freeuni.daskalos.service.newsFeed.filters;

import com.freeuni.daskalos.dto.FilterDTO;
import com.freeuni.daskalos.dto.SubjectDTO;
import com.freeuni.daskalos.dto.TeacherDTO;
import com.freeuni.daskalos.service.teacher.UserService;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

// filters buy subjects, price range, favourites only, on place
public class TeacherFilterProcessor implements FilterProcessor {

    private UserService userService;
    private FilterDTO filter;

    private Long studentID;

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
        for(String subject : chosenSubjects) {
            if(userSubjects.contains(subject)) {
                return true;
            }
        }
        return false;
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
