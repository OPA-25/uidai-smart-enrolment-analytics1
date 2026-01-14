package com.uidai.diap.controller;

import com.uidai.diap.dto.AlertResponse;
import com.uidai.diap.service.EarlyWarningService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "*")
public class EarlyWarningController {

    private final EarlyWarningService service;

    public EarlyWarningController(EarlyWarningService service) {
        this.service = service;
    }

    @GetMapping("/early-warning")
    public List<AlertResponse> getAlerts() {
        return service.generateAlerts();
    }

    // POST endpoint to add a new alert
    @PostMapping("/early-warning")
    public AlertResponse addAlert(@RequestBody AlertResponse alert) {
        return service.saveAlert(alert);
    }
    @DeleteMapping("/early-warning/{centerId}")
    public void deleteAlert(@PathVariable String centerId) {
        service.deleteAlert(centerId);
    }

}
