import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import User from "./User";
import Purchase from "./Purchase";

@Entity("ad")
export default class Ad {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
  })
  description: string;

  @Column({ type: "real", nullable: false })
  price: number;

  @ManyToOne((type) => User, (user) => user.ads, {
    nullable: false,
  })
  author: User;

  @OneToMany((type) => Purchase, (purchase) => purchase.ad)
  purchases: Purchase[];

  @Column()
  purchasedBy: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
