<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { Button } from "$lib/components/ui/button";
    import { ImageIcon, X } from 'lucide-svelte';

    export let imageUrl: string = '';

    const dispatch = createEventDispatcher();

    const handlePaste = async (e: ClipboardEvent) => {
        const items = e.clipboardData?.items;
        if (!items) return;

        for (let item of Array.from(items)) {
            if (item.type.indexOf('image') === 0) {
                const blob = item.getAsFile();
                if (!blob) continue;

                const reader = new FileReader();
                reader.onload = (e) => {
                    if (typeof e.target?.result === 'string') {
                        imageUrl = e.target.result;
                        dispatch('change', imageUrl);
                    }
                };
                reader.readAsDataURL(blob);
                break;
            }
        }
    };

    const clearImage = (e: MouseEvent) => {
        e.stopPropagation();
        imageUrl = '';
        dispatch('change', '');
    };
</script>

<div 
    class="relative border-2 border-dashed rounded-lg p-4 min-h-[100px] flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
    on:paste={handlePaste}
    on:click={() => document.execCommand('paste')}
    tabindex="0"
>
    {#if imageUrl}
        <div class="relative w-full h-full">
            <img 
                src={imageUrl} 
                alt="Boat" 
                class="max-h-[200px] object-contain mx-auto"
            />
            <Button
                variant="destructive"
                size="icon"
                class="absolute top-0 right-0"
                on:click={clearImage}
            >
                <X class="h-4 w-4" />
            </Button>
        </div>
    {:else}
        <div class="text-center text-gray-500">
            <ImageIcon class="w-8 h-8 mx-auto mb-2" />
            <p>Click here and paste (Ctrl+V) an image</p>
        </div>
    {/if}
</div>