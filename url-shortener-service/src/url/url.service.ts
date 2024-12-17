import { Injectable } from '@nestjs/common';
import { promises as dnsPromises } from 'dns';
import { URL } from 'url';

@Injectable()
export class UrlService {
  private urlMap: Map<string, string> = new Map();

  generateShortUrl(originalUrl: string): string {
    const shortId = Math.random().toString(36).substr(2, 8);
    this.urlMap.set(shortId, originalUrl);
    return `http://localhost:3001/api/${shortId}`;
  }

  getOriginalUrl(shortId: string): string | null {
    return this.urlMap.get(shortId) || null;
  }

 
  async isUrlValid(url: string): Promise<boolean> {
    try {
      const hostname = new URL(url).hostname; 
      const addresses = await dnsPromises.resolve(hostname);
      return addresses.length > 0; 
    } catch (error) {
      console.error('DNS Lookup failed:', error.message);
      return false;
    }
  }
}
