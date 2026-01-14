//package com.uidai.diap.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.web.bind.annotation.*;
//import java.util.*;
//
//@RestController
//@CrossOrigin(origins = {"http://localhost:3000"})
//public class DashboardController {
//    @Autowired private JdbcTemplate jdbc;
//
//    // Overview APIs
//    @GetMapping("/api/dashboard/totals")
//    public Map<String, Object> getTotals() {
//        Integer totalEnrol = jdbc.queryForObject("SELECT COALESCE(SUM(age_0_5 + age_5_17 + age_18_greater), 0) FROM enrolment_data", Integer.class);
//        Integer totalDemo = jdbc.queryForObject("SELECT COALESCE(SUM(demo_age_5_17 + demo_age_17_plus), 0) FROM demography_data", Integer.class);
//        Integer totalPop = totalEnrol + totalDemo;
//        Integer approved = (int)(totalPop * 0.85);
//        Integer rejected = totalPop - approved;
//        Double approveRate = totalPop > 0 ? approved * 100.0 / totalPop : 0;
//        return Map.of("totalEnrolments", totalEnrol, "totalUpdates", totalDemo, "approved", approved, "rejected", rejected, "approveRate", approveRate);
//    }
//
//    @GetMapping("/api/dashboard/trends")
//    public List<Map<String, Object>> getTrends() {
//        return jdbc.queryForList("SELECT date as period, SUM(age_0_5 + age_5_17 + age_18_greater) as enrolments FROM enrolment_data WHERE date IS NOT NULL GROUP BY date ORDER BY date LIMIT 12");
//    }
//    
//    @GetMapping("/api/dashboard/states")
//    public List<Map<String, Object>> getDashboardStates() {
//        return jdbc.queryForList(
//            "SELECT state, COALESCE(SUM(age_0_5 + age_5_17 + age_18_greater), 0) as enrolments " +
//            "FROM enrolment_data WHERE state IS NOT NULL " +
//            "GROUP BY state ORDER BY enrolments DESC LIMIT 15"
//        );
//    }
//
//
//    @GetMapping("/api/dashboard/top-districts")
//    public List<Map<String, Object>> getTopDistricts() {
//        return jdbc.queryForList("SELECT district, SUM(age_0_5 + age_5_17 + age_18_greater) as volume, ROUND(AVG(age_0_5 * 100.0 / NULLIF(age_0_5 + age_5_17 + age_18_greater, 0)), 1) as low_enrol_rate FROM enrolment_data WHERE (age_0_5 + age_5_17 + age_18_greater) > 0 GROUP BY district ORDER BY volume DESC LIMIT 5");
//    }
//
//    // State/District Analysis APIs (NEW)
//    @GetMapping("/api/states")
//    public List<Map<String, Object>> getStatesList() {
//        return jdbc.queryForList("SELECT DISTINCT state FROM enrolment_data WHERE state IS NOT NULL ORDER BY state");
//    }
//
//    @GetMapping("/api/districts/{state}")
//    public List<Map<String, Object>> getDistricts(@PathVariable String state) {
//        return jdbc.queryForList("SELECT DISTINCT district FROM enrolment_data WHERE state = ? ORDER BY district", state);
//    }
//
//    @GetMapping("/api/analysis/state/{state}")
//    public Map<String, Object> getStateAnalysis(@PathVariable String state) {
//        Map<String, Object> data = new HashMap<>();
//        data.put("state", state);
//        data.put("totalEnrol", jdbc.queryForObject("SELECT COALESCE(SUM(age_0_5 + age_5_17 + age_18_greater), 0) FROM enrolment_data WHERE state = ?", Integer.class, state));
//        data.put("totalDemo", jdbc.queryForObject("SELECT COALESCE(SUM(demo_age_5_17 + demo_age_17_plus), 0) FROM demography_data WHERE state = ?", Integer.class, state));
//        data.put("districts", jdbc.queryForList("SELECT district, SUM(e.age_0_5 + e.age_5_17 + e.age_18_greater) as enrol, COALESCE(SUM(d.demo_age_5_17 + d.demo_age_17_plus), 0) as updates FROM enrolment_data e LEFT JOIN demography_data d ON e.district = d.district AND e.state = d.state WHERE e.state = ? GROUP BY district ORDER BY enrol DESC LIMIT 20", state));
//        return data;
//    }
//
//    @GetMapping("/api/analysis/district/{district}")
//    public Map<String, Object> getDistrictAnalysis(@PathVariable String district) {
//        Integer enrol = jdbc.queryForObject("SELECT COALESCE(SUM(age_0_5 + age_5_17 + age_18_greater), 0) FROM enrolment_data WHERE district = ?", Integer.class, district);
//        Integer demo = jdbc.queryForObject("SELECT COALESCE(SUM(demo_age_5_17 + demo_age_17_plus), 0) FROM demography_data WHERE district = ?", Integer.class, district);
//        Double loadScore = (enrol + demo) / 1000000.0;
//        String heatLevel = loadScore > 2 ? "🔴 High" : loadScore > 1 ? "🟡 Medium" : "🟢 Low";
//        return Map.of("district", district, "enrolments", enrol, "updates", demo, "loadScore", loadScore, "heatLevel", heatLevel,
//            "monthly", jdbc.queryForList("SELECT date, SUM(age_0_5 + age_5_17 + age_18_greater) enrol FROM enrolment_data WHERE district=? GROUP BY date ORDER BY date LIMIT 12", district));
//    }
//}


