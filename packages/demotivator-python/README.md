# (de)Motivator — Python

Python port of the [`demotivator`](https://www.npmjs.com/package/demotivator) npm package with 1:1 API parity.

## Installation

```bash
pip install demotivator
```

## Usage

```python
from demotivator import generate_insult, insult_at, create_array, insult_pack_list, DeMotivator

# Random insult from the default (original) pack
print(generate_insult())

# Random insult from a custom combination of packs
packs = [p['key'] for p in insult_pack_list if not p['explicit']]
print(generate_insult(create_array(packs)))

# Insult at a specific 1-based position
print(insult_at(5))

# Class-based API
dm = DeMotivator()
print(dm.generate_insult())
print(dm.insult_at(3))
```

## API

### Data

| Name | Type | Description |
|---|---|---|
| `insults` | `list[str]` | All non-profane insults |
| `profane_insults` | `list[str]` | All profane insults |
| `insult_packs` | `dict[str, dict]` | Insult packs keyed by pack ID |
| `insult_pack_list` | `list[dict]` | All insult packs as a list |

Each pack dict has the shape:
```python
{
    'key': str,       # pack ID
    'title': str,     # human-readable name
    'explicit': bool, # True if the pack contains profanity
    'insults': list,  # the insult strings
}
```

### Functions

#### `create_array(packs)`
Returns a combined list of insults from the given pack keys.
```python
array = create_array(['original', 'profane'])
```

#### `generate_insult(array=None)`
Returns a random insult from `array` (defaults to the `original` pack).
```python
insult = generate_insult()
insult = generate_insult(create_array(['profane']))
```

#### `insult_at(position, array=None)`
Returns the insult at the given 1-based `position` in `array`
(defaults to the `original` pack).
```python
insult = insult_at(1)       # first insult in original pack
insult = insult_at(3, array) # third insult in a custom array
```
Raises `TypeError` if `position` is not an integer, and `IndexError` if it is
out of range.

### Class

#### `DeMotivator`
Class version with the same methods and properties as above (mirrors the
TypeScript `DeMotivator` class).

```python
dm = DeMotivator()
dm.insults          # list of non-profane insults
dm.profane_insults  # list of profane insults
dm.insult_packs     # dict of packs
dm.insult_pack_list # list of packs
dm.create_array(['original'])
dm.generate_insult()
dm.insult_at(1)
```

A pre-built singleton `de_motivator` is also exported for convenience.

## Keeping insults in sync

The insult data in `demotivator/insults.py` is auto-generated from the npm
package source. After editing insults in
`packages/demotivator/source/insults.ts`, run one of the sync scripts from the
repository root:

```bash
# bash
bash scripts/sync-insults.bash

# POSIX sh
sh scripts/sync-insults.sh

# PowerShell
pwsh scripts/sync-insults.ps1
```

## License

Apache-2.0 — see [LICENSE](../../LICENSE).
