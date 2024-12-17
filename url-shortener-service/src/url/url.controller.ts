import { Controller, Post, Body, Get, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { UrlService } from './url.service';
import { ShortenUrlDto } from './shorten-url.dto';

@ApiTags('urls') 
@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  @ApiBody({ type: ShortenUrlDto })
  @ApiResponse({ status: 201, description: 'URL shortened successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid URL.' })
  async shortenUrl(@Body() body: ShortenUrlDto): Promise<{ shortUrl: string }> {
    const isValid = await this.urlService.isUrlValid(body.url);
    if (!isValid) {
      throw new HttpException('Invalid URL', HttpStatus.BAD_REQUEST);
    }
    const shortUrl = this.urlService.generateShortUrl(body.url);
    return { shortUrl };
  }

  @Post('expand')
  @ApiBody({ schema: { example: { shortUrl: 'http://localhost:3001/api/1234' } } })
  @ApiResponse({ status: 200, description: 'Original URL retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Short URL not found.' })
  expandUrl(@Body() body: { shortUrl: string }): { originalUrl: string } {
    const { shortUrl } = body; 
    const shortId = shortUrl.split('/').pop();
    const originalUrl = this.urlService.getOriginalUrl(shortId);
    if (!originalUrl) {
      throw new HttpException('Short URL not found', HttpStatus.NOT_FOUND);
    }
    return { originalUrl };
  }

  @Get(':shortId')
  @ApiParam({ name: 'shortId', required: true, description: 'The short URL identifier' })
  @ApiResponse({ status: 302, description: 'Redirects to the original URL.' })
  @ApiResponse({ status: 404, description: 'Short URL not found.' })
  redirectToOriginal(@Param('shortId') shortId: string, @Res() res: Response): void {
    const originalUrl = this.urlService.getOriginalUrl(shortId);

    if (!originalUrl) {
      throw new HttpException('Short URL not found', HttpStatus.NOT_FOUND);
    }

    res.redirect(originalUrl);
  }
}
