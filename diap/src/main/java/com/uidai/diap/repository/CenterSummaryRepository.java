package com.uidai.diap.repository;



import com.uidai.diap.entity.CenterDailySummary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface CenterSummaryRepository extends JpaRepository<CenterDailySummary, Long> {

    List<CenterDailySummary> findBySummaryDate(LocalDate date);
}

