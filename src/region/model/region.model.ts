import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

// Interface defining the attributes required for creating a new region
interface RegionCreationAttr {
  name: string; // Name of the region
}

@Table({ tableName: 'region' }) // Sequelize table configuration
export class Region extends Model<Region, RegionCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Region's unique ID",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number; // Unique identifier for the region

  @ApiProperty({
    example: 'North',
    description: "Region's name",
  })
  @Column({
    type: DataType.STRING,
  })
  name: string; // Name of the region
}
