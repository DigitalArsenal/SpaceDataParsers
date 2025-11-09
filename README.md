# SpaceDataParsers

This library provides utilities to convert SATCAT.dat, TLE, and VCM messages from [Space Force Legacy Formats](https://github.com/DigitalArsenal/spacedatastandards.org/tree/main/survey/legacy-messages) into the [SpaceDataStandards](https://spacedatastandards.org/) format, returning plain JavaScript objects (FlatBuffer generation has been removed).

The project now ships as pure ES modules—no build or transpile step is required. Everything under `src/` is published directly to npm, with the package entry point exposed as `src/main.mjs`.

## Usage

### Node / Bundlers

```js
import { parse, LegacyFormat, SerializationFormat } from "spacedataparsers";
```

### Browser (native ESM)

```html
<script type="module">
  import { parse, LegacyFormat } from "spacedataparsers/browser";
  // ...
</script>
```

## Testing

Run the lightweight Node-based harness (uses small inline fixtures) with:

```bash
npm test
```

## License

This project is released under the MIT License.
