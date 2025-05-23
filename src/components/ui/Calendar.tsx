"use client"

import type * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, getDefaultClassNames } from "react-day-picker"
import { ptBR } from "date-fns/locale";

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      className={className}
      locale={ptBR}
      showOutsideDays={showOutsideDays}
      classNames={{
        months: 'relative flex flex-wrap justify-center gap-9',
        month_caption:
          'flex items-center font-medium text-lg h-9 mx-2 text-gray-800',
        nav: 'absolute inset-x-0 flex justify-end items-center pr-6',
        button_next:
          'relative inline-flex items-center justify-center size-9 hover:bg-gray-100 rounded',
        button_previous:
          'relative inline-flex items-center justify-center size-9 hover:bg-gray-100 rounded',
        chevron: 'inline-block size- fill-gray-400',
        week: 'grid grid-cols-7',
        weekdays: 'grid grid-cols-7',
        weekday: 'size-14 flex items-center justify-center text-gray-500',
        day: 'inline-flex items-center justify-center rounded text-gray-700 hover:bg-gray-200 hover:text-gray-900 size-14 font-normal aria-selected:opacity-100 cursor-pointer',
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
