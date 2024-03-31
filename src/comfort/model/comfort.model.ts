import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ComfortCreationAttr {
  name: string;
}

@Table({ tableName: 'comfort' })
export class Comfort extends Model<Comfort, ComfortCreationAttr> {
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
}
