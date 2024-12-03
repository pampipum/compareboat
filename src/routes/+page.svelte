<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
  import { PlusCircle } from "lucide-svelte";
  import { boats } from '$lib/stores/boats.js';
  import AddBoatForm from "$lib/components/AddBoatForm.svelte";
  import BoatList from "$lib/components/BoatList.svelte";

  let showAddForm = false;
</script>

<div class="max-w-7xl mx-auto p-4 space-y-6">
  <Card>
    <CardHeader>
      <CardTitle class="text-2xl">🚤 Boat Comparison Tool</CardTitle>
      <CardDescription>
        Compare different boats and their associated costs to make an informed decision.
        <ul class="mt-2 space-y-1 list-disc list-inside text-sm">
          <li>Start by clicking "Add New Boat" and enter the vessel's basic information</li>
          <li>Use the edit button (✏️) to add detailed costs in three categories: Cost To Sail, Upgrades, and Acquisition</li>
          <li>Copy and paste boat images directly from websites using Ctrl+V in the edit mode</li>
          <li>All changes are automatically saved as you edit</li>
        </ul>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="mb-6">
        <Button on:click={() => showAddForm = !showAddForm}>
          <PlusCircle class="mr-2 h-4 w-4" />
          {showAddForm ? 'Cancel' : 'Add New Boat'}
        </Button>
      </div>

      {#if showAddForm}
        <AddBoatForm on:added={() => showAddForm = false} />
      {/if}

      <BoatList />
    </CardContent>
  </Card>
</div>
