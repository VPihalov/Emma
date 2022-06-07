import { ApiProperty } from '@nestjs/swagger'

export class CreateResponseDto {
  @ApiProperty({
    type: 'string',
    description: 'Success of fail reward operation',
    required: true,
    example: { success: true },
  })
  success: string
}
