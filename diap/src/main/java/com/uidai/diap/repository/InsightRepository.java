package com.uidai.diap.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.uidai.diap.entity.EnrolmentData;

import java.util.List;
import java.util.Map;

public interface InsightRepository extends CrudRepository<EnrolmentData, Integer> {

    // Enrolment summary (FAST)
    @Query(value = """
        SELECT 
            district AS district,
            SUM(IFNULL(age_5_17,0) + IFNULL(age_18_greater,0)) AS enrolment
        FROM enrolment_data
        GROUP BY district
        LIMIT 100
        """, nativeQuery = true)
    List<Map<String, Object>> fetchEnrolmentSummary();

    // Demography summary (FAST)
    @Query(value = """
        SELECT 
            district AS district,
            SUM(IFNULL(demo_age_5_17,0) + IFNULL(demo_age_17_plus,0)) AS updates
        FROM demography_data
        GROUP BY district
        LIMIT 100
        """, nativeQuery = true)
    List<Map<String, Object>> fetchUpdateSummary();
}
