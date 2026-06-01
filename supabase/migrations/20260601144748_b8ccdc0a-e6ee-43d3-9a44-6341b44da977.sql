-- Enforce server-side length limits on public-facing forms
-- to prevent oversized payloads from bypassing client validation.

-- quote_requests
ALTER TABLE public.quote_requests
  ADD CONSTRAINT quote_requests_first_name_len  CHECK (char_length(first_name)  BETWEEN 1 AND 100),
  ADD CONSTRAINT quote_requests_last_name_len   CHECK (char_length(last_name)   BETWEEN 1 AND 100),
  ADD CONSTRAINT quote_requests_company_len     CHECK (company       IS NULL OR char_length(company)       <= 200),
  ADD CONSTRAINT quote_requests_email_len       CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT quote_requests_email_format    CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  ADD CONSTRAINT quote_requests_phone_len       CHECK (phone         IS NULL OR char_length(phone)         <= 30),
  ADD CONSTRAINT quote_requests_industry_len    CHECK (industry      IS NULL OR char_length(industry)      <= 100),
  ADD CONSTRAINT quote_requests_diameters_len   CHECK (diameters     IS NULL OR char_length(diameters)     <= 500),
  ADD CONSTRAINT quote_requests_annual_vol_len  CHECK (annual_volume IS NULL OR char_length(annual_volume) <= 100),
  ADD CONSTRAINT quote_requests_message_len     CHECK (char_length(message) BETWEEN 1 AND 5000);

-- job_applications
ALTER TABLE public.job_applications
  ADD CONSTRAINT job_apps_first_name_len   CHECK (char_length(first_name) BETWEEN 1 AND 100),
  ADD CONSTRAINT job_apps_last_name_len    CHECK (char_length(last_name)  BETWEEN 1 AND 100),
  ADD CONSTRAINT job_apps_middle_name_len  CHECK (middle_name IS NULL OR char_length(middle_name) <= 100),
  ADD CONSTRAINT job_apps_email_len        CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT job_apps_email_format     CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  ADD CONSTRAINT job_apps_phone_len        CHECK (char_length(phone) BETWEEN 1 AND 30),
  ADD CONSTRAINT job_apps_address_len      CHECK (char_length(address) <= 300),
  ADD CONSTRAINT job_apps_city_len         CHECK (char_length(city)    <= 100),
  ADD CONSTRAINT job_apps_state_len        CHECK (char_length(state)   <= 100),
  ADD CONSTRAINT job_apps_zip_len          CHECK (char_length(zip)     <= 20),
  ADD CONSTRAINT job_apps_position_len     CHECK (char_length(position_applied) BETWEEN 1 AND 200),
  ADD CONSTRAINT job_apps_desired_pay_len  CHECK (desired_pay         IS NULL OR char_length(desired_pay)         <= 100),
  ADD CONSTRAINT job_apps_education_len    CHECK (education           IS NULL OR char_length(education)           <= 2000),
  ADD CONSTRAINT job_apps_skills_len       CHECK (skills              IS NULL OR char_length(skills)              <= 2000),
  ADD CONSTRAINT job_apps_how_heard_len    CHECK (how_heard           IS NULL OR char_length(how_heard)           <= 200),
  ADD CONSTRAINT job_apps_felony_expl_len  CHECK (felony_explanation  IS NULL OR char_length(felony_explanation)  <= 2000),
  ADD CONSTRAINT job_apps_signature_len    CHECK (applicant_signature IS NULL OR char_length(applicant_signature) <= 200),
  ADD CONSTRAINT job_apps_resume_url_len   CHECK (resume_url          IS NULL OR char_length(resume_url)          <= 500),
  ADD CONSTRAINT job_apps_emp_history_size CHECK (employment_history  IS NULL OR pg_column_size(employment_history) <= 50000),
  ADD CONSTRAINT job_apps_refs_size        CHECK (applicant_references IS NULL OR pg_column_size(applicant_references) <= 20000);
