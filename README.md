# A Byteball cluster worker that runs dApps

Reads Javascript code from the Byteball DAG and executes them in a sandbox environment then returns the result to the cluster coordinator.

An example Byteball dapp is unit [wJEV6k+WJ5vI0lolUe4CbqrMH8HnuBaaNqMI4E/R1ng=](https://testnetexplorer.byteball.org/#wJEV6k+WJ5vI0lolUe4CbqrMH8HnuBaaNqMI4E/R1ng=)

```javascript
console.log('Answer to the Ultimate Question of Life, the Universe, and Everything'); 40 + 2
```

The value returned to the cluster coordinator is `42`.

See more [pmiklos/byteball-cluster](https://hub.docker.com/r/pmiklos/byteball-cluster/).

DISCLAIMER

The worker is using [VM2](https://github.com/patriksimek/vm2) as a Javascript sandbox to run untrusted code as securely as possible. Please note, however, that an unknown exploit may exist which could possibly break out of the sandbox and elevate access to the running process and execute arbitrary code. Use it with caution in an isolated environment that does not contain sensitive information.
