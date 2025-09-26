const path = require('node:path');
const fs = require('node:fs');
const http = require('node:http');
const https = require('node:https');
const { Verifier } = require('@pact-foundation/pact');

function postJson(targetUrl, payload) {
  return new Promise((resolve, reject) => {
    const url = new URL(targetUrl);
    const data = JSON.stringify(payload);
    const options = {
      method: 'POST',
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: `${url.pathname}${url.search}`,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const transport = url.protocol === 'https:' ? https : http;

    const req = transport.request(options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body);
        } else {
          reject(
            new Error(
              `State setup failed with status ${res.statusCode}: ${body || 'no body'}`,
            ),
          );
        }
      });
    });

    req.on('error', (error) => reject(error));
    req.write(data);
    req.end();
  });
}

async function setProviderState(baseUrl, state, params) {
  const payload = { state };
  if (params && Object.keys(params).length > 0) {
    payload.params = params;
  }
  await postJson(`${baseUrl.replace(/\/$/, '')}/_pactState`, payload);
}

async function verify() {
  const providerBaseUrl = process.env.PACT_PROVIDER_BASE_URL || 'http://localhost:3000';
  const pactDirectory = path.resolve(__dirname, '..', '..', 'pacts');

  if (!fs.existsSync(pactDirectory)) {
    throw new Error(`Pact directory not found: ${pactDirectory}`);
  }

  const pactFiles = fs
    .readdirSync(pactDirectory)
    .filter((file) => file.endsWith('.json'))
    .map((file) => path.join(pactDirectory, file));

  if (pactFiles.length === 0) {
    throw new Error(`No pact files found in ${pactDirectory}`);
  }

  const verifier = new Verifier({
    provider: 'Licenses Service',
    providerBaseUrl,
    pactUrls: pactFiles,
    publishVerificationResult: false,
    stateHandlers: {
      'patient 11111111-1 has issued license folio L-1001': () =>
        setProviderState(providerBaseUrl, 'patient 11111111-1 has issued license folio L-1001'),
      'no licenses for patient 22222222-2': () =>
        setProviderState(providerBaseUrl, 'no licenses for patient 22222222-2'),
      'license L-404 does not exist': () =>
        setProviderState(providerBaseUrl, 'license L-404 does not exist'),
      'issued license days>0 is creatable': () =>
        setProviderState(providerBaseUrl, 'issued license days>0 is creatable'),
    },
  });

  try {
    const output = await verifier.verify();
    console.log(output);
    console.log('✅ Pact verification succeeded');
  } catch (error) {
    console.error('❌ Pact verification failed');
    console.error(error);
    process.exitCode = 1;
  }
}

verify();
