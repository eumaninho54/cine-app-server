import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Tickets {
  @ManyToOne(() => User, (user: User) => user.tickets, { onDelete: 'CASCADE'})
  user: User

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  banner: string;

  @Column()
  session_date: string;

  @Column()
  hoursSession: string;
}