<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import NumericInput from './NumericInput.svelte';
  import type { StoryBookArgTypes } from '$lib/storybook-types.js';
  import { componentRoundnessArray } from '$lib/types/roundness.js';
  import { componentSizeArray } from '$lib/types/size.js';

  export const storyNumericInputArgTypes: StoryBookArgTypes = {
    roundness: {
      control: { type: 'select' },
      options: componentRoundnessArray,
    },
    size: {
      control: { type: 'select' },
      options: componentSizeArray,
    },
  };

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: NumericInput,
    tags: ['autodocs'],
    argTypes: storyNumericInputArgTypes,
  });

  let value = $state<undefined | number>(0);
</script>

<!-- NumericInput with default style -->
<Story
  name="Default"
  args={{
    value,
    onValueChange: (val) => {
      value = val;
    },
  }}
/>

<Story name="Placeholder" args={{ value: undefined, placeholder: 'Type something...' }} />

<Story
  name="No Outline"
  args={{
    outline: false,
    value,
    onValueChange: (val) => {
      value = val;
    },
  }}
/>

<Story
  name="Error"
  args={{
    error: true,
    value,
    onValueChange: (val) => {
      value = val;
    },
  }}
/>

<Story
  name="Disabled"
  args={{
    disabled: true,
    value,
    onValueChange: (val) => {
      value = val;
    },
  }}
/>

<Story
  name="Read only"
  args={{
    readonly: true,
    value,
    onValueChange: (val) => {
      value = val;
    },
  }}
/>
