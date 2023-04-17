import type { RevoGrid } from '@revolist/revogrid/dist/types/interfaces'
import type { VNode } from '@revolist/revogrid/dist/types/stencil-public-runtime'
import type {
	AutoIncrementFieldValue,
	AverageFieldValue,
	BoolFieldValue,
	CollaboratorField,
	CollaboratorFieldValue,
	ColorFieldValue,
	CountFieldValue,
	CreatedAtField,
	DateField,
	DateFieldValue,
	DateRangeField,
	DateRangeFieldValue,
	EmailFieldValue,
	ICollaboratorProfile,
	IFieldType,
	IOptionSchema,
	LookupField,
	NumberFieldValue,
	ParentField,
	ParentFieldValue,
	RatingField,
	RatingFieldValue,
	ReferenceField,
	ReferenceFieldValue,
	SelectField,
	SelectFieldValue,
	StringFieldValue,
	SumFieldValue,
	TreeField,
	TreeFieldValue,
	UpdatedAtField,
} from '@undb/core'
import cx from 'classnames'
import { format } from 'date-fns'

type TemplateFunc = RevoGrid.CellTemplateFunc<VNode>
type HyperFunc = RevoGrid.HyperFunc<VNode>

const string: TemplateFunc = (h, props) => {
	const value = props.model[props.prop] as StringFieldValue | undefined
	if (!value) return null
	return h('span', { class: 'text-sm' }, value.unpack()?.toString() ?? '')
}

const email: TemplateFunc = (h, props) => {
	const value = props.model[props.prop] as EmailFieldValue | undefined
	if (!value) return null
	return h('span', { class: 'text-sm' }, value.unpack()?.toString() ?? '')
}

const id: TemplateFunc = (h, props) => {
	const id = props.model.id as string
	return h(
		'span',
		{
			class:
				'bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300',
		},
		id,
	)
}

const dateComponent = (h: HyperFunc, dateString: string, formatString: string) => {
	const date = new Date(dateString)

	return h('span', {}, format(date, formatString))
}

const dateRange: TemplateFunc = (h, props) => {
	const value = props.model[props.prop] as DateRangeFieldValue | undefined
	if (!value) return null

	const field = props.column.field as DateRangeField

	return h('div', { class: 'flex items-center' }, [
		dateComponent(h, value.from.unwrap().toISOString(), field.formatString),
		dateComponent(h, value.to.unwrap().toISOString(), field.formatString),
	])
}

const createdAt: TemplateFunc = (h, props) => {
	const createdAt = props.model.created_at
	const field = props.column.field as CreatedAtField
	return dateComponent(h, createdAt, field.formatString)
}

const updatedAt: TemplateFunc = (h, props) => {
	const updatedAt = props.model.updated_at
	const field = props.column.field as UpdatedAtField
	return dateComponent(h, updatedAt, field.formatString)
}

const date: TemplateFunc = (h, props) => {
	const value = props.model[props.prop] as DateFieldValue | undefined
	if (!value || !value.unpack()) return null
	const field = props.column.field as DateField
	return dateComponent(h, value.unpack()?.toISOString() ?? '', field.formatString)
}

const collaboratorComponent = (h: HyperFunc, collaborator: ICollaboratorProfile) => {
	return h(
		'div',
		{
			class:
				'flex items-center space-x-2 bg-gray-100 text-gray-800 text-xs font-medium pr-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300 h-5',
		},
		[
			!collaborator.avatar
				? h(
						'div',
						{
							class:
								'relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-blue-100 rounded-full dark:bg-blue-600',
						},
						h('span', { class: 'font-medium text-gray-600 dark:text-gray-300' }, collaborator.username.slice(0, 2)),
				  )
				: h('img', { class: 'w-5 h-5 rounded-full', src: collaborator.avatar, alt: collaborator.username }),
			h('div', { class: 'font-medium dark:text-white' }, h('span', {}, collaborator.username)),
		],
	)
}

const createdBy: TemplateFunc = (h, props) => {
	const createdBy = props.model.created_by_profile as ICollaboratorProfile

	return collaboratorComponent(h, createdBy)
}

const updatedBy: TemplateFunc = (h, props) => {
	const updatedBy = props.model.updated_by_profile as ICollaboratorProfile

	return collaboratorComponent(h, updatedBy)
}

const n = (h: HyperFunc, n?: number | null) => {
	return h('span', {}, n?.toString() ?? '')
}

const number: TemplateFunc = (h, props) => {
	const number = props.model[props.prop] as NumberFieldValue | undefined
	return n(h, number?.unpack())
}

const average: TemplateFunc = (h, props) => {
	const average = props.model[props.prop] as AverageFieldValue | undefined
	return n(h, average?.unpack())
}

const sum: TemplateFunc = (h, props) => {
	const sum = props.model[props.prop] as SumFieldValue | undefined
	return n(h, sum?.unpack())
}

