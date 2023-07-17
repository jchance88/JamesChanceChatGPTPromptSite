<script lang="ts">
    import { useChat } from "ai/svelte";

    const { messages, handleSubmit, input } = useChat({
        api: "chat"});
</script>
<header>Welcome to my chatbot!</header>

<ul>
    {#each $messages as message}
    <li>{message.role} says ... {message.content}</li>
    {/each}
</ul>

<form on:submit={handleSubmit}>
    <input bind:value={$input}/>
    <button type='submit'>Send</button>
</form>