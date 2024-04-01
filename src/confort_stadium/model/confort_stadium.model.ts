import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

// Interface for defining attributes required for creating a new ComfortStadium entry
interface ComfortStadiumCreationAttr {
  stadiumId: number; // ID of the stadium associated with the comfort
  comfortId: number; // ID of the comfort associated with the stadium
}

@Table({ tableName: 'confort_stadium' })
export class ComfortStadium extends Model<
  ComfortStadium,
  ComfortStadiumCreationAttr
> {
  @ApiProperty({
    description: 'Unique identifier for the comfort-stadium relation',
    required: false,
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number; // Unique identifier for the comfort-stadium relation, auto-incremented

  @ApiProperty({
    description: 'ID of the stadium associated with the comfort',
    required: true,
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stadiumId: number; // ID of the stadium associated with the comfort

  @ApiProperty({
    description: 'ID of the comfort associated with the stadium',
    required: true,
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  comfortId: number; // ID of the comfort associated with the stadium
}
