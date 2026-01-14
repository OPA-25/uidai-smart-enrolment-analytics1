package com.uidai.diap.service;

import com.uidai.diap.repository.ExportRepository;
import com.lowagie.text.Document;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;

@Service
public class ExportService {

    private final ExportRepository repository;

    public ExportService(ExportRepository repository) {
        this.repository = repository;
    }

    /* ---------- CSV EXPORT ---------- */
    public String generateCSV() {

        List<Map<String, Object>> data = repository.fetchExportData();

        StringBuilder csv = new StringBuilder();
        csv.append("State,District,Enrolment,Update_Delays\n");

        for (Map<String, Object> row : data) {
            csv.append(row.get("state")).append(",")
               .append(row.get("district")).append(",")
               .append(row.get("enrolment")).append(",")
               .append(row.get("updates")).append("\n");
        }

        return csv.toString();
    }

    /* ---------- PDF EXPORT ---------- */
    public byte[] generatePDF(List<String> insights) throws Exception {

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, out);

        document.open();

        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
        Font bodyFont = FontFactory.getFont(FontFactory.HELVETICA, 12);

        document.add(new Paragraph("UIDAI – Insights Summary Report", titleFont));
        document.add(new Paragraph(" "));
        document.add(new Paragraph("Auto-generated governance insights:", bodyFont));
        document.add(new Paragraph(" "));

        for (String insight : insights) {
            document.add(new Paragraph("• " + insight, bodyFont));
        }

        document.close();
        return out.toByteArray();
    }
}
