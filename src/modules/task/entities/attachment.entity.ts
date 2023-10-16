import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'attachment' })
export class AttachmentEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  fileName: string;

  @Column()
  @ApiProperty()
  url: string;

  @ApiProperty()
  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
