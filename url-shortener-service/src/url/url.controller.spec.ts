import { UrlService } from './url.service';


jest.mock('dns', () => ({
  promises: {
    resolve: jest.fn((hostname: string) => {
      if (hostname === 'nextjs.org') {
        return Promise.resolve(['127.0.0.1']); 
      } else {
        return Promise.reject(new Error('DNS lookup failed')); 
      }
    }),
  },
}));

describe('UrlService', () => {
  let service: UrlService;

  beforeEach(() => {
    service = new UrlService();
  });

  describe('generateShortUrl', () => {
    it('should generate a short URL with the correct format', () => {
      const originalUrl = 'https://nextjs.org';
      const shortUrl = service.generateShortUrl(originalUrl);

      expect(shortUrl).toMatch(/^http:\/\/localhost:3001\/api\/[a-zA-Z0-9]{8}$/);
    });

    it('should map the short URL to the original URL', () => {
      const originalUrl = 'https://nextjs.org';
      const shortUrl = service.generateShortUrl(originalUrl);
      const shortId = shortUrl.split('/').pop();

      expect(service.getOriginalUrl(shortId!)).toBe(originalUrl);
    });
  });

  describe('getOriginalUrl', () => {
    it('should return the original URL for a valid shortId', () => {
      const originalUrl = 'https://nextjs.org';
      const shortUrl = service.generateShortUrl(originalUrl);
      const shortId = shortUrl.split('/').pop();

      expect(service.getOriginalUrl(shortId!)).toBe(originalUrl);
    });

    it('should return null for an invalid shortId', () => {
      expect(service.getOriginalUrl('invalidId')).toBeNull();
    });
  });

  describe('isUrlValid', () => {
    it('should return true for a valid URL', async () => {
      const isValid = await service.isUrlValid('https://nextjs.org');
      expect(isValid).toBe(true);
    });

    it('should return false for an invalid URL', async () => {
      const isValid = await service.isUrlValid('https://invalid-domain-123456.com');
      expect(isValid).toBe(false);
    });

    it('should return false for an improperly formatted URL', async () => {
      const isValid = await service.isUrlValid('not-a-url');
      expect(isValid).toBe(false);
    });
  });
});
