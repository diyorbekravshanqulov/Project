import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

// Interface defining the attributes needed to create a Stadium
interface StadiumCreationAttr {
  categoryId: number; // Category ID of the stadium
  ownerId: number; // Owner ID of the stadium
  contactWith: string; // Contact information for the stadium
  name: string; // Name of the stadium
  volume: string; // Volume of the stadium
  address: string; // Address of the stadium
  regionId: number; // Region ID of the stadium
  districtId: number; // District ID of the stadium
  location: string; // Location of the stadium
  buildAt: Date; // Date when the stadium was built
  startTime: number; // Starting time of stadium operations
  endTime: number; // Ending time of stadium operations
}

// Define the Sequelize model for Stadiums

@Table({ tableName: 'stadiums' })
export class Stadiums extends Model<Stadiums, StadiumCreationAttr> {
  @ApiProperty({
    description: 'Stadium ID',
    required: false,
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    description: 'Category ID of the stadium',
  })
  @Column({
    type: DataType.INTEGER,
  })
  categoryId: number;

  @ApiProperty({
    description: 'Owner ID of the stadium',
  })
  @Column({
    type: DataType.INTEGER,
  })
  ownerId: number;

  @ApiProperty({
    description: 'Contact information for the stadium',
  })
  @Column({
    type: DataType.STRING,
  })
  contactWith: string;

  @ApiProperty({
    description: 'Name of the stadium',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({
    description: 'Volume of the stadium',
  })
  @Column({
    type: DataType.STRING,
  })
  volume: string;

  @ApiProperty({
    description: 'Address of the stadium',
  })
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @ApiProperty({
    description: 'Region ID of the stadium',
  })
  @Column({
    type: DataType.INTEGER,
  })
  regionId: number;

  @ApiProperty({
    description: 'District ID of the stadium',
  })
  @Column({
    type: DataType.INTEGER,
  })
  districtId: number;

  @ApiProperty({
    description: 'Location of the stadium',
  })
  @Column({
    type: DataType.STRING,
  })
  location: string;

  @ApiProperty({
    description: 'Date when the stadium was built',
  })
  @Column({
    type: DataType.DATE,
    defaultValue: Date.now(),
  })
  buildAt: Date;

  @ApiProperty({
    description: 'Starting time of stadium operations',
  })
  @Column({
    type: DataType.INTEGER,
  })
  startTime: number;

  @ApiProperty({
    description: 'Ending time of stadium operations',
  })
  @Column({
    type: DataType.INTEGER,
  })
  endTime: number;
}
