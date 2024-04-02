import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Stadiums } from '../../stadiums/model/stadium.model';
import { ComfortStadium } from '../../confort_stadium/model/confort_stadium.model';

// Define the interface for Comfort entity creation attributes
interface ComfortCreationAttr {
  name: string; // Name of the comfort option
}

@Table({ tableName: 'comfort' }) // Define the table name for the Comfort model
export class Comfort extends Model<Comfort, ComfortCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number; // Unique identifier for the comfort option

  @Column({
    type: DataType.STRING,
  })
  name: string; // Name of the comfort option

  @BelongsToMany(() => Stadiums, () => ComfortStadium)
  stadium: Stadiums[];
}
