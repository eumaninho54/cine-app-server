import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne } from "typeorm";
//import { User } from "./User";

@Entity()
export class Tickets {
  @PrimaryGeneratedColumn()
  id: number;

  /*@ManyToOne(() => User, (user: User) => user.tickets)
  id_user: User*/

  @Column()
  title: string;

  @Column()
  session_date: Date;

  @Column()
  poster_path: string;

}
