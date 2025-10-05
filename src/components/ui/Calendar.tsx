"use client"

import type * as React from "react"
import { DayPicker } from "react-day-picker"
import { ptBR } from "date-fns/locale";

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
     className={`p-3 border rounded-md border-gray-300 ${className}`}
      locale={ptBR}
      showOutsideDays={showOutsideDays}
      classNames={{
        months: 'relative flex justify-center align-center',
        month_caption:
          'flex items-center justify-center font-medium text-lg h-9 mx-2 text-gray-800 ',
        nav: 'absolute inset-x-0 flex justify-between items-center ',
        button_next:
          'relative inline-flex items-center justify-center w-9 h-9 hover:bg-gray-100 rounded',
        button_previous:
          'relative inline-flex items-center justify-center w-9 h-9 hover:bg-gray-100 rounded',
        chevron: 'inline-block fill-gray-400 ',
        week: 'grid grid-cols-7',
        weekdays: 'grid grid-cols-7',
        weekday: 'flex align-center justify-center text-gray-500',
        day: 'inline-flex items-center justify-center rounded text-gray-700 hover:bg-gray-200 hover:text-gray-900 w-12 h-12 font-normal aria-selected:opacity-100 cursor-pointer',
        today: 'bg-gray-100 font-semibold',
        selected:
          'bg-blue-500 text-white hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white',
        outside: 'text-gray-500 opacity-50 ',
        disabled: 'text-gray-500 opacity-50 cursor-auto',
        range_middle:
          'aria-selected:bg-blue-50 aria-selected:text-gray-900 aria-selected:hover:bg-blue-200 rounded-none ',
        hidden: 'invisible',
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar"

export { Calendar }
