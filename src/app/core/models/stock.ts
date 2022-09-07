export class Stock{
  id!:                            string;
  stock_reel_a_une_date!:         number;
  stock_en_transit!:              number;
  date_prevu_arrivage!:           Date;
  date_de_passation_de_commande!: Date;
  type_transport!:                string;
  Article!:                       any;
  ArticleCode!:                   number;
  VersionName!:                   string;
}
