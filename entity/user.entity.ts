import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    firstName?: string;

    @Column()
    lastName?: string;

    @Column()
    permissionFlags?: number;
}