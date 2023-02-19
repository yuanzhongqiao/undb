import * as z from 'zod'
import { recordIdSchema } from '../record/value-objects/record-id.schema.js'
import { baseFieldQuerySchema, createBaseFieldsSchema, updateBaseFieldSchema } from './field-base.schema'
import { FIELD_TYPE_KEY } from './field.constant.js'
import { IdField } from './id-field.js'

export const idTypeSchema = z.literal('id')
export type IdFieldType = z.infer<typeof idTypeSchema>
const idTypeObjectSchema = z.object({ [FIELD_TYPE_KEY]: idTypeSchema })

export const createIdFieldSchema = createBaseFieldsSchema.merge(idTypeObjectSchema)
export type ICreateIdFieldInput = z.infer<typeof createIdFieldSchema>

export const updateIdFieldSchema = updateBaseFieldSchema.merge(idTypeObjectSchema)
export type IUpdateIdFieldInput = z.infer<typeof updateIdFieldSchema>

export const idFieldQuerySchema = baseFieldQuerySchema.merge(idTypeObjectSchema)

export const idFieldValue = recordIdSchema
export type IIdFieldValue = z.infer<typeof idFieldValue>

export const createIdFieldValue = idFieldValue
export type ICreateIdFieldValue = z.infer<typeof createIdFieldValue>

export const idFieldQueryValue = idFieldValue
export type IIdFieldQueryValue = z.infer<typeof idFieldQueryValue>

export const createIdFieldValue_internal = z
  .object({ value: createIdFieldValue })
  .merge(idTypeObjectSchema)
  .merge(z.object({ field: z.instanceof(IdField) }))
export type ICreateIdFieldValue_internal = z.infer<typeof createIdFieldValue_internal>
