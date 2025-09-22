-- Seed data aligned with assignment provider states & contract expectations.
-- Database selection
\c project_contract_testing;

-- Patients required by the contracts:
-- 11111111-1 should have at least one issued license (folio L-1001)
-- 22222222-2 should have zero licenses
INSERT INTO patient (id, name, lastname) VALUES
('11111111-1', 'Alice', 'Patient'),     -- Required: has issued license
('22222222-2', 'Bob', 'NoLicenses'),    -- Required: no licenses
('33333333-3', 'Carol', 'Davis'),
('44444444-4', 'David', 'Wilson'),
('55555555-5', 'Eve', 'Miller'),
('66666666-6', 'Frank', 'Garcia'),
('77777777-7', 'Grace', 'Martinez'),
('88888888-8', 'Hank', 'Anderson'),
('9999999-9', 'Ivy', 'Lopez'),

-- Minimal doctor to issue licenses in tests / provider states
INSERT INTO doctor (id, name, lastname) VALUES
('DOC-1', 'Dr. Test', 'Physician'),  -- Primary test doctor
('DOC-2', 'Dr. Emily', 'Clark'),
('DOC-3', 'Dr. Michael', 'Lewis'),
('DOC-4', 'Dr. Sarah', 'Walker'),
('DOC-5', 'Dr. James', 'Hall'),
('DOC-6', 'Dr. Linda', 'Allen'),
('DOC-7', 'Dr. Robert', 'Young'),
('DOC-8', 'Dr. Patricia', 'King'),
('DOC-9', 'Dr. Thomas', 'Wright'),
('DOC-10', 'Dr. Barbara', 'Scott');

-- Pre-create the issued license referenced in positive scenarios.
-- Provider state handler may UPSERT/ensure this exists; having it here simplifies local manual testing.
INSERT INTO license (id, patient_id, doctor_id, diagnosis, start_date, days, status) VALUES
('L-1001','11111111-1','DOC-1','General Check','2024-01-01',7,'issued'),  -- Contract positive case
('L-1002','33333333-3','DOC-2','Flu','2024-01-05',5,'issued'),
('L-1003','44444444-4','DOC-3','Back Pain','2024-01-07',14,'issued'),
('L-1004','55555555-5','DOC-4','Migraine','2024-01-09',3,'issued'),
('L-1005','66666666-6','DOC-5','Allergy','2024-01-11',10,'issued'),
('L-1006','77777777-7','DOC-6','Infection','2024-01-13',21,'issued'),
('L-1007','88888888-8','DOC-7','Fracture','2024-01-15',30,'issued'),
('L-1008','9999999-9','DOC-8','Surgery Recovery','2024-01-17',45,'issued'),
('L-1009','33333333-3','DOC-10','Depression','2024-01-21',15,'issued');

-- Note: Intentionally DO NOT create any license for patient 22222222-2 to satisfy the empty list scenario.
-- The nonexistent folio L-404 is not inserted so the negative verification state can rely on its absence.
