import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

// Interface defining the attributes required for creating a new category
interface CategoryCreationAttr {
  name: string; // Name of the category
  parentId: number; // ID of the parent category
}

@Table({ tableName: 'category' }) // Sequelize table configuration
export class Category extends Model<Category, CategoryCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Category's unique ID",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number; // Unique identifier for the category

  @ApiProperty({
    example: 'Electronics',
    description: "Category's name",
  })
  @Column({
    type: DataType.STRING,
  })
  name: string; // Name of the category

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    defaultValue: 1
  })
  parentId: number; // ID of the parent category

  @BelongsTo(() => Category)
  category: Category; // Parent category
}
