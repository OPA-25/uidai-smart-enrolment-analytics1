package com.uidai.diap.controller;

import com.uidai.diap.service.ExtraFeaturesService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/extra")
@CrossOrigin(origins = "*")
public class ExtraFeaturesController {

    private final ExtraFeaturesService service;

    public ExtraFeaturesController(ExtraFeaturesService service) {
        this.service = service;
    }

    @GetMapping("/state-enrolment")
    public Map<String, Long> getStateWiseEnrolment() {
        return service.getStateWiseEnrolment();
    }
}
