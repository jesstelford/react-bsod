# react-bsod

`react-bsod` (aka blue screen of death) renders an error in this old-school format:

<img src="http://i.imgur.com/C5YMxXE.png" alt="blue screen of death" width="700" />

This is a drop-in replacement for
[`redbox-react`](https://github.com/commissure/redbox-react)

## Usage

```
npm install --save-dev react-bsod
```

```javascript
import BSOD from 'react-bsod'

const e = new Error('boom')
const bsod = <BSOD error={e} />
```

See the [`redbox-react`
documentation](https://github.com/commissure/redbox-react#usage) for a more
detailed explanation of usage.

_Note: All props are passed through to `redbox-react` except `style`, which is
replaced internally_

## Contributing

This is an _open_ open source project; please send your PRs / issues / comments
via GitHub. If your contributions are of high quality, I will grant you commit
access to the repository.
