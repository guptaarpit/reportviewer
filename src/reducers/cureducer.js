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
  assetbandstatepercentile: [],
  pearls: [],
  incomeexpenses: [],
  message: '',
  error: '',
  selectedCU: '',
  metrics: [],
  firstQtr: '',
  secondQtr: '',
  firstQtrList: '',
  secondQtrList: '',
  scorecardmetrics: [
    { Metric: 'GrowthInAssets', StatePercentileMetric: 'AssetGrowth_statepercentile', AssetBandPercentileMetric: 'AssetGrowth_assetbandpercentile', Caption: 'Assets Growth', Heading: 'keyparams', Format: '0.00' },
    { Metric: 'GrowthInLoans', StatePercentileMetric: 'LoanGrowth_statepercentile', AssetBandPercentileMetric: 'LoanGrowth_assetbandpercentile', Caption: 'Loans Growth', Heading: 'keyparams', Format: '0.00' },
    { Metric: 'GrowthInMembers', StatePercentileMetric: 'MemberGrowth_statepercentile', AssetBandPercentileMetric: 'MemberGrowth_assetbandpercentile', Caption: 'Loan per Member Growth', Heading: 'keyparams', Format: '0.00' },
    { Metric: 'ReturnOnEquity', StatePercentileMetric: 'ROE_statepercentile', AssetBandPercentileMetric: 'ROE_assetbandpercentile', Caption: 'Return On Equities', Heading: 'keyparams', Format: '0.00' },
    { Metric: 'ReturnOnAssets', StatePercentileMetric: 'ROA_statepercentile', AssetBandPercentileMetric: 'ROA_assetbandpercentile', Caption: 'Return On Assets', Heading: 'camels', Format: '0.00' },
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
        ...state, firstQtr: action.payload,
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
      };
    default:
      return state;
  }
}
