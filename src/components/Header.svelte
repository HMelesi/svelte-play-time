<script>
import { onMount } from "svelte";
import { fetchUsers, fetchUser } from "../utils/api";
import { get } from "svelte/store";
    import { user } from "../store";

    export let name;

    let users = [];

    onMount(async() => {
        user.subscribe(async(user) => {
            const apiUsers = await fetchUsers();
            console.log(user.username)
        users = apiUsers.filter(listUser => listUser.username !== user.username);
        })

    });

    async function handleOnChange(event) {
        const {value} = event.target;
        const apiUser = await fetchUser(value);
        user.set(apiUser);
    }
</script>

<header>
	<h1>{name}</h1>
    <p>you are logged in as {$user.username}</p>
    <label for="user">change user:</label>
    <select
      id="username"
      name="username"
      value={$user.username}
      on:change={handleOnChange}
    >
      <option defaultValue>{$user.username}</option>
      {#each users as user}
      <option key={user.username}>{user.username}</option>
      {/each}
      })}
    </select>
</header>

<style>
    	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>