package com.uidai.diap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class DashboardController {

    @Autowired private JdbcTemplate jdbc;

    // Overview APIs
    @GetMapping("/api/dashboard/totals")
    public Map<String, Object> getTotals() {
        Integer totalEnrol = jdbc.queryForObject(
            "SELECT COALESCE(SUM(age_0_5 + age_5_17 + age_18_greater), 0) FROM enrolment_data", 
            Integer.class
        );
        Integer totalDemo = jdbc.queryForObject(
            "SELECT COALESCE(SUM(demo_age_5_17 + demo_age_17_plus), 0) FROM demography_data", 
            Integer.class
        );
        Integer totalPop = totalEnrol + totalDemo;
        Integer approved = (int)(totalPop * 0.85);
        Integer rejected = totalPop - approved;
        Double approveRate = totalPop > 0 ? approved * 100.0 / totalPop : 0.0;

        return Map.of(
            "totalEnrolments", totalEnrol, 
            "totalUpdates", totalDemo, 
            "approved", approved, 
            "rejected", rejected, 
            "approveRate", approveRate
        );
    }

    @GetMapping("/api/dashboard/trends")
    public List<Map<String, Object>> getTrends() {
        return jdbc.queryForList(
            "SELECT date as period, SUM(age_0_5 + age_5_17 + age_18_greater) as enrolments " +
            "FROM enrolment_data WHERE date IS NOT NULL GROUP BY date ORDER BY date LIMIT 12"
        );
    }

    @GetMapping("/api/dashboard/states")
    public List<Map<String, Object>> getDashboardStates() {
        return jdbc.queryForList(
            "SELECT state, COALESCE(SUM(age_0_5 + age_5_17 + age_18_greater), 0) as enrolments " +
            "FROM enrolment_data WHERE state IS NOT NULL " +
            "GROUP BY state ORDER BY enrolments DESC LIMIT 15"
        );
    }

    @GetMapping("/api/dashboard/top-districts")
    public List<Map<String, Object>> getTopDistricts() {
        return jdbc.queryForList(
            "SELECT district, SUM(age_0_5 + age_5_17 + age_18_greater) as volume, " +
            "ROUND(AVG(age_0_5 * 100.0 / NULLIF(age_0_5 + age_5_17 + age_18_greater, 0)), 1) as rejectrate " +
            "FROM enrolment_data WHERE (age_0_5 + age_5_17 + age_18_greater) > 0 " +
            "GROUP BY district ORDER BY volume DESC LIMIT 5"
        );
    }

    // State/District Analysis APIs (FIXED WITH SAFETY CHECKS)
    @GetMapping("/api/states")
    public List<Map<String, Object>> getStatesList() {
        return jdbc.queryForList("SELECT DISTINCT state FROM enrolment_data WHERE state IS NOT NULL ORDER BY state");
    }

    @GetMapping("/api/districts/{state}")
    public List<Map<String, Object>> getDistricts(@PathVariable String state) {
        if (state == null || state.trim().isEmpty()) {
            return List.of();  // SAFE: Empty list instead of error
        }
        return jdbc.queryForList(
            "SELECT DISTINCT district FROM enrolment_data WHERE state = ? ORDER BY district", 
            state.trim()
        );
    }

    @GetMapping("/api/analysis/state/{state}")
    public Map<String, Object> getStateAnalysis(@PathVariable String state) {
        if (state == null || state.trim().isEmpty()) {
            return Map.of("state", "", "totalEnrol", 0, "totalDemo", 0, "districts", List.of());  // SAFE
        }
        
        Map<String, Object> data = new HashMap<>();
        data.put("state", state.trim());
        data.put("totalEnrol", jdbc.queryForObject(
            "SELECT COALESCE(SUM(age_0_5 + age_5_17 + age_18_greater), 0) FROM enrolment_data WHERE state = ?", 
            Integer.class, state.trim()
        ));
        data.put("totalDemo", jdbc.queryForObject(
            "SELECT COALESCE(SUM(demo_age_5_17 + demo_age_17_plus), 0) FROM demography_data WHERE state = ?", 
            Integer.class, state.trim()
        ));
        data.put("districts", jdbc.queryForList(
            "SELECT district, " +
            "COALESCE(SUM(e.age_0_5 + e.age_5_17 + e.age_18_greater), 0) as enrol, " +
            "COALESCE(SUM(d.demo_age_5_17 + d.demo_age_17_plus), 0) as updates " +
            "FROM enrolment_data e LEFT JOIN demography_data d ON e.district = d.district AND e.state = d.state " +
            "WHERE e.state = ? GROUP BY district ORDER BY enrol DESC LIMIT 20", 
            state.trim()
        ));
        return data;
    }

    @GetMapping("/api/analysis/district/{district}")
    public Map<String, Object> getDistrictAnalysis(@PathVariable String district) {
        if (district == null || district.trim().isEmpty()) {
            return Map.of("district", "", "enrolments", 0, "updates", 0, "loadScore", 0.0, "heatLevel", "🟢 Low");
        }
        
        Integer enrol = jdbc.queryForObject(
            "SELECT COALESCE(SUM(age_0_5 + age_5_17 + age_18_greater), 0) FROM enrolment_data WHERE district = ?", 
            Integer.class, district.trim()
        );
        Integer demo = jdbc.queryForObject(
            "SELECT COALESCE(SUM(demo_age_5_17 + demo_age_17_plus), 0) FROM demography_data WHERE district = ?", 
            Integer.class, district.trim()
        );
        Double loadScore = (enrol + demo) / 1000000.0;
        String heatLevel = loadScore > 2 ? "🔴 High" : loadScore > 1 ? "🟡 Medium" : "🟢 Low";

        return Map.of(
            "district", district.trim(),
            "enrolments", enrol,
            "updates", demo,
            "loadScore", loadScore,
            "heatLevel", heatLevel,
            "monthly", jdbc.queryForList(
                "SELECT date, SUM(age_0_5 + age_5_17 + age_18_greater) as enrol " +
                "FROM enrolment_data WHERE district = ? GROUP BY date ORDER BY date LIMIT 12", 
                district.trim()
            )
        );
    }
}
