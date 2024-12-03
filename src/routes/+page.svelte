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
	import { boats } from '$lib/stores/boats';
	import AddBoatForm from '$lib/components/AddBoatForm.svelte';
	import BoatList from '$lib/components/BoatList.svelte';

	let showAddForm = false;
</script>

<div class="mx-auto max-w-7xl space-y-6 p-4">
	<Card>
		<CardHeader>
			<CardTitle>Boat Comparison Tool</CardTitle>
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
