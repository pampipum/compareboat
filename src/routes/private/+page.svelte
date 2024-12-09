//SvelteKit 5 code
<script>
  let { data } = $props()
  let { user } = $derived(data)
</script>

<div class="rounded-lg bg-white p-6 shadow">
  <h1 class="text-2xl font-bold">Welcome to your private dashboard</h1>
  <p class="mt-4 text-gray-600">You are logged in as: {user?.email}</p>
  
  <div class="mt-8">
    <h2 class="text-xl font-semibold">What's next?</h2>
    <ul class="mt-4 list-disc pl-5 text-gray-600">
      <li>This is your protected private page</li>
      <li>Only authenticated users can access this route</li>
      <li>You can add your private content and features here</li>
    </ul>
  </div>
</div>