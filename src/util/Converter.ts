import { Encounter } from '../api/models/Encounter';
import { Stat } from '../api/models/Stat';

export class Converter {
	public static convertEncounterStatsToString(
		key: 'ivs' | 'evs',
		stats: Stat
	): string {
		let results = '';
		let DELIMITER = ' / ';

		if (key === 'ivs') {
			results += 'IVs: ';
		} else {
			results += 'EVs: ';
		}

		results += `${stats.hp} Hp`;
		results += DELIMITER;
		results += `${stats.atk} Atk`;
		results += DELIMITER;
		results += `${stats.def} Def`;
		results += DELIMITER;
		results += `${stats.spa} SpA`;
		results += DELIMITER;
		results += `${stats.spd} SpD`;
		results += DELIMITER;
		results += `${stats.spe} Spe\r\n`;

		return results;
	}

	public static convertEncounterToSmogonSet(
		encounter: Encounter
	): string {
		const { name, ability, nature, ivs, evs, moves } = encounter;
		let set = '';

		set += `${name}\r\n`;
		set += `Ability: ${ability}\r\n`;
		set += `Nature: ${nature}\r\n`;
		set += this.convertEncounterStatsToString('ivs', ivs);
		set += this.convertEncounterStatsToString('evs', evs);
		for (let i = 0; i < moves.length; i++) {
			set += `- ${moves[i]}\r\n`;
		}

		return set;
	}

	public static convertManyEncountersToSmogonSet(
		encounters: Array<Encounter>
	): string {
		let sets: Array<string> = [];

		for (let i = 0; i < encounters.length; i++) {
			const encounter = encounters[i];

			sets.push(this.convertEncounterToSmogonSet(encounter));
		}

		return sets.join('\r\n');
	}
}
