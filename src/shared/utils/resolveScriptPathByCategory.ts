import AppError from '@shared/errors/AppError';

function resolveScriptPathByCategory(category: string): string {
  switch (category) {
    case 'search_leads': {
      const path = process.env.PYTHON_SEARCH_LEADS_SCRIPT_PATH;

      if (!path) {
        throw new AppError(
          'Environment variable "PYTHON_SEARCH_LEADS_SCRIPT_PATH" not configured.',
        );
      }

      return path;
    }
    case 'search_emails': {
      const path = process.env.PYTHON_SEARCH_EMAIL_SCRIPT_PATH;

      if (!path) {
        throw new AppError(
          'Environment variable "PYTHON_SEARCH_EMAIL_SCRIPT_PATH" not configured.',
        );
      }

      return path;
    }
    default: {
      throw new AppError('Unknown category received');
    }
  }
}

export default resolveScriptPathByCategory;
