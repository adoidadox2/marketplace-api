import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import User from "./User";
import Ad from "./Ad";
import Sale from "./Sale";

@Entity("purchase")
export default class Purchase {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "uuid",
    nullable: false,
  })
  userId: string;

  @Column({
    type: "uuid",
    nullable: false,
  })
  adId: string;

  @Column({
    nullable: false,
  })
  content: string;

  @ManyToOne((type) => User, (user) => user.purchases, {
    nullable: false,
  })
  user: User;

  @ManyToOne((type) => Ad, (ad) => ad.purchases, {
    nullable: false,
  })
  ad: Ad;

  @OneToOne((type) => Sale, (sale) => sale.purchase, {
    nullable: true,
  })
  sale: Sale;

  @CreateDateColumn()
  created_at: Date;
}
