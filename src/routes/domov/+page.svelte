<script>
	import { currentUser } from '$lib/pocketbase';
</script>

<h1>Domov</h1>

<pre>
  {JSON.stringify($currentUser)}
</pre>
