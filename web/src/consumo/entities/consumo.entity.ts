import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Consumo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  usuarioId!: string;

  @Column('float')
  consumo!: number;

  @Column({ type: 'datetime' })
  dataLeitura!: Date;
}
