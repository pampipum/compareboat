//SvelteKit 5 code
<script>
  let { data } = $props()
  let { supabase } = $derived(data)

  let email = ''
  let password = ''
  let confirmPassword = ''
  let isLoading = false
  let error = ''

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      error = 'Passwords do not match'
      return
    }

    if (password.length < 6) {
      error = 'Password must be at least 6 characters'
      return
    }

    try {
      isLoading = true
      error = ''
      
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (signUpError) throw signUpError

      // Show success message
      error = 'Please check your email for a confirmation link.'
    } catch (e) {
      error = e.message
    } finally {
      isLoading = false
    }
  }

  const handleSignIn = async () => {
    try {
      isLoading = true
      error = ''
      
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) throw signInError

    } catch (e) {
      error = e.message
    } finally {
      isLoading = false
    }
  }
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
  <div class="w-full max-w-md space-y-8">
    <!-- Header -->
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight">Welcome</h2>
      <p class="mt-2 text-sm text-gray-600">
        Please sign in to your account or create a new one
      </p>
    </div>

    <!-- Form -->
    <div class="mt-8">
      <div class="space-y-6">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div class="mt-1">
            <input
              bind:value={email}
              id="email"
              name="email"
              type="email"
              required
              class="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div class="mt-1">
            <input
              bind:value={password}
              id="password"
              name="password"
              type="password"
              required
              class="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <!-- Confirm Password (shown only for signup) -->
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div class="mt-1">
            <input
              bind:value={confirmPassword}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              class="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <!-- Error Message -->
        {#if error}
          <div class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  {error}
                </h3>
              </div>
            </div>
          </div>
        {/if}

        <!-- Buttons -->
        <div class="space-y-4">
          <button
            type="button"
            on:click={handleSignUp}
            disabled={isLoading}
            class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Sign Up'}
          </button>
          
          <button
            type="button"
            on:click={handleSignIn}
            disabled={isLoading}
            class="flex w-full justify-center rounded-md border border-blue-600 bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>