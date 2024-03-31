import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Region } from '../../region/model/region.model';
import { ApiProperty } from '@nestjs/swagger';

// Interface defining the attributes required to create a district
interface DistrictCreationAttr {
  name: string;
  regionId: string;
}

@Table({ tableName: 'district' }) // Define the table name for Sequelize
export class District extends Model<District, DistrictCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "District's unique ID",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'District A',
    description: 'Name of the district',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ForeignKey(() => Region) // Define foreign key relationship with Region model
  @Column({
    type: DataType.INTEGER,
  })
  regionId: string;

  @BelongsTo(() => Region) // Define association with Region model
  region: Region;
}
