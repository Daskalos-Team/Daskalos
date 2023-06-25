package com.freeuni.daskalos.repository;

import com.freeuni.daskalos.repository.entities.UserToSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserToSubjectRepository extends JpaRepository<UserToSubject, Long> {

    List<UserToSubject> findAllByUserID(Long userID);

    void deleteAllByUserID(Long userID);

    void deleteBySubjectIDAndUserID(Long userID, Long subjectID);
}
