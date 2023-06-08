import { Test, TestingModule } from '@nestjs/testing';
import { ChannelUsersService } from './channel_user.service';

describe('ChannelUsersService', () => {
  let service: ChannelUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelUsersService],
    }).compile();

    service = module.get<ChannelUsersService>(ChannelUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
