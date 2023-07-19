package com.freeuni.daskalos.service.session;

import com.freeuni.daskalos.utils.UserType;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
public class SessionService {

    private static HttpSession getSession() {
        try {
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
            return attributes.getRequest().getSession(true);
        } catch (Exception e) {
            return null;
        }
    }

    public static void setUserId(Long userId) {
        if (getSession() == null) return;
        getSession().setAttribute("userId", userId);
    }

    public static Long getUserId() {
        if (getSession() == null) return null;
        return (Long) getSession().getAttribute("userId");
    }

    public static void setUserType(UserType userType) {
        if (getSession() == null) return;
        getSession().setAttribute("userType", userType);
    }

    public static UserType getUserType() {
        if (getSession() == null) return null;
        return (UserType) getSession().getAttribute("userType");
    }

    public static void setUserName(String name) {
        if (getSession() == null) return;
        getSession().setAttribute("name", name);
    }

    public static String getUserName() {
        if (getSession() == null) return null;
        return (String) getSession().getAttribute("name");
    }

    public static void setUserSurname(String surname) {
        if (getSession() == null) return;
        getSession().setAttribute("surname", surname);
    }

    public static String getUserSurname() {
        if (getSession() == null) return null;
        return (String) getSession().getAttribute("surname");
    }

    public static void setUserProfileImage(String profileImage) {
        if (getSession() == null) return;
        getSession().setAttribute("profileImage", profileImage);
    }

    public static String getUserProfileImage() {
        if (getSession() == null) return null;
        return (String) getSession().getAttribute("profileImage");
    }
}
