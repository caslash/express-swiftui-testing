import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface PersonAttributes {
  id: string;
  name: string;
  age: number;
}

interface PersonCreationAttributes extends Optional<PersonAttributes, 'id'> {}

class Person extends Model<PersonAttributes, PersonCreationAttributes> implements PersonAttributes {
  public id!: string;
  public name!: string;
  public age!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Person.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'Person',
    sequelize,
  },
);

export default Person;
