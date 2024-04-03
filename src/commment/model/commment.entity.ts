import { Column, Model, Table, DataType } from 'sequelize-typescript';

/**
 * Represents a comment left by a user about a stadium.
 */
interface CommentCreationAttr {
  userId: number; // The ID of the user leaving the comment.
  stadiumId: number; // The ID of the stadium being commented on.
  impression: string; // The impression or feedback about the stadium.
}

@Table({ tableName: 'comment' })
export class Comments extends Model<Comments, CommentCreationAttr> {
  /**
   * The unique identifier for the comment.
   * @type {number}
   */
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  /**
   * The ID of the user who left the comment.
   * @type {number}
   */
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  /**
   * The ID of the stadium being commented on.
   * @type {number}
   */
  @Column({ type: DataType.INTEGER, allowNull: false })
  stadiumId: number;

  /**
   * The impression or feedback about the stadium.
   * @type {string}
   */
  @Column({ type: DataType.STRING, allowNull: false })
  impression: string;
}
