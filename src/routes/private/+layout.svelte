//SvelteKit 5 code
<script>
  let { data } = $props()
  let { supabase } = $derived(data)

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
    }
  }
</script>

<div class="min-h-screen bg-gray-100">
  <header class="bg-white shadow">
    <nav class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div class="flex justify-between">
        <a href="/" class="text-xl font-semibold">Home</a>
        <button
          on:click={logout}
          class="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Logout
        </button>
      </div>
    </nav>
  </header>
  <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <slot />
  </main>
</div>