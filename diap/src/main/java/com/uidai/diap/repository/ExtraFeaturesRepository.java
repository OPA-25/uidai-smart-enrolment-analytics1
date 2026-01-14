//package com.uidai.diap.repository;
//
//import jakarta.persistence.EntityManager;
//import jakarta.persistence.PersistenceContext;
//import jakarta.transaction.Transactional;
//import org.springframework.stereotype.Repository;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Repository
//public class ExtraFeaturesRepository {
//
//    @PersistenceContext
//    private EntityManager em;
//
//    @Transactional
//    public Map<String, Long> fetchStateWiseEnrolment() {
//
//        String sql =
//                "SELECT e.state, " +
//                "SUM(e.age_0_5 + e.age_5_17 + e.age_18_greater) AS enrolment " +
//                "FROM enrolment_data e " +
//                "GROUP BY e.state";
//
//        List<Object[]> results = em.createNativeQuery(sql).getResultList();
//
//        Map<String, Long> response = new HashMap<>();
//        for (Object[] row : results) {
//            response.put(
//                    String.valueOf(row[0]),
//                    row[1] != null ? ((Number) row[1]).longValue() : 0L
//            );
//        }
//        return response;
//    }
//}
package com.uidai.diap.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ExtraFeaturesRepository {

    @PersistenceContext
    private EntityManager em;

    @Transactional(readOnly = true)  // ✅ READ-ONLY = FASTER
    public Map<String, Long> fetchStateWiseEnrolment() {
        try {
            System.out.println("🔍 Repository: Executing SQL query...");
            
            String sql = """
                SELECT 
                    TRIM(e.state) AS state, 
                    COALESCE(SUM(e.age_0_5 + e.age_5_17 + e.age_18_greater), 0) AS enrolment 
                FROM enrolment_data e 
                WHERE e.state IS NOT NULL AND e.state != ''
                GROUP BY e.state
                ORDER BY enrolment DESC
                """;

            List<Object[]> results = em.createNativeQuery(sql).getResultList();
            
            Map<String, Long> response = new HashMap<>();
            for (Object[] row : results) {
                String state = row[0] != null ? row[0].toString().trim().toUpperCase() : "UNKNOWN";
                Long enrolment = row[1] != null ? ((Number) row[1]).longValue() : 0L;
                response.put(state, enrolment);
            }
            
            System.out.println("✅ Repository SUCCESS: " + response.size() + " states found!");
            System.out.println("📋 States: " + response.keySet());
            return response;
            
        } catch (Exception e) {
            System.err.println("❌ Repository ERROR: " + e.getMessage());
            e.printStackTrace();
            return new HashMap<>();
        }
    }
}
