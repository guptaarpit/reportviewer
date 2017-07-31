/**
 * Created by arpit on 7/18/2017.
 */
import { FETCH_ASSETS, FETCH_CULIST, CU_ERRORS, FULFILLED, SELECTED_CU, FETCH_METRICS, FIRSTQTR, SECONDQTR, LIST } from '../actions/types';

const INITIAL_STATE = {
  assets: [],
  culist: [],
  liabilities: [],
  keyparams: [],
  camels: [],
  benchmarks: [],
  assetbandstatepercentile: [],
  pearls: [],
  incomeexpenses: [],
  message: '',
  error: '',
  selectedCU: '',
  metrics: [],
  selectedQtr: '',
  firstQtr: '',
  secondQtr: '',
  firstQtrList: [],
  secondQtrList: [],
  StateFilter: [],
  AssetBandFilter: [],
  QuarterFilter: [],
  CUFilter: [],
  OtherSelectedCU: '',
  selectedState: '',
  selectedAssetBand: '',
  scorecardmetrics: [
    { Metric: 'GrowthInAssets', StatePercentileMetric: 'AssetGrowth_statepercentile', AssetBandPercentileMetric: 'AssetGrowth_assetbandpercentile', Caption: 'Assets Growth', Heading: 'keyparams', DataFormat: '0.00%', ExtraChar: '' },
    { Metric: 'GrowthInLoans', StatePercentileMetric: 'LoanGrowth_statepercentile', AssetBandPercentileMetric: 'LoanGrowth_assetbandpercentile', Caption: 'Loans Growth', Heading: 'keyparams', DataFormat: '0.00%', ExtraChar: '' },
    { Metric: 'GrowthInMembers', StatePercentileMetric: 'MemberGrowth_statepercentile', AssetBandPercentileMetric: 'MemberGrowth_assetbandpercentile', Caption: 'Loan per Member Growth', Heading: 'keyparams', DataFormat: '0.00%', ExtraChar: '' },
    { Metric: 'ReturnOnEquity', StatePercentileMetric: 'ROE_statepercentile', AssetBandPercentileMetric: 'ROE_assetbandpercentile', Caption: 'Return On Equities', Heading: 'keyparams', DataFormat: '0.00', ExtraChar: '%' },
    { Metric: 'ReturnOnAssets', StatePercentileMetric: 'ROA_statepercentile', AssetBandPercentileMetric: 'ROA_assetbandpercentile', Caption: 'Return On Assets', Heading: 'camels', DataFormat: '0.00', ExtraChar: '%' },
  ],
  benchMarkMetrics: [
    { Metric: 'Avg_Assets', Caption: 'Assets($)', DataFormat: '0.0a', ExtraChar: '$' },
    { Metric: 'Avg_loans', Caption: 'Loans($)', DataFormat: '0.0a', ExtraChar: '$' },
    { Metric: 'Avg_Shares', Caption: 'Shares & Deposits($)', DataFormat: '0.0a', ExtraChar: '$' },
    { Metric: 'Avg_members', Caption: 'Members($)', DataFormat: '0.0a', ExtraChar: '$' },
    { Caption: 'Growth Rates' },
    { Metric: 'GrowthInAssets', Caption: 'Assets', DataFormat: '0.00%', ExtraChar: '' },
    { Metric: 'GrowthInLoans', Caption: 'Loans', DataFormat: '0.00%', ExtraChar: '' },
    { Metric: 'GrowthInShares', Caption: 'Shares & Deposits($)', DataFormat: '0.00%', ExtraChar: '' },
    { Metric: 'GrowthInMembers', Caption: 'Members', DataFormat: '0.00%', ExtraChar: '' },
    { Caption: 'MEMBER METRICS' },
    { Metric: 'Avg_LoanPerMember', Caption: 'Avg. Loan Amount per member', DataFormat: '0.0a', ExtraChar: '$' },
    { Metric: 'Avg_SharePerMember', Caption: 'Avg. Share Amount per member', DataFormat: '0.0a', ExtraChar: '$' },
    { Metric: 'Avg_Member_Relationship', Caption: 'Avg. Member Relationship', DataFormat: '0.00', ExtraChar: '' },
    { Metric: 'Avg_LoantoShare', Caption: 'Loan To Share Ration', DataFormat: '0.00%', ExtraChar: '' },
    { Caption: 'PENETRATION' },
    { Metric: 'CreditCardPenetration', Caption: 'Unsecured Credit Card Loans', DataFormat: '0.00%', ExtraChar: '' },
    { Metric: 'NewVehicleLoanPenetration', Caption: 'New Vehicle Loans', DataFormat: '0.00%', ExtraChar: '' },
    { Metric: 'UsedVehicleLoanPenetration', Caption: 'Used Vehicle Loans', DataFormat: '0.00%', ExtraChar: '' },
    { Metric: 'FirstMortgageLoanPenetration', Caption: 'First Mortgage Loans', DataFormat: '0.00%', ExtraChar: '' },
    { Metric: 'OtherREPenetration', Caption: 'Other Real State Loans', DataFormat: '0.00%', ExtraChar: '' },
    { Metric: 'ShareDraftPenetration', Caption: 'Share Drafts', DataFormat: '0.00%', ExtraChar: '' },
    { Metric: 'RegularSharesPenetration', Caption: 'Regular Shares', DataFormat: '0.00%', ExtraChar: '' },
    { Metric: 'MoneyMarketSharesPenetration', Caption: 'Money Market Shares', DataFormat: '0.00%', ExtraChar: '' },
    { Metric: 'ShareCertificatePenetration', Caption: 'Share Certificates', DataFormat: '0.00%', ExtraChar: '' },
    { Caption: 'RISK' },
    { Metric: '$DelinquencyRate', Caption: 'Delinquency Rate', DataFormat: '0.00%', ExtraChar: '' },
    { Metric: '$Charge_offRate', Caption: 'Chargeoff Rate', DataFormat: '0.00%', ExtraChar: '' },
  ],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${FETCH_CULIST}${FULFILLED}`:
      return {
        ...state, culist: action.payload,
      };
    case `${CU_ERRORS}${FULFILLED}`:
      return {
        ...state, error: action.payload,
      };
    case `${SELECTED_CU}`:
      return {
        ...state, selectedCU: action.payload,
      };
    case `${FETCH_METRICS}${FULFILLED}`:
      return {
        ...state, metrics: action.payload,
      };
    case `${FIRSTQTR}${LIST}`:
      return {
        ...state, firstQtrList: action.payload,
      };
    case `${SECONDQTR}${LIST}`:
      return {
        ...state, secondQtrList: action.payload,
      };
    case `${FIRSTQTR}`:
      return {
        ...state, firstQtr: action.payload, selectedQtr: action.payload,
      };
    case `${SECONDQTR}`:
      return {
        ...state, secondQtr: action.payload,
      };
    case `${FETCH_ASSETS}${FULFILLED}`:
      return {
        ...state,
        assets: action.payload.Assets,
        liabilities: action.payload.Liabilities,
        keyparams: action.payload.KeyParameters,
        camels: action.payload.Camels,
        assetbandstatepercentile: action.payload.AssetBandStatePercentile,
        pearls: action.payload.Pearls,
        incomeexpenses: action.payload.IncomeExpenses,
        benchmarks: action.payload.BenchMarks,
        selectedQtr: action.payload.QuarterFilter[0],
        StateFilter: action.payload.StateFilter,
        AssetBandFilter: action.payload.AssetBandFilter,
        QuarterFilter: action.payload.QuarterFilter,
        CUFilter: action.payload.CUFilter,
      };
    default:
      return state;
  }
}
