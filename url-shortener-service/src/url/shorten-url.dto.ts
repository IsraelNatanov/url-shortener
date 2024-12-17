
import { ApiProperty } from '@nestjs/swagger';

export class ShortenUrlDto {
  @ApiProperty({
    description: 'The original URL to shorten',
    example: 'https://en.wikipedia.org/wiki/%22Hello,_World!%22_program',
  })
  url: string;
}

