# Copyright 2024, PorkyProductions, and contributors
# Licensed under the Apache License, Version 2.0
#
# demotivator/__init__.py
# Python port of the demotivator npm package — 1:1 API parity.

import random as _random
from .insults import insults, profane_insults, insult_packs, insult_pack_list

__all__ = [
	'insults',
	'profane_insults',
	'insult_packs',
	'insult_pack_list',
	'create_array',
	'generate_insult',
	'insult_at',
	'DeMotivator',
	'de_motivator',
]

__version__ = '15.0.0'


def create_array(packs):
	"""Return a combined list of insults from the given pack keys.

	Mirrors ``createArray({ packs: [...] })`` from the npm package.

	:param packs: iterable of pack key strings (e.g. ``['original', 'profane']``)
	:returns: list of insult strings
	"""
	selected = []
	seen = set()
	for key in packs:
		if key in seen:
			continue
		seen.add(key)
		pack = insult_packs.get(key)
		if pack is None:
			continue
		selected.extend(pack['insults'])
	return selected


def generate_insult(array=None):
	"""Return a random insult from *array*.

	Mirrors ``generateInsult(array)`` from the npm package.

	:param array: list of insult strings; defaults to the ``original`` pack
	:raises ValueError: if the array is empty
	:returns: a single insult string
	"""
	if array is None:
		array = insults
	if not array:
		raise ValueError('No insults available')
	return _random.choice(array)


def insult_at(position, array=None):
	"""Return the insult at *position* (1-indexed) in *array*.

	Mirrors ``insultAt(position, array)`` from the npm package.

	:param position: 1-based integer position
	:param array: list of insult strings; defaults to the ``original`` pack
	:raises TypeError: if *position* is not an integer
	:raises IndexError: if *position* is out of range
	:returns: a single insult string
	"""
	if array is None:
		array = create_array(['original'])
	if not isinstance(position, int) or isinstance(position, bool):
		raise TypeError('Position must be an integer')
	if position < 1 or position > len(array):
		raise IndexError(f'Position must be between 1 and {len(array)}')
	return array[position - 1]


class DeMotivator:
	"""Class version of the deMotivator object.

	Mirrors the ``DeMotivator`` class from the npm package.
	"""

	def __init__(self):
		self.insults = insults
		self.profane_insults = profane_insults
		self.insult_packs = insult_packs
		self.insult_pack_list = insult_pack_list

	def _create_basic_array(self):
		return create_array(['original'])

	def create_array(self, packs):
		"""See module-level :func:`create_array`."""
		return create_array(packs)

	def generate_insult(self, array=None):
		"""See module-level :func:`generate_insult`."""
		if array is None:
			array = self._create_basic_array()
		return generate_insult(array)

	def insult_at(self, position, array=None):
		"""See module-level :func:`insult_at`."""
		if array is None:
			array = self._create_basic_array()
		return insult_at(position, array)


de_motivator = DeMotivator()
