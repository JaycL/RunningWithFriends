import { BaseEntity } from "./base.model";

export interface AuditableEntity extends BaseEntity {
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}