const rating: TemplateFunc = (h, props) => {
	const rating = props.model[props.prop] as RatingFieldValue | undefined
	if (!rating) return null

	const field = props.column.field as RatingField
	const max = field.max
	const value = rating.unpack() ?? 0

	return h(
		'div',
		{ class: 'flex items-center' },
		new Array(max).fill(0).map((_, index) =>
			h(
				'svg',
				{
					'aria-hidden': true,
					class: 'w-5 h-5' + (index < value ? ' text-yellow-400' : ' text-gray-300 dark:text-gray-500'),
					fill: 'currentColor',
					viewBox: '0 0 20 20',
					xmlns: 'http://www.w3.org/2000/svg',
				},
				h('path', {
					d: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z',
				}),
			),
		),
	)
}

const autoIncreament: TemplateFunc = (h, props) => {
	const value = props.model[props.prop] as AutoIncrementFieldValue | undefined

	if (!value) return

	return n(h, value.unpack())
}

const bool: TemplateFunc = (h, props) => {
	const value = props.model[props.prop] as BoolFieldValue | undefined
	if (!value) return null

	return h('input', {
		type: 'checkbox',
		class:
			'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600',
		checked: !!value.unpack(),
	})
}

const collaborator: TemplateFunc = (h, props) => {
	const collaborator = props.model[props.prop] as CollaboratorFieldValue | undefined
	if (!collaborator) return null
	const field = props.column.field as CollaboratorField

	const value = field.getDisplayValues(props.model.display_values)

	return h(
		'div',
		{ class: 'flex items-center space-x-2' },
		value.map(([username, avatar]) => {
			if (!username) return null
			return collaboratorComponent(h, { username, avatar })
		}),
	)
}

const color: TemplateFunc = (h, props) => {
	const color = props.model[props.prop] as ColorFieldValue | undefined
	if (!color) return null

	return h('div', { class: 'flex items-center space-x-2' }, [
		h('div', { class: 'w-5 h-5', style: { backgroundColor: color.unpack() } }),
		h('div', {}, color.unpack() ?? ''),
	])
}

const count: TemplateFunc = (h, props) => {
	const count = props.model[props.prop] as CountFieldValue | undefined
	if (!count) return null

	return n(h, count.unpack())
}

const referenceComponent = (h: HyperFunc, value: (string | null)[]) => {
	return h(
		'span',
		{
			class: 'bg-blue-50 text-blue-900 text-xs font-sm mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300',
		},
		value.filter(Boolean).toString(),
	)
}

const reference: TemplateFunc = (h, props) => {
	const unpacked = (props.model[props.prop] as ReferenceFieldValue | TreeFieldValue | undefined)?.unpack()
	if (!unpacked) return null
	const displayValues = props.model.display_values
	const field = props.column.field as ReferenceField | TreeField
	const values = field.getDisplayValues(displayValues)

	return h(
		'div',
		{ class: 'flex items-center space-x-2' },
		values.map((value) => referenceComponent(h, value)),
	)
}

const optionComponent = (h: HyperFunc, { color, name }: IOptionSchema) => {
	const textColor = color.shade > 5 ? 'text-dark' : 'text-white'
	return h(
		'span',
		{ class: cx(`bg-${color.name}-${color.shade * 100}`, textColor, 'text-xs font-medium mr-2 px-2.5 py-0.5 rounded') },
		name,
	)
}

const select: TemplateFunc = (h, props) => {
	const field = props.column.field as SelectField
	const option = (props.model[props.prop] as SelectFieldValue | undefined)?.getOption(field).into()
	if (!option) return null

	return optionComponent(h, option.toJSON())
}

const parent: TemplateFunc = (h, props) => {
	if (!(props.model[props.prop] as ParentFieldValue | undefined)?.unpack()) return null
	const field = props.column.field as ParentField
	const value = field.getDisplayValues(props.model.display_values)[0]

	return referenceComponent(h, value)
}

const lookup: TemplateFunc = (h, props) => {
	const field = props.column.field as LookupField

	const values = field.getDisplayValues(props.model.display_values)
	return h(
		'div',
		{ class: 'flex items-center' },
		values.map((value) => h('span', {}, value.toString())),
	)
}

export const cellTemplateMap: Record<IFieldType, TemplateFunc> = {
	attachment: (h, props) => h('div', {}, props.model[props.prop] || ''),
	'auto-increment': autoIncreament,
	id,
	date,
	average,
	bool,
	collaborator,
	color,
	count,
	'created-at': createdAt,
	'created-by': createdBy,
	'date-range': dateRange,
	email,
	lookup,
	number,
	parent,
	rating,
	reference,
	select,
	string,
	sum,
	tree: reference,
	'updated-at': updatedAt,
	'updated-by': updatedBy,
}
