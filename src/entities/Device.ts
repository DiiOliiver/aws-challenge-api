import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./Category";

@Entity("devices")
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category)
  category: Category;

  @Column()
  color: string;

  @Column()
  partNumber: string;
}
