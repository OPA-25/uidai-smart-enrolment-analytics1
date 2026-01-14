package com.uidai.diap.controller;



import com.uidai.diap.service.InsightService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/insights")
@CrossOrigin(origins = "*")
public class InsightController {

    private final InsightService service;

    public InsightController(InsightService service) {
        this.service = service;
    }

    @GetMapping
    public Map<String, Object> getInsights() {
        return service.generateInsights();
    }
}
