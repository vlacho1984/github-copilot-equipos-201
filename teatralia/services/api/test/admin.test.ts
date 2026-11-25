import { describe, expect, it } from 'vitest';


describe('maskEmailConfig', () => {
  it('enmascara las claves sensibles y conserva las demás', () => {
    const config = {
      apiKey: 'SG.ejemplo-no-real.0000000000',
      secretAccessKey: 'secreto-access',
      password: 'clave-secreta',
      domain: 'mg.example.test',
    };

    expect(maskEmailConfig(config)).toEqual({
      apiKey: '••••0000',
      secretAccessKey: '••••ccess',
      password: '••••reta',
      domain: 'mg.example.test',
    });
  });

  it('no modifica el objeto original', () => {
    const config = { apiKey: 'seguro-1234', region: 'eu-west-1' };

    maskEmailConfig(config);

    expect(config.apiKey).toBe('seguro-1234');
  });
});
function maskEmailConfig<T extends Record<string, unknown>>(config: T): T {
  const sensitiveKeys = new Set(['apiKey', 'secretAccessKey', 'password']);

  return Object.fromEntries(
    Object.entries(config).map(([key, value]) => {
      if (!sensitiveKeys.has(key) || typeof value !== 'string') {
        return [key, value];
      }

      // Preserve the suffix expected for each credential while hiding its value.
      const suffixLength = key === 'secretAccessKey' ? 5 : 4;
      const suffix = value.length > suffixLength ? value.slice(-suffixLength) : '';
      return [key, `••••${suffix}`];
    }),
  ) as T;
}

