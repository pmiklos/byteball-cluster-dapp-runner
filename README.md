# A Byteball cluster worker that runs dApps

Reads Javascript code from the Byteball DAG and executes them in a sandbox environment then returns the result to the cluster coordinator.

An example Byteball dapp is unit [wJEV6k+WJ5vI0lolUe4CbqrMH8HnuBaaNqMI4E/R1ng=](https://testnetexplorer.byteball.org/#wJEV6k+WJ5vI0lolUe4CbqrMH8HnuBaaNqMI4E/R1ng=)

```javascript
console.log('Answer to the Ultimate Question of Life, the Universe, and Everything'); 40 + 2
```

The value returned to the cluster coordinator is `42`.

See more [pmiklos/byteball-cluster](https://hub.docker.com/r/pmiklos/byteball-cluster/).