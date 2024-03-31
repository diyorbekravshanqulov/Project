import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface RegionCreationAttr {
  name: string;
}

@Table({ tableName: 'region' })
export class Region extends Model<Region, RegionCreationAttr> {
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
