<script lang="ts">
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
    import { Button } from "$lib/components/ui/button";
    import { boats, calculateTotalCost, calculateSectionTotal } from '$lib/stores/boats';
    import { Trash2, PencilLine } from 'lucide-svelte';
    import EditBoatCosts from './EditBoatCosts.svelte';

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    let editingBoatId: number | null = null;
</script>

<div class="space-y-6">
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead class="min-w-[250px]">Vessel</TableHead>
                <TableHead>Price (USD)</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Cost To Sail</TableHead>
                <TableHead>Upgrades</TableHead>
                <TableHead>Acquisition</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead class="w-[100px]">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {#each $boats as boat (boat.id)}
                <TableRow>
                    <TableCell>
                        <div class="flex gap-4">
                            {#if boat.basicInfo.imageUrl}
                                <img 
                                    src={boat.basicInfo.imageUrl} 
                                    alt={boat.basicInfo.manufacturer}
                                    class="w-16 h-16 object-cover rounded-lg"
                                />
                            {/if}
                            <div class="space-y-1">
                                <div class="font-medium">
                                    {boat.basicInfo.manufacturer}
                                    {#if boat.basicInfo.hyperlink}
                                        <a href={boat.basicInfo.hyperlink} target="_blank" class="ml-2 text-blue-500 hover:underline">
                                            Link
                                        </a>
                                    {/if}
                                </div>
                                {#if boat.basicInfo.notes}
                                    <div class="text-sm text-gray-500">
                                        {boat.basicInfo.notes}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>{formatCurrency(boat.basicInfo.price)}</TableCell>
                    <TableCell>{boat.basicInfo.year}</TableCell>
                    <TableCell>{boat.basicInfo.location}</TableCell>
                    <TableCell>{formatCurrency(calculateSectionTotal(boat.costToSail))}</TableCell>
                    <TableCell>{formatCurrency(calculateSectionTotal(boat.upgrades))}</TableCell>
                    <TableCell>{formatCurrency(calculateSectionTotal(boat.costOfAquisition))}</TableCell>
                    <TableCell class="font-bold">{formatCurrency(calculateTotalCost(boat))}</TableCell>
                    <TableCell class="space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            on:click={() => editingBoatId = editingBoatId === boat.id ? null : boat.id}
                        >
                            <PencilLine class="h-4 w-4" />
                        </Button>
                        <Button
                            variant="destructive"
                            size="icon"
                            on:click={() => boats.update(b => b.filter(b => b.id !== boat.id))}
                        >
                            <Trash2 class="h-4 w-4" />
                        </Button>
                    </TableCell>
                </TableRow>
                {#if editingBoatId === boat.id}
                    <TableRow>
                        <TableCell colspan="9">
                            <EditBoatCosts {boat} />
                        </TableCell>
                    </TableRow>
                {/if}
            {/each}
        </TableBody>
    </Table>
</div>