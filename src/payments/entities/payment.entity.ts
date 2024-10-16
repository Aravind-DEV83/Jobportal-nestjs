import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from "src/users/entities/user.entity"

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 255 })
  paymentMethod: string; // e.g., 'Credit Card', 'PayPal', 'Bank Transfer'

  @Column({ type: 'varchar', length: 255 })
  transactionId: string; // Unique identifier from payment gateway

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

//   @ManyToOne(() => User, (user) => user.payments)
//   @JoinColumn({ name: 'userId' })
//   user: User;
}
