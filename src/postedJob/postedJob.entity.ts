import { Category } from 'src/category/category.entity';
import { Location } from 'src/location/location.entity';
import { Review } from 'src/review/review.entity';
import { User } from 'src/user/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PostedJob {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.postedJobs)
    @JoinColumn({ name: 'clientId' })
    client: User;

    @ManyToOne(() => User, (user) => user.acceptedJobs)
    @JoinColumn({ name: 'professionalId' })
    professional: User;

    @OneToOne(() => Review)
    @JoinColumn({ name: 'reviewId' })
    review: Review;

    @Column('varchar', { length: 800, nullable: false })
    posted_job_description: string;

    @ManyToOne(() => Location, (location) => location.postedJobs)
    @JoinColumn({ name: 'locationId' })
    location: Location;

    @Column('date', { nullable: false })
    posted_job_date: string;

    @Column('varchar', { length: 20, nullable: false })
    posted_job_priority: string;

    @Column('text', { array: true, nullable: false })
    posted_job_photos: string[];

    @Column('varchar', { length: 15, default: 'pendiente' })
    posted_job_status: string;

    @ManyToMany(() => Category, (category) => category.postedJobs)
    @JoinTable()
    categories: Category[];
}
