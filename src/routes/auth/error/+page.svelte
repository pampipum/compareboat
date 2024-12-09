<script>
  import * as Card from '$lib/components/ui/card'
  import { Button } from '$lib/components/ui/button'
</script>

<div class="container flex h-screen w-screen flex-col items-center justify-center">
  <Card.Root class="w-full max-w-md">
    <Card.Header>
      <Card.Title class="text-2xl font-semibold text-destructive">Authentication Error</Card.Title>
      <Card.Description>
        There was a problem with your authentication request.
      </Card.Description>
    </Card.Header>
    <Card.Content class="flex justify-center">
      <Button variant="default" href="/auth">
        Return to login
      </Button>
    </Card.Content>
  </Card.Root>
</div>