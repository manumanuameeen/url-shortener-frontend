export const MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Successfully logged in.',
    REGISTER_SUCCESS: 'Account created successfully.',
    LOGIN_ERROR: 'Failed to login. Please check your credentials.',
    REGISTER_ERROR: 'Failed to create account.',
    UNEXPECTED_ERROR: 'An unexpected error occurred.',
  },
  URLS: {
    CREATE_SUCCESS: 'Short URL created!',
    CREATE_ERROR: 'Failed to create short URL.',
    FETCH_ERROR: 'Failed to fetch URLs.',
    COPIED: 'Short URL copied to clipboard!',
  },
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email',
    PASSWORD_LENGTH: 'Password must be at least 6 characters',
  }
} as const;
