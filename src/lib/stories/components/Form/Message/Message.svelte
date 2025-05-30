<script lang="ts" module>
  import type { ComponentColor } from '$lib/types/colors.js';

  import type { ComponentSize } from '$lib/types/size.js';

  import type { Snippet } from 'svelte';

  export interface MessageProps {
    /** Message contents goes here */
    children?: Snippet;
    /** Message ref */
    ref?: HTMLDivElement;
    /** What color to use? */
    color?: ComponentColor;
    /** Message size */
    size?: ComponentSize;
    /** Custom css class*/
    class?: string;
  }
</script>

<script lang="ts">
  let {
    children,
    class: className = '',
    color = 'primary',
    ref = $bindable<HTMLDivElement>(),
    size = 'normal',
  }: MessageProps = $props();
</script>

<div
  class={['dodo-ui-Message', `color--${color}`, `size--${size}`, className].join(' ')}
  bind:this={ref}
>
  {#if children}
    {@render children()}
  {/if}
</div>

<style lang="scss">
  .dodo-ui-Message {
    letter-spacing: 0.3px;
    display: flex;
    font-family: inherit;

    &.size {
      &--normal {
        font-size: 1rem;
      }

      &--small {
        font-size: 0.9rem;
      }

      &--large {
        font-size: 1.1rem;
      }
    }

    &.color {
      &--primary {
        color: var(--dodo-color-primary-600);
      }

      &--secondary {
        color: var(--dodo-color-secondary-600);
      }

      &--neutral {
        color: var(--dodo-color-neutral-600);
      }

      &--safe {
        color: var(--dodo-color-safe-600);
      }

      &--warning {
        color: var(--dodo-color-warning-600);
      }

      &--danger {
        color: var(--dodo-color-danger-600);
      }
    }
  }
</style>
