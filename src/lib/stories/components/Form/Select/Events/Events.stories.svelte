<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { selectOptions, storySelectArgTypes } from '../Select.stories.svelte';
  import Select, { type SelectOption } from '../Select.svelte';
  import type { TextInputClipboardEvent } from '../../TextInput/TextInput.svelte';
  import type {
    DynamicInputFocusEvent,
    DynamicInputKeyboardEvent,
  } from '$lib/stories/developer tools/components/DynamicInput/DynamicInput.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: Select,
    tags: ['autodocs'],
    argTypes: storySelectArgTypes,
    parameters: {
      docs: {
        story: {
          height: '400px',
          inline: false,
        },
      },
    },
  });

  const options = selectOptions;

  let value = $state<SelectOption>(options[0]);
</script>

<Story
  name="SelectEvent"
  args={{
    options,
    value,
    onselect: (val: SelectOption) => {
      console.log('Select Event', val);
    },
  }}
/>

<Story
  name="Clear"
  args={{
    options,
    value,
    onclear: () => {
      console.log('Clear Event');
    },
  }}
/>

<Story
  name="Input"
  args={{
    options,
    value,
    searchable: true,
    oninput: (e: Event) => {
      const target = e.target as HTMLInputElement;

      console.log('Input Event', target.value);
    },
  }}
/>

<Story
  name="Change"
  args={{
    options,
    value,
    searchable: true,
    onchange: (e: Event) => {
      const target = e.target as HTMLInputElement;

      console.log('onChange Event', target.value);
    },
  }}
/>

<Story
  name="Focus"
  args={{
    options,
    value,
    onfocus: (e: DynamicInputFocusEvent) => {
      const target = e.target as HTMLInputElement | HTMLButtonElement;

      console.log('onfocus Event', target);
    },
  }}
/>

<Story
  name="Blur"
  args={{
    options,
    value,
    onblur: (e: DynamicInputFocusEvent) => {
      const target = e.target as HTMLInputElement | HTMLButtonElement;

      console.log('onblur Event', target);
    },
  }}
/>

<Story
  name="Copy"
  args={{
    options,
    value,
    searchable: true,
    oncopy: (e: TextInputClipboardEvent) => {
      const target = e.target as HTMLInputElement;

      console.log('oncopy Event', target);
    },
  }}
/>

<Story
  name="Cut"
  args={{
    options,
    value,
    searchable: true,
    oncut: (e: TextInputClipboardEvent) => {
      const target = e.target as HTMLInputElement;

      console.log('oncut Event', target);
    },
  }}
/>

<Story
  name="Paste"
  args={{
    options,
    value,
    searchable: true,
    onpaste: (e: TextInputClipboardEvent) => {
      const target = e.target as HTMLInputElement;

      console.log('onpaste Event', target);
    },
  }}
/>

<Story
  name="KeyDown"
  args={{
    onkeydown: (e: DynamicInputKeyboardEvent) => {
      console.log('onkeydown Event', e.key);
    },
  }}
/>

<Story
  name="KeyPress"
  args={{
    onkeypress: (e: DynamicInputKeyboardEvent) => {
      console.log('onkeypress Event', e.key);
    },
  }}
/>

<Story
  name="KeyUp"
  args={{
    onkeyup: (e: DynamicInputKeyboardEvent) => {
      console.log('onkeyup Event', e.key);
    },
  }}
/>
