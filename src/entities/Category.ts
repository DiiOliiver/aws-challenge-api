import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;
}
