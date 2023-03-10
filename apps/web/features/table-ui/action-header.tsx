import { Tooltip, ActionIcon, openContextModal, IconColumnInsertRight } from '@egodb/ui'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ACTIONS_FIELD } from '../../constants/field.constants'
import { CREATE_FIELD_MODAL_ID } from '../../modals'

// eslint-disable-next-line react/display-name
export const ActionHeader: React.FC = React.memo(() => {
  const { t } = useTranslation()

  return (
    <th key={ACTIONS_FIELD} style={{ borderBottom: '0' }}>
      <Tooltip label={t('Create New Field')}>
        <ActionIcon
          onClick={() =>
            openContextModal({
              title: t('Create New Field'),
              modal: CREATE_FIELD_MODAL_ID,
              innerProps: {},
            })
          }
        >
          <IconColumnInsertRight />
        </ActionIcon>
      </Tooltip>
    </th>
  )
})