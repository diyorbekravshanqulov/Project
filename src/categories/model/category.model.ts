import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface CategoryCreationAttr {
  name: string;
  parentId: number;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  parentId: number;

  @BelongsTo(() => Category)
  category: Category;
}
