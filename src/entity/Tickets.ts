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
  session_date: Date;

  @Column()
  poster_path: string;

}
