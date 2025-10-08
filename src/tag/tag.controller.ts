import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('api/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get()
  getAllTags() {
    return this.tagService.getAllTags();
  }
}
