package com.uidai.diap.entity;



import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "enrolment_data")
@Data
public class EnrolmentData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String state;
    private String district;

    @Column(name = "age_0_5")
    private Integer age0to5;

    @Column(name = "age_5_17")
    private Integer age5to17;

    @Column(name = "age_18_greater")
    private Integer age18Greater;

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
	 * @return the age0to5
	 */
	public Integer getAge0to5() {
		return age0to5;
	}

	/**
	 * @param age0to5 the age0to5 to set
	 */
	public void setAge0to5(Integer age0to5) {
		this.age0to5 = age0to5;
	}

	/**
	 * @return the age5to17
	 */
	public Integer getAge5to17() {
		return age5to17;
	}

	/**
	 * @param age5to17 the age5to17 to set
	 */
	public void setAge5to17(Integer age5to17) {
		this.age5to17 = age5to17;
	}

	/**
	 * @return the age18Greater
	 */
	public Integer getAge18Greater() {
		return age18Greater;
	}

	/**
	 * @param age18Greater the age18Greater to set
	 */
	public void setAge18Greater(Integer age18Greater) {
		this.age18Greater = age18Greater;
	}
    
    
}

