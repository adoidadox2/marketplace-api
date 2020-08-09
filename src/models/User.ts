import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import Ad from "./Ad";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import authConfig from "../config/authConfig";
import Purchase from "./Purchase";
import encryptPassword from "../services/encryptPasswordService";

@Entity("user")
export default class User {
  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password_hash: string;

  password: string | null;

  @OneToMany((type) => Ad, (ad) => ad.author, {
    cascade: ["update", "remove", "soft-remove"],
  })
  ads: Ad[];

  @OneToMany((type) => Purchase, (purchase) => purchase.user, {
    cascade: ["update"],
  })
  purchases: Purchase[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @BeforeInsert()
  async upPass() {
    this.password_hash = await encryptPassword(String(this.password));
    this.password = null;
  }

  checkPassword(password: String) {
    return bcrypt.compare(password, this.password_hash);
  }

  generateToken() {
    return jwt.sign({ id: this.id }, authConfig.secret, {
      expiresIn: authConfig.ttl,
    });
  }
}
