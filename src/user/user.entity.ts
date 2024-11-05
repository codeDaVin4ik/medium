import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hash } from 'bcrypt';

@Entity({name: 'users'})
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column({default: ''})
    bio: string

    @Column({default: ''})
    image: string

    @Column()
    password: string

    @BeforeInsert()
    async hashPassword(){
        const hashedPassword = await hash(this.password, 10);
        this.password = hashedPassword;
    }
}