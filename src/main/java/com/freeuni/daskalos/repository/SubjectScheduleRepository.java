package com.freeuni.daskalos.repository;

import com.freeuni.daskalos.repository.entities.SubjectSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectScheduleRepository extends JpaRepository<SubjectSchedule, Long> {

    List<SubjectSchedule> findSubjectScheduleBySubjectID(Long subjectID);

    void removeAllBySubjectID(Long subjectID);
}
