package com.uidai.diap.service;

import com.uidai.diap.repository.InsightRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class InsightService {

    private final InsightRepository repository;

    // Simple in-memory cache
    private Map<String, Object> cachedResult;
    private long lastFetchTime = 0;

    public InsightService(InsightRepository repository) {
        this.repository = repository;
    }

    public Map<String, Object> generateInsights() {

        long now = System.currentTimeMillis();

        // Return cached result for 10 minutes
        if (cachedResult != null && (now - lastFetchTime) < 10 * 60 * 1000) {
            return cachedResult;
        }

        List<Map<String, Object>> enrolmentData = repository.fetchEnrolmentSummary();
        List<Map<String, Object>> updateData = repository.fetchUpdateSummary();

        Map<String, Double> updateMap = new HashMap<>();
        for (Map<String, Object> row : updateData) {
            updateMap.put(
                    row.get("district").toString(),
                    ((Number) row.get("updates")).doubleValue()
            );
        }

        List<Map<String, Object>> chartData = new ArrayList<>();
        List<String> insights = new ArrayList<>();

        double avgUpdates = updateMap.values().stream()
                .mapToDouble(Double::doubleValue)
                .average()
                .orElse(0);

        for (Map<String, Object> row : enrolmentData) {
            String district = row.get("district").toString();
            double enrolment = ((Number) row.get("enrolment")).doubleValue();
            double updates = updateMap.getOrDefault(district, 0.0);

            chartData.add(Map.of(
                    "district", district,
                    "enrolment", enrolment,
                    "updates", updates
            ));

            if (updates > avgUpdates * 1.35) {
                insights.add("📌 " + district +
                        " has higher update delays than national average. Operator reallocation suggested.");
            }

            if (enrolment > updates * 1.5) {
                insights.add("📌 High enrolment load in " + district +
                        ". Additional operator capacity recommended.");
            }
        }

        cachedResult = Map.of(
                "insights", insights,
                "chartData", chartData
        );

        lastFetchTime = now;
        return cachedResult;
    }
}
