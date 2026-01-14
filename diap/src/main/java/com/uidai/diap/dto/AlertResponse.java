package com.uidai.diap.dto;



public class AlertResponse {

    public String centerId;
    public String district;
    public String riskLevel;
    public String issue;
    public String recommendation;

    public AlertResponse(String centerId, String district, String riskLevel,
                         String issue, String recommendation) {
        this.centerId = centerId;
        this.district = district;
        this.riskLevel = riskLevel;
        this.issue = issue;
        this.recommendation = recommendation;
    }
}

