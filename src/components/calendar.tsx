import * as React from 'react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'

import type { Dayjs } from 'dayjs'

export default function DateCalendarValue() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2023-05-28'))
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateCalendar', 'DateCalendar']}>
        <DemoItem>
          <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  )
}
