import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  getAllTags() {
    return ['javascript', 'typescript', 'nodejs', 'nestjs', 'expressjs'];
  }
}
