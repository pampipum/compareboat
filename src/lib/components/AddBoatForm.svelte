<script>
    import { createEventDispatcher } from 'svelte';
    import { Card } from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { Label } from "$lib/components/ui/label";
    import { boats, createEmptyBoat } from '$lib/stores/boats.js';
    import { Textarea } from '$lib/components/ui/textarea';

    const dispatch = createEventDispatcher();
    let boat = createEmptyBoat();

    const handleSubmit = () => {
        if (boat.basicInfo.manufacturer) {
            boats.update(b => [...b, boat]);
            dispatch('added');
            boat = createEmptyBoat();
        }
    };
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <Card class="p-6">
        <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
                <Label for="manufacturer">Vessel Manufacturer and Model</Label>
                <Input id="manufacturer" bind:value={boat.basicInfo.manufacturer} required />
            </div>
            <div class="space-y-2">
                <Label for="price">Price (USD)</Label>
                <Input id="price" type="number" bind:value={boat.basicInfo.price} />
            </div>
            <div class="space-y-2">
                <Label for="year">Year</Label>
                <Input id="year" bind:value={boat.basicInfo.year} />
            </div>
            <div class="space-y-2">
                <Label for="location">Location</Label>
                <Input id="location" bind:value={boat.basicInfo.location} />
            </div>
            <div class="space-y-2 col-span-2">
                <Label for="hyperlink">Vessel Hyperlink</Label>
                <Input id="hyperlink" type="url" bind:value={boat.basicInfo.hyperlink} />
            </div>
            <div class="space-y-2 col-span-2">
                <Label for="notes">Vessel Notes</Label>
                <Textarea id="notes" bind:value={boat.basicInfo.notes} />
            </div>
        </div>
    </Card>

    <Button type="submit" class="w-full">Add Boat</Button>
</form>