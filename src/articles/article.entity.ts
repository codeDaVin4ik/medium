import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('articles')
export class ArticleEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    body: string

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createddAt: Date

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date

    @Column('simple-array')
    taglist: string[]

    @Column({ default: 0})
    favoritesCount: number

    @BeforeUpdate()
    updadteTimestamp(){
        this.updatedAt = new Date()
    }
}