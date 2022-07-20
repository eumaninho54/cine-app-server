import { Tickets } from './Tickets';
import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from "typeorm";
import { Favorites } from './Favorites';

@Entity()
@Index(["email"], { unique: true })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Tickets, (tickets: Tickets) => tickets.id_user, { eager: true })
  tickets: Tickets[]

  @OneToMany(() => Favorites, (Favorites: Favorites) => Favorites.user, { eager: true })
  favorites: Favorites[]
}
