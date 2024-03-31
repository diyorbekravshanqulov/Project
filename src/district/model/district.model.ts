import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Region } from '../../region/model/region.model';

interface DistrictCreationAttr {
  name: string;
  regionId: string;
}

@Table({ tableName: 'district' })
export class District extends Model<District, DistrictCreationAttr> {
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

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  regionId: string;

  @BelongsTo(() => Region) 
  region: Region;
}
