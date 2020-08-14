import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import User from "./User";
import Purchase from "./Purchase";
import Sale from "./Sale";

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

  @OneToOne((type) => Sale, (sale) => sale.ad, {
    nullable: true,
  })
  sale: Sale;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
