package com.freeuni.daskalos.service.session;

import com.freeuni.daskalos.utils.UserType;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
public class SessionService {

    private static HttpSession getSession() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return attributes.getRequest().getSession(true);
    }

    public static void setUserId(Long userId) {
        getSession().setAttribute("userId", userId);
    }

    public static Long getUserId() {
        return (Long) getSession().getAttribute("userId");
    }

    public static void setUserType(UserType userType) {
        getSession().setAttribute("userType", userType);
    }

    public static UserType getUserType() {
        return (UserType) getSession().getAttribute("userType");
    }

}