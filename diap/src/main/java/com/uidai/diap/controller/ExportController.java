//package com.uidai.diap.controller;
//
//
//
//import com.uidai.diap.service.ExportService;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/export")
//@CrossOrigin(origins = "*")
//public class ExportController {
//
//    private final ExportService service;
//
//    public ExportController(ExportService service) {
//        this.service = service;
//    }
//
//    /* ---------- CSV DOWNLOAD ---------- */
//    @GetMapping("/csv")
//    public ResponseEntity<byte[]> downloadCSV() {
//        String csv = service.generateCSV();
//
//        return ResponseEntity.ok()
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=uidai_data.csv")
//                .contentType(MediaType.TEXT_PLAIN)
//                .body(csv.getBytes());
//    }
//
//    /* ---------- PDF DOWNLOAD ---------- */
//    @PostMapping("/pdf")
//    public ResponseEntity<byte[]> downloadPDF(@RequestBody List<String> insights) throws Exception {
//
//        byte[] pdf = service.generatePDF(insights);
//
//        return ResponseEntity.ok()
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=uidai_insights_report.pdf")
//                .contentType(MediaType.APPLICATION_PDF)
//                .body(pdf);
//    }
//}
//

package com.uidai.diap.controller;

import com.uidai.diap.service.ExportService;
import com.uidai.diap.service.InsightService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/export")
@CrossOrigin(origins = "*")
public class ExportController {

    private final ExportService exportService;
    private final InsightService insightService;

    public ExportController(ExportService exportService,
                            InsightService insightService) {
        this.exportService = exportService;
        this.insightService = insightService;
    }

    /* ---------- CSV ---------- */
    @GetMapping("/csv")
    public ResponseEntity<String> downloadCSV() {

        String csv = exportService.generateCSV();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=uidai_export.csv")
                .contentType(MediaType.TEXT_PLAIN)
                .body(csv);
    }

    /* ---------- PDF (FIXED) ---------- */
    @GetMapping("/pdf")
    public ResponseEntity<byte[]> downloadPDF() throws Exception {

        // Generate insights internally (NO request body)
        List<String> insights =
                (List<String>) insightService.generateInsights().get("insights");

        byte[] pdf = exportService.generatePDF(insights);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=uidai_insights_report.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}
