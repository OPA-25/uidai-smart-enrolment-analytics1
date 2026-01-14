Project Report – UIDAI Hackathon
Project Name - “UIDAI Smart Enrolment
Analytics”


1. Problem Statement

•	The Aadhaar enrolment ecosystem generates large volumes of data related to:
o	New enrolments
o	Update requests
o	Approvals and rejections
o	Processing delays across states and districts
•	Decision-makers lack a unified, real-time analytical system to:
o	Identify regional disparities
o	Detect operational bottlenecks
o	Monitor high-risk enrolment centers
•	The absence of predictive insights and early-warning mechanisms restricts:
o	Proactive governance
o	Efficient resource allocation
•	Project Objective:
o	To bridge this gap by developing a centralized analytics, monitoring, and risk alert platform
o	Built using UIDAI datasets for data-driven decision-making and improved governance



2. Dataset Details

The project uses UIDAI-provided Aadhaar datasets, including:
•	Aadhaar Enrolment Data (Dataset 1)
•	Aadhaar Update Requests Data (Dataset 2)
Key attributes:
•	Year-wise data: 2025
•	State and district-level enrolments
•	Update request counts
•	Approval and rejection status
•	Monthly and yearly trends
The datasets are stored and processed using a structured relational database for efficient querying and analysis.
 

3. Technical Stack

Frontend:
•	React.js
•	Recharts (for charts and visualizations)
•	Leaflet / Map libraries (for interactive district maps)
Backend:
•	Java Spring Boot
•	RESTful APIs for data access, analytics, and alerts
•	Role-based endpoints (Admin / Analyst)
Database:
•	MySQL
•	Optimized tables for large UIDAI datasets
•	Indexed queries for performance handling of big data
Architecture Type:
•	Client–Server Architecture
•	Frontend and Backend deployed independently

 
4. System Architecture

The system follows a three-layer architecture:
1.	Presentation Layer (React): Interactive dashboards, maps, charts, filters, and reports
2.	Application Layer (Spring Boot): Business logic, analytics processing, risk evaluation, and insights generation
3.	Data Layer (MySQL): Storage of enrolment, update, risk alerts, and historical trend data
APIs connect the frontend with backend services to ensure scalable and secure data access.

 
5. Feature Explanations

Landing Dashboard:
•	Total Aadhaar enrolments and update requests
•	Approval vs rejection analysis
•	Monthly and yearly trend visualization
•	Top districts and delay insights
State & District Analysis:
•	State and district selection
•	Comparative enrolment vs update charts
•	High-load area indicators
Map View (2024–2026):
•	Color-coded district-wise enrolment and update visualization
•	Time-based comparison across years
Insights & Recommendations:
•	Auto-generated text insights
•	Suggested corrective actions for UIDAI officials
Risk Alert & Early Warning System:
•	Identification of high-risk Aadhaar centers
•	Active and resolved alert tracking
•	Action recommendations for operators
Export & Reporting:
•	CSV export for raw data
•	PDF reports for management review
 

6.  Screenshots
This section includes screenshots of:

Main dashboard overview
State/district analytics page
Insights and recommendation panel 
Map view visualization
Risk alert management screen

7. Insights & Outcomes

•	Identified districts with high enrolment pressure and update delays
•	Highlighted approval vs rejection imbalances
•	Enabled proactive monitoring of high-risk Aadhaar centers
•	Improved data-driven decision-making for UIDAI authorities
	

8. Conclusion

The Aadhaar Enrolment Analytics and Risk Monitoring Platform demonstrates how UIDAI datasets can be transformed into actionable governance intelligence. By integrating analytics, visualization, predictive insights, and early-warning alerts, the system enhances transparency, efficiency, and citizen service delivery. The scalable Spring Boot–React–MySQL architecture ensures future extensibility for nationwide deployment.

 
🔗 Source Code and Demo Availability

All source code related to this project, including frontend, backend, and database scripts, is maintained in a public GitHub repository for review and evaluation purposes.
A complete working demo video showcasing dashboard features, analytics, map views, and risk alert functionality is available on Telegram.


•	GitHub Repository:
https://github.com/OPA-25/uidai-smart-enrolment-analytics1


•	Demo Video (Telegram):
https://t.me/uidaismartenrolmentanalytics

