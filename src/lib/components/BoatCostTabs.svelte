<script>
    import { Card } from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Label } from "$lib/components/ui/label";
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs";
    import { Ship, Anchor, Wrench, DollarSign } from 'lucide-svelte';
    import { boats } from '$lib/stores/boats.js';
    import ImagePaste from './ImagePaste.svelte';

    export let boat;

    const updateBoat = () => {
        boats.update(b => 
            b.map(existing => 
                existing.id === boat.id ? boat : existing
            )
        );
    };

    const handleImageChange = (event) => {
        boat.basicInfo.imageUrl = event.detail;
        updateBoat();
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount || 0);
    };
</script>

<Tabs defaultValue="basic" class="w-full">
    <TabsList class="grid w-full grid-cols-4">
        <TabsTrigger value="basic" class="flex items-center gap-2">
            <Ship class="h-4 w-4" />
            Basic Info
        </TabsTrigger>
        <TabsTrigger value="sail" class="flex items-center gap-2">
            <Anchor class="h-4 w-4" />
            Cost To Sail
        </TabsTrigger>
        <TabsTrigger value="upgrades" class="flex items-center gap-2">
            <Wrench class="h-4 w-4" />
            Upgrades
        </TabsTrigger>
        <TabsTrigger value="acquisition" class="flex items-center gap-2">
            <DollarSign class="h-4 w-4" />
            Acquisition
        </TabsTrigger>
    </TabsList>

    <TabsContent value="basic">
        <div class="p-4 space-y-6">
            <!-- Image Section -->
            <div class="space-y-2">
                <Label>Boat Image</Label>
                <ImagePaste 
                    imageUrl={boat.basicInfo.imageUrl} 
                    on:change={handleImageChange}
                />
            </div>

            <!-- Basic Info Fields -->
            <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                    <Label for="manufacturer">Vessel Name</Label>
                    <Input 
                        id="manufacturer" 
                        bind:value={boat.basicInfo.manufacturer} 
                        on:change={updateBoat}
                    />
                </div>
                <div class="space-y-2">
                    <Label for="price">Price (USD)</Label>
                    <Input 
                        id="price" 
                        type="number" 
                        bind:value={boat.basicInfo.price} 
                        on:change={updateBoat}
                    />
                </div>
                <div class="space-y-2">
                    <Label for="year">Year</Label>
                    <Input 
                        id="year" 
                        bind:value={boat.basicInfo.year} 
                        on:change={updateBoat}
                    />
                </div>
                <div class="space-y-2">
                    <Label for="location">Location</Label>
                    <Input 
                        id="location" 
                        bind:value={boat.basicInfo.location} 
                        on:change={updateBoat}
                    />
                </div>
                <div class="space-y-2 col-span-2">
                    <Label for="hyperlink">Vessel Hyperlink</Label>
                    <Input 
                        id="hyperlink" 
                        type="url" 
                        bind:value={boat.basicInfo.hyperlink} 
                        on:change={updateBoat}
                    />
                </div>
                <div class="space-y-2 col-span-2">
                    <Label for="notes">Notes</Label>
                    <Textarea 
                        id="notes" 
                        bind:value={boat.basicInfo.notes} 
                        on:change={updateBoat}
                    />
                </div>
            </div>
        </div>
    </TabsContent>

    <TabsContent value="sail">
        <div class="grid grid-cols-2 gap-4 p-4">
            {#each Object.entries(boat.costToSail) as [key, value]}
                <div class="space-y-2">
                    <Label for={key}>{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                    <Input
                        id={key}
                        type="number"
                        bind:value={boat.costToSail[key]}
                        on:change={updateBoat}
                    />
                </div>
            {/each}
            <div class="col-span-2 pt-4 border-t">
                <div class="text-lg font-bold">
                    Total: {formatCurrency(Object.values(boat.costToSail).reduce((a, b) => a + (b || 0), 0))}
                </div>
            </div>
        </div>
    </TabsContent>

    <TabsContent value="upgrades">
        <div class="grid grid-cols-2 gap-4 p-4">
            {#each Object.entries(boat.upgrades) as [key, value]}
                <div class="space-y-2">
                    <Label for={key}>{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                    <Input
                        id={key}
                        type="number"
                        bind:value={boat.upgrades[key]}
                        on:change={updateBoat}
                    />
                </div>
            {/each}
            <div class="col-span-2 pt-4 border-t">
                <div class="text-lg font-bold">
                    Total: {formatCurrency(Object.values(boat.upgrades).reduce((a, b) => a + (b || 0), 0))}
                </div>
            </div>
        </div>
    </TabsContent>

    <TabsContent value="acquisition">
        <div class="grid grid-cols-2 gap-4 p-4">
            {#each Object.entries(boat.costOfAquisition) as [key, value]}
                <div class="space-y-2">
                    <Label for={key}>{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                    <Input
                        id={key}
                        type="number"
                        bind:value={boat.costOfAquisition[key]}
                        on:change={updateBoat}
                    />
                </div>
            {/each}
            <div class="col-span-2 pt-4 border-t">
                <div class="text-lg font-bold">
                    Total: {formatCurrency(Object.values(boat.costOfAquisition).reduce((a, b) => a + (b || 0), 0))}
                </div>
            </div>
        </div>
    </TabsContent>
</Tabs>