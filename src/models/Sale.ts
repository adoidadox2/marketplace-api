import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Ad from "./Ad";
import Purchase from "./Purchase";

@Entity("sale")
export default class Sale {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "uuid",
    nullable: false,
  })
  purchaseId: string;

  @Column({
    type: "uuid",
    nullable: false,
  })
  adId: string;

  @OneToOne((type) => Purchase, (purchase) => purchase.sale, {
    nullable: false,
  })
  @JoinColumn()
  purchase: Purchase;

  @OneToOne((type) => Ad, (ad) => ad.sale, {
    nullable: false,
  })
  @JoinColumn()
  ad: Ad;

  @CreateDateColumn()
  created_at: Date;
}
