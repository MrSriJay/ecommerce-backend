import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  username: string;

  @Column()
  @ApiProperty({
    description: 'The hashed password of the user (stored securely)',
    example: 'hashed_password_example',  
  })
  password: string;
}
