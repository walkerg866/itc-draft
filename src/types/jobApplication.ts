// Shapes for the JSONB columns on public.job_applications.
// Kept in sync with the applicant form fields.

export interface EmploymentHistoryEntry {
  company?: string;
  title?: string;
  start_date?: string;
  end_date?: string;
  reason_for_leaving?: string;
}

export interface ApplicantReference {
  name?: string;
  relationship?: string;
  phone?: string;
  email?: string;
}
