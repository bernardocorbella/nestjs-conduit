import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiModelProperty({ required: false })
  readonly username: string;

  @ApiModelProperty({ required: false })
  readonly email: string;

  @ApiModelProperty({ required: false })
  readonly bio: string;

  @ApiModelProperty({ required: false })
  readonly image: string;
}
