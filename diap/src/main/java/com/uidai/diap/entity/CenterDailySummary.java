package com.uidai.diap.entity;




import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "center_daily_summary")
public class CenterDailySummary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate summaryDate;
    private String centerId;
    private String state;
    private String district;
    private int totalEnrolments;
    private int avgWaitTime;

    @Column(precision = 5, scale = 2)
    private BigDecimal failureRate;

    private int operatorsAvailable;

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the summaryDate
	 */
	public LocalDate getSummaryDate() {
		return summaryDate;
	}

	/**
	 * @param summaryDate the summaryDate to set
	 */
	public void setSummaryDate(LocalDate summaryDate) {
		this.summaryDate = summaryDate;
	}

	/**
	 * @return the centerId
	 */
	public String getCenterId() {
		return centerId;
	}

	/**
	 * @param centerId the centerId to set
	 */
	public void setCenterId(String centerId) {
		this.centerId = centerId;
	}

	/**
	 * @return the state
	 */
	public String getState() {
		return state;
	}

	/**
	 * @param state the state to set
	 */
	public void setState(String state) {
		this.state = state;
	}

	/**
	 * @return the district
	 */
	public String getDistrict() {
		return district;
	}

	/**
	 * @param district the district to set
	 */
	public void setDistrict(String district) {
		this.district = district;
	}

	/**
	 * @return the totalEnrolments
	 */
	public int getTotalEnrolments() {
		return totalEnrolments;
	}

	/**
	 * @param totalEnrolments the totalEnrolments to set
	 */
	public void setTotalEnrolments(int totalEnrolments) {
		this.totalEnrolments = totalEnrolments;
	}

	/**
	 * @return the avgWaitTime
	 */
	public int getAvgWaitTime() {
		return avgWaitTime;
	}

	/**
	 * @param avgWaitTime the avgWaitTime to set
	 */
	public void setAvgWaitTime(int avgWaitTime) {
		this.avgWaitTime = avgWaitTime;
	}

	/**
	 * @return the failureRate
	 */
	public BigDecimal getFailureRate() {
		return failureRate;
	}

	/**
	 * @param failureRate the failureRate to set
	 */
	public void setFailureRate(BigDecimal failureRate) {
		this.failureRate = failureRate;
	}

	/**
	 * @return the operatorsAvailable
	 */
	public int getOperatorsAvailable() {
		return operatorsAvailable;
	}

	/**
	 * @param operatorsAvailable the operatorsAvailable to set
	 */
	public void setOperatorsAvailable(int operatorsAvailable) {
		this.operatorsAvailable = operatorsAvailable;
	}

    
}
