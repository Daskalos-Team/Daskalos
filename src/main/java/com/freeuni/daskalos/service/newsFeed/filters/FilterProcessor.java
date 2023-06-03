package com.freeuni.daskalos.service.newsFeed.filters;

import com.freeuni.daskalos.repository.entities.User;

public interface FilterProcessor {

    boolean checkUser(Long userID);

}
