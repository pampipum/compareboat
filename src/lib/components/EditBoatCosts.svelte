<script>
    import { Card, CardHeader, CardTitle, CardContent } from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { boats } from '$lib/stores/boats.js';
    import ImagePaste from './ImagePaste.svelte';
    import { Textarea } from '$lib/components/ui/textarea';

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
            currency: 'USD'
        }).format(amount);
    };
</script>

<div class="space-y-6">
    <!-- Basic Info Section -->
    <Card>
        <CardHeader>
            <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
            <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                    <Label for="manufacturer">Vessel Manufacturer and Model</Label>
                    <Input id="manufacturer" bind:value={boat.basicInfo.manufacturer} on:change={updateBoat} />
                </div>
                <div class="space-y-2">
                    <Label for="price">Price (USD)</Label>
                    <Input id="price" type="number" bind:value={boat.basicInfo.price} on:change={updateBoat} />
                </div>
                <div class="space-y-2">
                    <Label for="year">Year</Label>
                    <Input id="year" bind:value={boat.basicInfo.year} on:change={updateBoat} />
                </div>
                <div class="space-y-2">
                    <Label for="location">Location</Label>
                    <Input id="location" bind:value={boat.basicInfo.location} on:change={updateBoat} />
                </div>
                <div class="space-y-2 col-span-2">
                    <Label for="hyperlink">Vessel Hyperlink</Label>
                    <Input id="hyperlink" type="url" bind:value={boat.basicInfo.hyperlink} on:change={updateBoat} />
                </div>
                <div class="space-y-2 col-span-2">
                    <Label for="notes">Vessel Notes</Label>
                    <Textarea id="notes" bind:value={boat.basicInfo.notes} on:change={updateBoat} />
                </div>
            </div>
        </CardContent>
    </Card>

    <!-- Image Section -->
    <Card>
        <CardHeader>
            <CardTitle>Boat Image</CardTitle>
        </CardHeader>
        <CardContent>
            <ImagePaste 
                imageUrl={boat.basicInfo.imageUrl} 
                on:change={handleImageChange}
            />
        </CardContent>
    </Card>

    <!-- Cost To Sail Section -->
    <Card>
        <CardHeader>
            <CardTitle>Cost To Sail</CardTitle>
        </CardHeader>
        <CardContent>
            <div class="grid grid-cols-2 gap-4">
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
            </div>
        </CardContent>
    </Card>

    <!-- Upgrades Section -->
    <Card>
        <CardHeader>
            <CardTitle>Upgrades</CardTitle>
        </CardHeader>
        <CardContent>
            <div class="grid grid-cols-2 gap-4">
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
            </div>
        </CardContent>
    </Card>

    <!-- Cost of Acquisition Section -->
    <Card>
        <CardHeader>
            <CardTitle>Cost of Acquisition</CardTitle>
        </CardHeader>
        <CardContent>
            <div class="grid grid-cols-2 gap-4">
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
            </div>
        </CardContent>
    </Card>

    <!-- Summary Section -->
    <Card>
        <CardContent class="mt-4">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <Label>Base Price</Label>
                    <div class="text-lg font-bold">{formatCurrency(boat.basicInfo.price || 0)}</div>
                </div>
                <div>
                    <Label>Cost To Sail Total</Label>
                    <div class="text-lg">{formatCurrency(Object.values(boat.costToSail).reduce((a, b) => a + (b || 0), 0))}</div>
                </div>
                <div>
                    <Label>Upgrades Total</Label>
                    <div class="text-lg">{formatCurrency(Object.values(boat.upgrades).reduce((a, b) => a + (b || 0), 0))}</div>
                </div>
                <div>
                    <Label>Acquisition Total</Label>
                    <div class="text-lg">{formatCurrency(Object.values(boat.costOfAquisition).reduce((a, b) => a + (b || 0), 0))}</div>
                </div>
            </div>
        </CardContent>
    </Card>
</div>