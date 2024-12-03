<script>
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
    import { Button } from "$lib/components/ui/button";
    import { Card } from "$lib/components/ui/card";
    import { boats, calculateTotalCost, calculateSectionTotal } from '$lib/stores/boats.js';
    import { Trash2, PencilLine, ChevronDown, ChevronUp, Ship, Sailboat, Anchor } from 'lucide-svelte';
    import BoatCostTabs from './BoatCostTabs.svelte';

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount || 0);
    };

    let expandedBoatId = null;

    const getBoatIcon = (boatName) => {
        const name = boatName.toLowerCase();
        if (name.includes('cruiser')) return Ship;
        if (name.includes('sail')) return Sailboat;
        return Anchor;
    };

    const toggleExpand = (boatId) => {
        expandedBoatId = expandedBoatId === boatId ? null : boatId;
    };
</script>

<div class="space-y-4">
    {#each $boats as boat (boat.id)}
        <Card class="overflow-hidden">
            <div class="p-4">
                <div class="flex items-start justify-between">
                    <div class="flex gap-4 flex-1">
                        {#if boat.basicInfo.imageUrl}
                            <img 
                                src={boat.basicInfo.imageUrl} 
                                alt={boat.basicInfo.manufacturer}
                                class="w-24 h-24 object-cover rounded-lg"
                            />
                        {:else}
                            <div class="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svelte:component this={getBoatIcon(boat.basicInfo.manufacturer)} class="w-12 h-12 text-gray-400" />
                            </div>
                        {/if}
                        
                        <div class="flex-1">
                            <div class="flex items-center gap-2">
                                <h3 class="text-xl font-bold">{boat.basicInfo.manufacturer}</h3>
                                {#if boat.basicInfo.hyperlink}
                                    <a href={boat.basicInfo.hyperlink} target="_blank" class="text-blue-500 hover:underline text-sm">
                                        View Listing
                                    </a>
                                {/if}
                            </div>
                            
                            <div class="grid grid-cols-4 gap-4 mt-2">
                                <div>
                                    <div class="text-sm text-gray-500">Base Price</div>
                                    <div class="font-semibold">{formatCurrency(boat.basicInfo.price)}</div>
                                </div>
                                <div>
                                    <div class="text-sm text-gray-500">Cost To Sail</div>
                                    <div class="font-semibold">{formatCurrency(calculateSectionTotal(boat.costToSail))}</div>
                                </div>
                                <div>
                                    <div class="text-sm text-gray-500">Upgrades</div>
                                    <div class="font-semibold">{formatCurrency(calculateSectionTotal(boat.upgrades))}</div>
                                </div>
                                <div>
                                    <div class="text-sm text-gray-500">Acquisition</div>
                                    <div class="font-semibold">{formatCurrency(calculateSectionTotal(boat.costOfAquisition))}</div>
                                </div>
                            </div>

                            {#if boat.basicInfo.notes}
                                <div class="mt-2 text-sm text-gray-600">{boat.basicInfo.notes}</div>
                            {/if}
                        </div>

                        <div class="text-right">
                            <div class="text-sm text-gray-500">Total Cost</div>
                            <div class="text-xl font-bold">{formatCurrency(calculateTotalCost(boat))}</div>
                        </div>
                    </div>

                    <div class="flex gap-2 ml-4">
                        <Button
                            variant="outline"
                            size="icon"
                            on:click={() => toggleExpand(boat.id)}
                        >
                            <svelte:component this={expandedBoatId === boat.id ? ChevronUp : ChevronDown} class="h-4 w-4" />
                        </Button>
                        <Button
                            variant="destructive"
                            size="icon"
                            on:click={() => boats.update(b => b.filter(b => b.id !== boat.id))}
                        >
                            <Trash2 class="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {#if expandedBoatId === boat.id}
                <div class="border-t">
                    <BoatCostTabs {boat} />
                </div>
            {/if}
        </Card>
    {/each}
</div>