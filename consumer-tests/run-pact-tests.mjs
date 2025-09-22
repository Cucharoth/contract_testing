import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MatchersV3, PactV3, SpecificationVersion } from '@pact-foundation/pact';

const { like, string, integer, eachLike } = MatchersV3;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pactsDir = path.resolve(__dirname, '../pacts');

fs.mkdirSync(pactsDir, { recursive: true });

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function runDoctorAppContracts() {
  const baseRequest = {
    patientId: 'PAT-POST-OK',
    doctorId: 'DOC-POST-OK',
    diagnosis: 'Lumbago agudo',
    startDate: '2024-03-01',
    days: 7,
  };

  const doctorProvider = new PactV3({
    consumer: 'Medico App',
    provider: 'Licenses Service',
    dir: pactsDir,
    logLevel: 'warn',
    spec: SpecificationVersion.SPECIFICATION_VERSION_V3,
  });

  doctorProvider.addInteraction({
    states: [{ description: 'issued license days>0 is creatable' }],
    uponReceiving: 'a valid license creation request',
    withRequest: {
      method: 'POST',
      path: '/licenses',
      headers: { 'Content-Type': 'application/json' },
      body: baseRequest,
    },
    willRespondWith: {
      status: 201,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: like({
        folio: string('L-2000'),
        patientId: baseRequest.patientId,
        doctorId: baseRequest.doctorId,
        diagnosis: baseRequest.diagnosis,
        startDate: string('2024-03-01T00:00:00.000Z'),
        days: baseRequest.days,
        status: 'issued',
        createdAt: string('2024-03-01T00:00:00.000Z'),
        updatedAt: string('2024-03-01T00:00:00.000Z'),
      }),
    },
  });

  await doctorProvider.executeTest(async (mockServer) => {
    const response = await fetch(`${mockServer.url}/licenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(baseRequest),
    });

    assert(response.status === 201, `Expected HTTP 201 but received ${response.status}`);
    const payload = await response.json();
    assert(typeof payload.folio === 'string', 'Expected response to contain a folio string');
  });

  doctorProvider.addInteraction({
    states: [{ description: 'issued license days>0 is creatable' }],
    uponReceiving: 'an invalid license creation request with days equal zero',
    withRequest: {
      method: 'POST',
      path: '/licenses',
      headers: { 'Content-Type': 'application/json' },
      body: { ...baseRequest, days: 0 },
    },
    willRespondWith: {
      status: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: { error: 'INVALID_DAYS' },
    },
  });

  await doctorProvider.executeTest(async (mockServer) => {
    const response = await fetch(`${mockServer.url}/licenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...baseRequest, days: 0 }),
    });

    assert(response.status === 400, `Expected HTTP 400 but received ${response.status}`);
    const payload = await response.json();
    assert(payload.error === 'INVALID_DAYS', 'Expected error code INVALID_DAYS');
  });

}

async function runPatientPortalContracts() {
  const patientProvider = new PactV3({
    consumer: 'Portal Paciente',
    provider: 'Licenses Service',
    dir: pactsDir,
    logLevel: 'warn',
    spec: SpecificationVersion.SPECIFICATION_VERSION_V3,
  });

  patientProvider.addInteraction({
    states: [{ description: 'patient 11111111-1 has issued license folio L-1001' }],
    uponReceiving: 'a request for licenses of patient 11111111-1 with issued records',
    withRequest: {
      method: 'GET',
      path: '/licenses',
      query: { patientId: '11111111-1' },
      headers: { Accept: 'application/json' },
    },
    willRespondWith: {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: eachLike({
        folio: string('L-1001'),
        patientId: '11111111-1',
        doctorId: string('DOC-1001'),
        diagnosis: string('Rest and hydration'),
        startDate: string('2024-01-01T00:00:00.000Z'),
        days: integer(7),
        status: 'issued',
        createdAt: string('2024-01-01T00:00:00.000Z'),
        updatedAt: string('2024-01-01T00:00:00.000Z'),
      }),
    },
  });

  await patientProvider.executeTest(async (mockServer) => {
    const response = await fetch(`${mockServer.url}/licenses?patientId=11111111-1`, {
      headers: { Accept: 'application/json' },
    });

    assert(response.status === 200, `Expected HTTP 200 but received ${response.status}`);
    const payload = await response.json();
    assert(Array.isArray(payload), 'Expected an array payload');
    assert(payload.length >= 1, 'Expected at least one license for the patient');
  });

  patientProvider.addInteraction({
    states: [{ description: 'no licenses for patient 22222222-2' }],
    uponReceiving: 'a request for licenses of patient 22222222-2 without records',
    withRequest: {
      method: 'GET',
      path: '/licenses',
      query: { patientId: '22222222-2' },
      headers: { Accept: 'application/json' },
    },
    willRespondWith: {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: [],
    },
  });

  await patientProvider.executeTest(async (mockServer) => {
    const response = await fetch(`${mockServer.url}/licenses?patientId=22222222-2`, {
      headers: { Accept: 'application/json' },
    });

    assert(response.status === 200, `Expected HTTP 200 but received ${response.status}`);
    const payload = await response.json();
    assert(Array.isArray(payload), 'Expected an array payload');
    assert(payload.length === 0, 'Expected no licenses for the patient');
  });

}

async function runInsuranceContracts() {
  const insuranceProvider = new PactV3({
    consumer: 'Validador Aseguradora',
    provider: 'Licenses Service',
    dir: pactsDir,
    logLevel: 'warn',
    spec: SpecificationVersion.SPECIFICATION_VERSION_V3,
  });

  insuranceProvider.addInteraction({
    states: [{ description: 'patient 11111111-1 has issued license folio L-1001' }],
    uponReceiving: 'a request to verify an issued license',
    withRequest: {
      method: 'GET',
      path: '/licenses/L-1001/verify',
      headers: { Accept: 'application/json' },
    },
    willRespondWith: {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: { valid: true },
    },
  });

  await insuranceProvider.executeTest(async (mockServer) => {
    const response = await fetch(`${mockServer.url}/licenses/L-1001/verify`, {
      headers: { Accept: 'application/json' },
    });

    assert(response.status === 200, `Expected HTTP 200 but received ${response.status}`);
    const payload = await response.json();
    assert(payload.valid === true, 'Expected valid flag to be true');
  });

  insuranceProvider.addInteraction({
    states: [{ description: 'license L-404 does not exist' }],
    uponReceiving: 'a request to verify a missing license',
    withRequest: {
      method: 'GET',
      path: '/licenses/L-404/verify',
      headers: { Accept: 'application/json' },
    },
    willRespondWith: {
      status: 404,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: { valid: false },
    },
  });

  await insuranceProvider.executeTest(async (mockServer) => {
    const response = await fetch(`${mockServer.url}/licenses/L-404/verify`, {
      headers: { Accept: 'application/json' },
    });

    assert(response.status === 404, `Expected HTTP 404 but received ${response.status}`);
    const payload = await response.json();
    assert(payload.valid === false, 'Expected valid flag to be false');
  });

}

async function main() {
  await runDoctorAppContracts();
  await runPatientPortalContracts();
  await runInsuranceContracts();
  console.log(`✅ Pact files written to ${pactsDir}`);
}

main().catch((error) => {
  console.error('❌ Pact consumer tests failed');
  console.error(error);
  process.exit(1);
});
