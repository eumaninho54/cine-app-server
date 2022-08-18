import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from './User';

@Entity()
export class Favorites {
  @ManyToOne(() => User, (user: User) => user.favorites, { onDelete: 'CASCADE'})
  user: User

  @PrimaryColumn()
  id: number
  
  @Column({type: "float"})
  vote_average: number

  @Column()
  overview: string;

  @Column()
  release_date: string

  @Column()
  backdrop_path: string

  @Column()
  poster_path: string

  @Column()
  title: string

  @Column()
  original_title: string

  @Column()
  popularity: string

  @Column("varchar", {array: true})
  genre_ids: string[]
}
