-- SELECT the database
\c project_contract_testing;

INSERT INTO patient (id, name, lastname) VALUES
('6a5ea0f7-651b-4a48-894b-31abf06fd721', 'John', 'Doe'),
('f3a6ae59-88d7-4851-9ae7-007c91e5801d', 'Jane', 'Smith'),
('1ab04547-e0eb-476c-b15a-09698272623d', 'Alice', 'Johnson'),
('2592aeba-930a-4013-a9aa-e5b409932474', 'Bob', 'Brown'),
('d9647085-cfca-4dce-ba6b-0337c7315de1', 'Carol', 'Davis'),
('c605a68e-791c-4667-b053-92ed1777d3a1', 'David', 'Wilson'),
('38283f6c-7068-426a-95a0-e3f2391fac1d', 'Eve', 'Miller'),
('799b9162-45a0-4093-a2d5-89229e38c7d7', 'Frank', 'Garcia'),
('6d5a605b-2bc0-40f2-adb3-58eafa87677d', 'Grace', 'Martinez'),
('d60b662c-8204-4c09-a659-af90b14c4311', 'Hank', 'Anderson');


INSERT INTO doctor (id, name, lastname) VALUES
('258f9f96-1153-4b93-be77-38646eb251a2', 'Dr. Emily', 'Clark'),
('4bfa5838-0055-49b5-b050-d7bb73cca900', 'Dr. Michael', 'Lewis'),
('f717d6a9-0b25-42d5-b21c-9122b925b4ab', 'Dr. Sarah', 'Walker'),
('c322322c-4da7-41ee-9f99-24e3d24bae73', 'Dr. James', 'Hall'),
('1f197934-f6da-436d-8d04-a7f24161891a', 'Dr. Linda', 'Allen'),
('ffd34d21-2b8c-4447-9dcb-ea89ae86f0ec', 'Dr. Robert', 'Young'),
('ab6c5330-18b8-41cd-8851-597e2baf1806', 'Dr. Patricia', 'King'),
('1f146318-e5df-4152-bc46-726aa4064eb7', 'Dr. Thomas', 'Wright'),
('e3033528-9747-4809-91d2-9a9c46975b70', 'Dr. Barbara', 'Scott'),
('f1ddfe73-823a-456c-b28f-ac16c4058ede', 'Dr. Steven', 'Green');


INSERT INTO license (id, patient_id, doctor_id, diagnosis, start_date, days, status) VALUES
('8cc04d6e-aeaa-4769-80ff-ac9e936245f0','6a5ea0f7-651b-4a48-894b-31abf06fd721','258f9f96-1153-4b93-be77-38646eb251a2', 'Flu', '2023-10-01', 7, 'issued'),
('7043bd9c-bd85-4d69-8ac1-f7617d9da3d6','f3a6ae59-88d7-4851-9ae7-007c91e5801d','4bfa5838-0055-49b5-b050-d7bb73cca900', 'Back Pain', '2023-10-05', 14, 'issued'),
('730771f7-6ea0-43d9-9e5f-4acf031f756d','1ab04547-e0eb-476c-b15a-09698272623d','f717d6a9-0b25-42d5-b21c-9122b925b4ab', 'Migraine', '2023-10-10', 5, 'issued'),
('002bf5d6-4a40-4c4b-9ed4-fbbab5e7a296','2592aeba-930a-4013-a9aa-e5b409932474','c322322c-4da7-41ee-9f99-24e3d24bae73', 'Allergy', '2023-10-15', 10, 'issued'),
('f81632d4-eaaf-4e20-ac5a-905a3befc9cb','d9647085-cfca-4dce-ba6b-0337c7315de1','1f197934-f6da-436d-8d04-a7f24161891a', 'Infection', '2023-10-20', 21, 'issued'),
('b4b64e42-fbf5-4858-88c6-95da07f6c8ef','c605a68e-791c-4667-b053-92ed1777d3a1','ffd34d21-2b8c-4447-9dcb-ea89ae86f0ec', 'Fracture', '2023-10-25', 30, 'issued'),
('2d6fcf3d-018b-4ee7-917a-57bdef280b7d','38283f6c-7068-426a-95a0-e3f2391fac1d','ab6c5330-18b8-41cd-8851-597e2baf1806', 'Surgery Recovery', '2023-11-01', 60, 'issued'),
('a42e5835-944e-49e0-bdec-f0d32a69337c','799b9162-45a0-4093-a2d5-89229e38c7d7','1f146318-e5df-4152-bc46-726aa4064eb7', 'Chronic Pain', '2023-11-05', 90, 'issued'),
('1fc00468-94fc-46a3-9099-b8a64f8dda5e','6d5a605b-2bc0-40f2-adb3-58eafa87677d','e3033528-9747-4809-91d2-9a9c46975b70', 'Depression', '2023-11-10', 120, 'issued'),
('56c76aab-90f5-4a65-a151-22fc317d068a','d60b662c-8204-4c09-a659-af90b14c4311','f1ddfe73-823a-456c-b28f-ac16c4058ede', 'Anxiety', '2023-11-15', 45, 'issued');