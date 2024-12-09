<script lang="ts">
  import { goto } from '$app/navigation';
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Alert, AlertDescription } from '$lib/components/ui/alert';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';

  let { data } = $props();
  let { supabase } = $derived(data);

  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');
  let isLoading = $state(false);
  let error = $state('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      error = 'Passwords do not match';
      return;
    }

    if (password.length < 6) {
      error = 'Password must be at least 6 characters';
      return;
    }

    try {
      isLoading = true;
      error = '';

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (signUpError) throw signUpError;

      error = 'Please check your email for a confirmation link.';
    } catch (e) {
      error = e.message;
    } finally {
      isLoading = false;
    }
  };

  const handleSignIn = async () => {
    try {
      isLoading = true;
      error = '';

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) throw signInError;

      // After successful sign in, verify the user's authenticity
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      // If we get here, sign in was successful - redirect to private area
      await goto('/private');

    } catch (e) {
      error = e.message;
      isLoading = false;
    }
  };
</script>

<div class="container flex h-screen w-screen flex-col items-center justify-center">
  <Card.Root class="w-full max-w-md">
    <Card.Header class="space-y-1">
      <Card.Title class="text-2xl font-semibold">Welcome</Card.Title>
      <Card.Description>Sign in to your account or create a new one</Card.Description>
    </Card.Header>
    <Card.Content>
      <Tabs defaultValue="signin" class="w-full">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <div class="space-y-4">
            <div class="space-y-2">
              <Label for="signin-email">Email</Label>
              <Input
                id="signin-email"
                type="email"
                placeholder="you@example.com"
                bind:value={email}
              />
            </div>

            <div class="space-y-2">
              <Label for="signin-password">Password</Label>
              <Input 
                id="signin-password" 
                type="password" 
                placeholder="••••••••"
                bind:value={password} 
              />
            </div>

            {#if error}
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            {/if}

            <Button class="w-full" on:click={handleSignIn} disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="signup">
          <div class="space-y-4">
            <div class="space-y-2">
              <Label for="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                bind:value={email}
              />
            </div>

            <div class="space-y-2">
              <Label for="signup-password">Password</Label>
              <Input 
                id="signup-password" 
                type="password" 
                placeholder="••••••••"
                bind:value={password} 
              />
            </div>

            <div class="space-y-2">
              <Label for="confirm-password">Confirm Password</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                placeholder="••••••••"
                bind:value={confirmPassword} 
              />
            </div>

            {#if error}
              <Alert variant={error.includes('check your email') ? 'default' : 'destructive'}>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            {/if}

            <Button class="w-full" on:click={handleSignUp} disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </Card.Content>
  </Card.Root>
</div>