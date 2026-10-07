# Security Specification: Dr. Puneet Kumar Clinic

## Data Invariants
1. **Patient Data Isolation**: Appointments and Contact Leads contain sensitive patient contact info and medical concerns (PII). Read access, updates, and deletions are strictly restricted to verified administrators (`sagarkiisha9@gmail.com`).
2. **Patient Booking Integrity**: Public appointment requests and contact inquiries can be submitted by any patient/visitor, but the payload must be strictly validated against maximum lengths, required fields, and initial status must be `'New'`.
3. **Public Content Protection**: Dynamic clinic site content (`/siteContent/{section}`) and media assets (`/mediaAssets/{mediaId}`) are publicly readable by patients visiting the website, but updates and deletions are strictly restricted to verified clinic administrators.
4. **ID Hardening**: All document keys must conform to standard safe identifier patterns (`^[a-zA-Z0-9_\-]+$`) up to 128 characters, protecting against path poisoning and injection.

## The Dirty Dozen Payloads (Rejection Matrix)
1. **Unauthenticated Read on Appointments**: An anonymous or non-admin user attempting to list or read `/appointments` documents -> `PERMISSION_DENIED`
2. **Unauthenticated Read on Contact Leads**: An anonymous or non-admin user attempting to read private phone numbers or contact messages -> `PERMISSION_DENIED`
3. **Appointment Status Escalation**: A public user creating an appointment with `status: "Confirmed"` directly -> `PERMISSION_DENIED` (must start with status: "New")
4. **Ghost Field / Shadow Field Injection**: Submitting an appointment with arbitrary extra fields or oversized strings -> `PERMISSION_DENIED`
5. **Oversized String Attack (Denial of Wallet)**: Submitting a 50KB string in `patientName` or `concern` -> `PERMISSION_DENIED` (capped at max bounds)
6. **Path Injection / Poisoning**: Submitting with an invalid document ID (e.g. containing slashes or control characters) -> `PERMISSION_DENIED`
7. **Unauthorized Content Modification**: A non-admin user attempting to overwrite doctor profile or clinic fees -> `PERMISSION_DENIED`
8. **Email Spoofing Without Verification**: A user with email `sagarkiisha9@gmail.com` but `email_verified: false` attempting admin write -> `PERMISSION_DENIED`
9. **Unauthorized Media Deletion**: An unauthenticated user attempting to delete clinic media assets -> `PERMISSION_DENIED`
10. **Appointment Deletion by Visitor**: A public visitor trying to delete an appointment -> `PERMISSION_DENIED`
11. **Contact Lead Modification by Visitor**: A public visitor trying to update existing lead notes -> `PERMISSION_DENIED`
12. **Blanket Collection Write**: An attacker writing to arbitrary unmapped paths like `/config` or `/users` -> `PERMISSION_DENIED` (default-deny catch-all)
