import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

export type Role = 'client'| 'restaurateur'| 'deliverer'| 'developer'| 'commercial'| 'technician'

class User extends Model {
  declare _id:        string;
  declare email:      string;
  declare firstname:  string;
  declare lastname:   string;
  declare password?:  string;
  declare phone:      string;
  declare role:       Role;
  declare ban?:       boolean;
}

User.init({
  _id:        { type: DataTypes.STRING(), allowNull: false, primaryKey: true },
  email:      { type: DataTypes.STRING(), allowNull: false, unique: true },
  firstname:  { type: DataTypes.STRING(), allowNull: false },
  lastname:   { type: DataTypes.STRING(), allowNull: false },
  password:   { type: DataTypes.STRING(), allowNull: false },
  phone:      { type: DataTypes.STRING(), allowNull: false },
  role:       { type: DataTypes.ENUM('client', 'restaurateur', 'deliverer', 'developer', 'commercial', 'technician'), allowNull: false },
  ban:        { type: DataTypes.BOOLEAN() }
}, { sequelize: sequelize })


export default User