<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Opacity from './Opacity.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: Opacity,
  });
</script>

<Story name="Main" />
