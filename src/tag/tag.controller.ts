import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('api/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get()
  async getAllTags() {
    const allTags = await this.tagService.getAllTags();
    const tags: string[] = allTags.map((tag) => tag.name);
    return { tags };
  }
}
