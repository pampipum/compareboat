//SvelteKit 5 code
<script>
  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'
  import '../app.css'

  let { data } = $props()
  let { session, supabase } = $derived(data)

  onMount(() => {
    const { data: authData } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth')
      }
    })

    return () => authData.subscription.unsubscribe()
  })
</script>

<slot />