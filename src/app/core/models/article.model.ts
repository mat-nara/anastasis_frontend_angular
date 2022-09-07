/*
export class Article{
  _id!: string;
	catalogue!: string;
	code!: string;
	labs!: string;
	designation!: string;
	cmm!: string;
	stock_reel_a_une_date!: string;
	stock_en_transit!: string;
	date_prevu_arrivage!: string;
	date_de_passation_de_commande!: string;
	delai_de_transit_de_la_nouvelle_commande!: string;
	pu!: string;
	dev!: string;
	colisage_standard!: string;
	poids!: string;
	dimension!: string
}
*/

export class Article{
	CODE!: 			string;            
	designation!: 		string;
	PU!:              	number;
	DEV!:             	string;
	ColisageStandard!:	string;
	poids!:           	number;
	dimension!: 		string;
	Laboratory!: 		any;
	LaboratoryId!:		number; 
}
