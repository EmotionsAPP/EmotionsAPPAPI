import importExportFeature from '@adminjs/import-export';
import passwordsFeature from '@adminjs/passwords';
import { hashPassword } from '../../auth/security';

export const userFeatures = [
  importExportFeature(),
  passwordsFeature({
    properties: {
      encryptedPassword: 'password',
      password: 'newPassword'
    },
    hash: hashPassword,
  })
];
