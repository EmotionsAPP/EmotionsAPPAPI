import AdminJS, { buildFeature, Before, ActionResponse, After, FeatureType, ValidationError } from 'adminjs';
import { isEmpty } from 'class-validator';

/**
 * Hashing function used to convert the password
 *
 * @alias HashingFunction
 * @memberof module:@adminjs/passwords
 * @returns {Promise<string> | string}
 */
export type HashingFunction = (
  /**
   * Password which should be hashed
   */
  password: string
) => (Promise<string> | string);

/**
 * Validation function used to validate the password before being hashed.
 * Return the message of the result, if undefined is valid.
 */
export type ValidationFunction = (password: string) => Promise<string> | string;

/**
 * Options passed to {@link module:@adminjs/passwords PasswordsFeature}
 *
 * @alias PasswordsOptions
 * @memberof module:@adminjs/passwords
 */
export type PasswordsOptions = {
  /**
   * Names of the properties used by the feature
   */
  properties?: {
    /**
     * Virtual property which will be seen by end user. Its value is not stored in the database.
     * Default to `password`
     */
    password?: string,
    /**
     * Property where encrypted password will be stored. Default to `encryptedPassword`
     */
    encryptedPassword?: string,
  },
  /**
   * Function used to hash the password. You can pass function from the external library
   * Example using [Argon2](https://www.npmjs.com/package/argon2).: `hash: argon2.hash`
   *
   */
  hash: HashingFunction,
  /**
   * Function used to validate the password. If password is invalid, should throw
   * an adminjs `ValidationError`.
   */
  validate: ValidationFunction,
}

export type Custom = {
  [T in keyof NonNullable<PasswordsOptions['properties']>]: NonNullable<T>
}

const EDIT_COMPONENT = AdminJS.bundle('../components/password/PasswordEdit');

export const passwordsFeature = (options?: PasswordsOptions): FeatureType => {
  const passwordProperty = options?.properties?.password || 'password';
  const encryptedPasswordProperty = options?.properties?.encryptedPassword || 'encryptedPassword';
  const { hash, validate } = options || {};

  if (!hash) {
    throw new Error('You have to pass "hash" option in "PasswordOptions" of "passwordsFeature"');
  }

  if (!validate) {
    throw new Error('You have to pass "validate" option in "PasswordOptions" of "passwordsFeature"');
  }

  const encryptPassword: Before = async (request) => {
    const { method } = request;
    const { [passwordProperty]: newPassword, ...rest } = request.payload || {};

    if (method === 'post' && newPassword && !isEmpty(newPassword)) {

      const message = await validate(newPassword);

      if (message) 
        throw new ValidationError({[passwordProperty]: { message }});

      return {
        ...request,
        payload: {
          ...rest,
          [encryptedPasswordProperty]: await hash(newPassword),
        },
      }
    }
    return request
  }

  const movePasswordErrors: After<ActionResponse> = async (response) => {
    if (
      response.record
      && response.record.errors
      && response.record.errors[encryptedPasswordProperty]
    ) {
      response.record.errors[passwordProperty] = response.record.errors[encryptedPasswordProperty];
    }
    return response;
  }

  return buildFeature({
    properties: {
      [passwordProperty]: {
        custom: {
          password: passwordProperty,
          encryptedPassword: encryptedPasswordProperty,
        } as Custom,
        isVisible: { filter: false, show: false, edit: true, list: false },
        components: {
          edit: EDIT_COMPONENT,
        },
      },
    },
    actions: {
      edit: {
        before: [encryptPassword],
        after: [movePasswordErrors],
      },
      new: {
        before: [encryptPassword],
        after: [movePasswordErrors],
      },
    },
  })
}
