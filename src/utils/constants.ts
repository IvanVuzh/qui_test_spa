export const apiBaseUrl: string = process.env.REACT_APP_API_URL || '';

export const URLS = {
  Search: (city: string): string => `search/${city}`,
  history: 'history',
};