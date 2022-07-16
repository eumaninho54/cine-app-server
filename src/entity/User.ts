//import { Tickets } from './Tickets';
import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from "typeorm";

@Entity()
@Index(["email"], { unique: true })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  /*@OneToMany(() => Tickets, (tickets: Tickets) => tickets.id_user)
  tickets: Tickets[]*/

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
