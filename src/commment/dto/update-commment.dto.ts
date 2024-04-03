import { IsNumber, IsOptional } from "class-validator";

export class UpdateCommentDto {
  /**
   * The ID of the user who left the comment.
   * @type {number}
   */
  @IsNumber()
  @IsOptional()
  userId?: number;

  /**
   * The ID of the stadium being commented on.
   * @type {number}
   */
  @IsNumber()
  @IsOptional()
  stadiumId?: number;

  /**
   * The impression or feedback about the stadium.
   * @type {string}
   */
  @IsString()
  @IsOptional()
  impression?: string;
}
