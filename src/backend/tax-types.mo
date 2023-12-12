import List "mo:base/List";

module TaxTypes {

    public type UKTaxType = {
        #IncomeTax;
        #NationalInsuranceContribution;
        #CorporationTax;
        #VAT;
        #CapitalGainsTax;
        #InheritanceTax;
        #StampDutyTax;
    };
  
    public type USTaxType = {
        #FederalIncomeTax;
        #StateIncomeTax;
        #PayrollTax;
        #CorporateIncomeTax;
        #SalesTax;
        #CapitalGainsTax;
        #EstateTax;
        #PropertyTax;
        #ExciseTax;
    };

    public type GermanyTaxType = {
        #IncomeTax;
        #SolidaritySurcharge;
        #TradeTax;
        #ValueAddedTax;
        #CorporateTax;
        #CapitalGainsTax;
        #InheritanceTax;
        #ChurchTax;
    };

    public type CanadaTaxType = {
        #FederalIncomeTax;
        #ProvincialIncomeTax;
        #CorporateTax;
        #SalesTax;
        #GoodsAndServicesTax;
        #ProvincialSalesTax;
        #CapitalGainsTax;
        #ExciseTax;
    };

    public type JapanTaxType = {
        #IncomeTax;
        #ResidentTax;
        #CorporateTax;
        #ConsumptionTax;
        #InheritanceTax;
        #PropertyTax;
        #LightVehicleTax;
    };

    public type FranceTaxType = {
        #IncomeTax;
        #SocialSecurityContributions;
        #ValueAddedTax;
        #CorporateTax;
        #WealthTax;
        #CapitalGainsTax;
        #InheritanceTax;
        #HousingTax;
    };

    public type AustraliaTaxType = {
        #IncomeTax;
        #MedicareLevy;
        #GoodsAndServicesTax;
        #CorporateTax;
        #CapitalGainsTax;
        #FringeBenefitsTax;
        #PropertyTax;
    };

    public type IndiaTaxType = {
        #IncomeTax;
        #CorporateTax;
        #GoodsAndServicesTax;
        #CapitalGainsTax;
        #SecuritiesTransactionTax;
        #ExciseDuty;
        #CustomsDuty;
    };

    public type ChinaTaxType = {
        #IndividualIncomeTax;
        #CorporateIncomeTax;
        #ValueAddedTax;
        #BusinessTax;
        #ResourceTax;
        #LandValueAddedTax;
        #RealEstateTax;
    };

    public type BrazilTaxType = {
        #IncomeTax;
        #CorporateTax;
        #SalesTax;
        #ValueAddedTax;
        #FinancialOperationsTax;
        #IndustrializedProductTax;
        #ContributionToSocialSecurity;
    };

    public type NetherlandsTaxType = {
        #IncomeTax;
        #ValueAddedTax;
        #CorporateTax;
        #DividendTax;
        #WealthTax;
        #RealEstateTransferTax;
        #RoadTax;
    };

    public type SwedenTaxType = {
        #IncomeTax;
        #ValueAddedTax;
        #CorporateTax;
        #CapitalGainsTax;
        #WealthTax;
        #ExciseDuty;
        #PropertyTax;
    };





};
