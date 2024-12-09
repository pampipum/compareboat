<script>
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';

  let { data, children } = $props()
  let { supabase } = $derived(data)

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Navigate to auth page after successful logout
      await goto('/auth')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }
</script>

<div class="min-h-screen bg-gray-100">
  <header class="bg-white shadow">
    <nav class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div class="flex justify-between">
        <a href="/" class="text-xl font-semibold">Home</a>
        <Button 
          variant="destructive" 
          on:click={logout}
        >
          Logout
        </Button>
      </div>
    </nav>
  </header>
  <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    {@render children()}
  </main>
</div>