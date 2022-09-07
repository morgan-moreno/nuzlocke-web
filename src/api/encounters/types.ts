export interface CreateEncounterBody {
	name: string;
	ability?: string;
	nature?: string;
	ivs?: CreateStats;
	moves?: Array<string>;
}

export interface CreateStats {
	hp: number;
	atk: number;
	def: number;
	spa: number;
	spd: number;
	spe: number;
}
