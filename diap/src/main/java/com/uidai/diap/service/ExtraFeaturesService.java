//package com.uidai.diap.service;
//
//import com.uidai.diap.repository.ExtraFeaturesRepository;
//import jakarta.transaction.Transactional;
//import org.springframework.stereotype.Service;
//
//import java.util.Map;
//
//@Service
//public class ExtraFeaturesService {
//
//    private final ExtraFeaturesRepository repository;
//
//    public ExtraFeaturesService(ExtraFeaturesRepository repository) {
//        this.repository = repository;
//    }
//
//    @Transactional
//    public Map<String, Long> getStateWiseEnrolment() {
//        return repository.fetchStateWiseEnrolment();
//    }
//}


package com.uidai.diap.service;

import com.uidai.diap.repository.ExtraFeaturesRepository;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ExtraFeaturesService {
    
    private final ExtraFeaturesRepository repository;

    public ExtraFeaturesService(ExtraFeaturesRepository repository) {
        this.repository = repository;
    }

    public Map<String, Long> getStateWiseEnrolment() {
        System.out.println("🔍 Service: Calling repository...");
        Map<String, Long> result = repository.fetchStateWiseEnrolment();
        System.out.println("✅ Service returning: " + result.size() + " states");
        return result;
    }
}
