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

export interface UpdateEncounterBody extends CreateEncounterBody {
	id: string;
	evs?: CreateStats;
}

export interface KillEncounterBody {
	name: string;
	description: string;
}
