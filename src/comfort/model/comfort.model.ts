import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
  })w
  id: number; // Unique identifier for the comfort option

  @Column({
    type: DataType.STRING,
  })
  name: string; // Name of the comfort option
}
