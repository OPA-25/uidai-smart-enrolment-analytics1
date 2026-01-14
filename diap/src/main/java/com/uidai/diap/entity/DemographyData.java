package com.uidai.diap.entity;



import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "demography_data")
@Data
public class DemographyData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String state;
    private String district;

    @Column(name = "demo_age_5_17")
    private Integer demoAge5to17;

    @Column(name = "demo_age_17_plus")
    private Integer demoAge17Plus;

	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
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
	 * @return the demoAge5to17
	 */
	public Integer getDemoAge5to17() {
		return demoAge5to17;
	}

	/**
	 * @param demoAge5to17 the demoAge5to17 to set
	 */
	public void setDemoAge5to17(Integer demoAge5to17) {
		this.demoAge5to17 = demoAge5to17;
	}

	/**
	 * @return the demoAge17Plus
	 */
	public Integer getDemoAge17Plus() {
		return demoAge17Plus;
	}

	/**
	 * @param demoAge17Plus the demoAge17Plus to set
	 */
	public void setDemoAge17Plus(Integer demoAge17Plus) {
		this.demoAge17Plus = demoAge17Plus;
	}
    
    
}

