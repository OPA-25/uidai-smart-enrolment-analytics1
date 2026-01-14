package com.uidai.diap.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.hibernate.query.NativeQuery;
import org.hibernate.transform.AliasToEntityMapResultTransformer;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ExportRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings("deprecation")
    public List<Map<String, Object>> fetchExportData() {

        String sql = """
            SELECT 
                e.state AS state,
                e.district AS district,

                (COALESCE(e.age_0_5,0) 
                + COALESCE(e.age_5_17,0) 
                + COALESCE(e.age_18_greater,0)) AS enrolment,

                (COALESCE(d.demo_age_5_17,0) 
                + COALESCE(d.demo_age_17_plus,0)) AS updates

            FROM enrolment_data e
            INNER JOIN demography_data d
                ON LOWER(e.state) = LOWER(d.state)
               AND LOWER(e.district) = LOWER(d.district)

            LIMIT 5000
        """;

        return entityManager
                .createNativeQuery(sql)
                .unwrap(NativeQuery.class)
                .setResultTransformer(AliasToEntityMapResultTransformer.INSTANCE)
                .getResultList();
    }
}
