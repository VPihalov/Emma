import { IClaimShare } from '@interfaces/index.interface'
import { BadRequest } from '@modules/reward/bad-request-response'
import { CreateResponseDto } from '@modules/reward/dto/create-response.dto'
import { Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { Broker } from '../brocker/broker.service'
import { RewardService } from './reward.service'

@ApiTags('v1')
@Controller({ version: '1' })
export class RewardController {
  constructor(private readonly rewardService: RewardService, private readonly brokerService: Broker) {}

  @ApiResponse({
    status: 200,
    type: CreateResponseDto,
    isArray: false,
  })
  @ApiResponse({
    status: 400,
    type: BadRequest,
    isArray: false,
  })
  @ApiOperation({
    summary: 'Create media record',
    description: 'Create media record and returns an url to upload a file',
  })
  @Post('claim-free-share/:userId')
  async claimFreeShare(@Param('userId', ParseUUIDPipe) userId: string): Promise<IClaimShare | string> {
    return await this.rewardService.getReward(userId)
  }
}
