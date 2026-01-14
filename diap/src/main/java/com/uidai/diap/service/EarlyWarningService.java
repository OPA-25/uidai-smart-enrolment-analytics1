package com.uidai.diap.service;

import com.uidai.diap.dto.AlertResponse;
import com.uidai.diap.entity.CenterDailySummary;
import com.uidai.diap.repository.CenterSummaryRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class EarlyWarningService {

    private final CenterSummaryRepository repository;

    public EarlyWarningService(CenterSummaryRepository repository) {
        this.repository = repository;
    }

    // Generate alerts for ALL stored data (not just yesterday)
    public List<AlertResponse> generateAlerts() {

        List<CenterDailySummary> data = repository.findAll(); // fetch all records
        List<AlertResponse> alerts = new ArrayList<>();

        for (CenterDailySummary c : data) {

            BigDecimal failureRate = c.getFailureRate();
            boolean highWait = c.getAvgWaitTime() > 45;
            boolean highFailure = failureRate != null && failureRate.compareTo(BigDecimal.valueOf(8)) > 0;

            String risk = (highWait || highFailure) ? "HIGH" : "LOW";

            String issue;
            String action;

            if (c.getOperatorsAvailable() < 3) {
                issue = "Operator shortage causing long waiting time";
                action = "Deploy additional operators or extend working hours";
            } else if (highFailure) {
                issue = "High failure rate due to device or network issues";
                action = "Inspect biometric devices and network connectivity";
            } else {
                issue = "Sudden enrolment surge";
                action = "Redirect citizens to nearby low-load centres";
            }

            alerts.add(new AlertResponse(c.getCenterId(), c.getDistrict(), risk, issue, action));
        }

        return alerts;
    }

    // Save a new alert permanently
    public AlertResponse saveAlert(AlertResponse alert) {
        CenterDailySummary c = new CenterDailySummary();
        c.setCenterId(alert.centerId);
        c.setDistrict(alert.district);
        c.setSummaryDate(LocalDate.now());

        // Default values (you can make these dynamic from frontend later)
        c.setAvgWaitTime(50);
        c.setFailureRate(BigDecimal.valueOf(10));
        c.setOperatorsAvailable(2);
        c.setTotalEnrolments(100);

        repository.save(c);

        // Generate risk/issue/action based on saved data
        String risk = "HIGH";
        String issue;
        String action;

        if (c.getOperatorsAvailable() < 3) {
            issue = "Operator shortage causing long waiting time";
            action = "Deploy additional operators or extend working hours";
        } else if (c.getFailureRate().compareTo(BigDecimal.valueOf(8)) > 0) {
            issue = "High failure rate due to device or network issues";
            action = "Inspect biometric devices and network connectivity";
        } else {
            issue = "Sudden enrolment surge";
            action = "Redirect citizens to nearby low-load centres";
        }

        return new AlertResponse(c.getCenterId(), c.getDistrict(), risk, issue, action);
    }

    // Delete an alert permanently
    public void deleteAlert(String centerId) {
        repository.findAll().stream()
                .filter(c -> c.getCenterId().equals(centerId))
                .findFirst()
                .ifPresent(repository::delete);
    }
}
