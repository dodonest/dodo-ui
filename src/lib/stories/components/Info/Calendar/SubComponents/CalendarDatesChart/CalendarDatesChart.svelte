<script lang="ts" module>
  import type { ButtonClickEvent } from '$lib/stories/components/Form/Button/Button.svelte';

  export interface CalendarDatesChartProps {
    /** CalendarDatesChart ref */
    ref?: HTMLUListElement;
    /** Custom css class */
    class?: string;
    /** Selcted date Value */
    value?: Date;
    /** Define active month to override month selected with value */
    activeMonth?: Date;
    /** Start Of Week */
    startOfWeek?: CalendarWeekNames;
    /** Timezone string (e.g., "America/New_York"). */
    timezone?: string;
    /** Whether to return the time in UTC. If true, overrides timezone. */
    utc?: boolean;
    /** calendarDateChipProps: CalendarDateChip component props */
    calendarDateChipProps?: Partial<CalendarDateChipProps>;
    /** What color to use? */
    color?: ComponentColor;
    /** Show Today */
    showToday?: boolean;
    /** Show last month dates */
    showLastMonth?: boolean;
    /** Show next month dates */
    showNextMonth?: boolean;
    /** Show slected */
    showSelected?: boolean;
    /** Set today manually  */
    today?: Date;
    /** Minimum allowed date, rest of the dates will be disabled  */
    minDate?: Date;
    /** Maxium allowed date, rest of the dates will be disabled  */
    maxDate?: Date;
    /** Exclude Dates, these dates will be disabled */
    excludeDates?: Date[];
    /** Include Dates, rest of the dates will be disabled  */
    includeDates?: Date[];
    /** onselect event handler */
    onselect?: (value: Date, dayOfMonth: DateOfMonth, e: ButtonClickEvent) => void;
    /** Custom Calendar Chip Content */
    customCalendarDateChipContent?: (dayOfMonth: DateOfMonth) => Snippet;
    /** Custom Calendar Chip */
    customCalendarDateChip?: (dayOfMonth: DateOfMonth) => Snippet;
    /** Custom Calendar Week Content */
    customCalendarWeekContent?: (week: CalendarWeekOption) => Snippet;
    /** Custom Calendar Week */
    customCalendarWeek?: (week: CalendarWeekOption) => Snippet;
    /** week day Name type */
    weekDayNameType?: CalendarWeekDayNameType;
    /** How large should the Component be? */
    size?: ComponentSize;
    /** Weekend days */
    weekendDays?: CalendarWeekNames[];
    /** Color Weekend days */
    weekendDaysColorDays?: boolean;

    /** manipulate date callback */
    manipulateDate?: (
      dateToModify: DateOfMonth,
      settings?: CreateDatesOfMonthSettings,
    ) => DateOfMonth;
  }
</script>

<script lang="ts">
  import getMoment from '$lib/stories/developer tools/helpers/Time/getMoment/getMoment.js';
  import type { ComponentColor } from '$lib/types/colors.js';
  import type { Snippet } from 'svelte';
  import type { DateOfMonth } from '../../utils/types.js';
  import CalendarDateChip, {
    type CalendarDateChipProps,
  } from './CalendarDateChip/CalendarDateChip.svelte';
  import CalendarWeek from './CalendarWeek/CalendarWeek.svelte';
  import type {
    CalendarWeekOption,
    CalendarWeekDayNameType,
    CalendarWeekNames,
  } from './CalendarWeek/CalendarWeek.svelte';
  import type { ComponentSize } from '$lib/types/size.js';
  import { getDatesOfMonth } from '$lib/index.js';
  import type { CreateDatesOfMonthSettings } from '../../utils/createDateOfMonth/createDateOfMonth.js';

  let {
    class: className = '',
    ref = $bindable<HTMLUListElement>(),
    value,
    startOfWeek,
    timezone,
    utc,
    calendarDateChipProps,
    color,
    showToday,
    showLastMonth,
    showNextMonth,
    showSelected = true,
    activeMonth,
    onselect,
    customCalendarDateChipContent,
    customCalendarDateChip,
    today,
    minDate,
    maxDate,
    excludeDates,
    includeDates,
    weekDayNameType,
    customCalendarWeekContent,
    customCalendarWeek,
    size = 'normal',
    weekendDays,
    weekendDaysColorDays = true,
    manipulateDate,
  }: CalendarDatesChartProps = $props();

  let monthToPick = $state<Date | undefined>(undefined);

  const daysGroup = $derived(
    getDatesOfMonth(
      monthToPick,
      {
        startOfWeek,
        timezone,
        utc,
        today,
        minDate,
        maxDate,
        excludeDates,
        includeDates,
      },
      manipulateDate,
    ) || [],
  );

  $effect(() => {
    if (!value) {
      monthToPick = activeMonth;
      return;
    }

    // Override active month if it's not same as value
    if (
      activeMonth &&
      getMoment(activeMonth, undefined, { timezone, utc }).format('MMM YYYY') !==
        getMoment(value, undefined, { timezone, utc }).format('MMM YYYY')
    ) {
      monthToPick = activeMonth;
    } else {
      monthToPick = value;
    }
  });
</script>

<ul class={['dodo-ui-CalendarDatesChart', `size--${size}`, className].join(' ')} bind:this={ref}>
  <CalendarWeek
    nameType={weekDayNameType}
    {startOfWeek}
    {customCalendarWeekContent}
    {customCalendarWeek}
    {size}
    {weekendDays}
  />

  {#each daysGroup as group, index (index)}
    <li class="daysRow">
      <ul>
        {#each group as day (day.id)}
          <CalendarDateChip
            dayOfMonth={day}
            {color}
            {showToday}
            {showLastMonth}
            {showNextMonth}
            selected={showSelected &&
            getMoment(value, undefined, { timezone, utc }).format('DD-MM-YYY') ===
              getMoment(day.date, undefined, { timezone, utc }).format('DD-MM-YYY')
              ? true
              : false}
            {onselect}
            {customCalendarDateChip}
            {customCalendarDateChipContent}
            {size}
            {timezone}
            {utc}
            weekend={weekendDaysColorDays &&
            weekendDays?.includes(
              getMoment(day.date, undefined, { timezone, utc })
                .format('ddd')
                .toLowerCase() as CalendarWeekNames,
            )
              ? true
              : false}
            {...calendarDateChipProps}
          />
        {/each}
      </ul>
    </li>
  {/each}
</ul>

<style lang="scss">
  .dodo-ui-CalendarDatesChart {
    display: inline-flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    user-select: none;

    ul {
      padding: 0;
      display: flex;
      margin: 0;
    }

    .daysRow {
      display: block;
      padding: 0;
      margin: 0;
    }

    &.size {
      &--normal {
        min-width: calc(var(--dodo-ui-element-height-normal) * 7);
      }

      &--small {
        min-width: calc(var(--dodo-ui-element-height-small) * 7);
      }

      &--large {
        min-width: calc(var(--dodo-ui-element-height-large) * 7);
      }
    }
  }
</style>
