<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { PlusCircle } from 'lucide-svelte';
	import { boats } from '$lib/stores/boats.js';
	import AddBoatForm from '$lib/components/AddBoatForm.svelte';
	import BoatList from '$lib/components/BoatList.svelte';

	let showAddForm = false;
</script>

<div class="mx-auto max-w-7xl space-y-6 p-4">
	<Card>
		<CardHeader>
			<CardTitle class="text-2xl">🚤 Boat Comparison Tool</CardTitle>
			<div class="text-muted-foreground">
				<p class="mb-2">
					Compare different boats and their associated costs to make an informed decision.
				</p>
				<div class="mt-2 space-y-1 text-sm">
					<p>• Start by clicking "Add New Boat" and enter the vessel's basic information</p>
					<p>
						• Use the edit button (✏️) to add detailed costs in three categories: Cost To Sail,
						Upgrades, and Acquisition
					</p>
					<p>• Copy and paste boat images directly from websites using Ctrl+V in the edit mode</p>
					<p>• All changes are automatically saved as you edit</p>
				</div>
			</div>
		</CardHeader>
		<CardContent>
			<div class="mb-6">
				<Button on:click={() => (showAddForm = !showAddForm)}>
					<PlusCircle class="mr-2 h-4 w-4" />
					{showAddForm ? 'Cancel' : 'Add New Boat'}
				</Button>
			</div>

			{#if showAddForm}
				<AddBoatForm on:added={() => (showAddForm = false)} />
			{/if}

			<BoatList />
		</CardContent>
	</Card>
</div>
