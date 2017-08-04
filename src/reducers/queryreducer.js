/**
 * Created by arpit on 8/3/2017.
 */
import {
  FETCH_CULIST,
  FULFILLED,
  SELECTED_CU,
  FETCH_METRICS,
  FIRSTQTR,
  SECONDQTR,
  LIST,
  FETCH_OTHERCUBENCHMARK,
  OTHERCU,
  FETCH_ASSETBANDDATA,
  FETCH_STATEDATA,
  SELECTEDASSETBAND,
  SELECTEDSTATE,
  CUFILTERSTATE,
  FETCH_STATEASSETBANDBM,
} from '../actions/types';

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
  otherCUBenchMarkData: [],
  stateBMData: [],
  assetBandBMData: [],
  stateAssetBandBMData: [],
  cuFilterState: '',
  maxAssetBand: 0,
  minAssetBandRange: 'm',
  maxAssetBandRange: 'b',
  toggleOpen: false,
  sideBarData: [
    { Id: 1,
      Metric: 'Overall',
      Caption: 'Overall',
      Heading: 'keyparams',
      AriaExpanded: false,
      HasList: true,
      visibilityClass: '',
      ListItem: [
        { Id: 1, Metric: 'TotalAssets', Caption: 'Total Assets', Heading: 'keyparams', DataFormat: '0.00%', AriaExpanded: false, IsSelected: true, visibilityClass: '' },
      { Id: 2, Metric: 'TotalLiability', Caption: 'Total Liabilities', Heading: 'keyparams', DataFormat: '0.00%', AriaExpanded: false, IsSelected: true, visibilityClass: '' },
        { Id: 3, Metric: 'TotalMembers', Caption: 'Total Members', Heading: 'keyparams', DataFormat: '0.00%', AriaExpanded: false, IsSelected: true, visibilityClass: '' },
      ] },
  ],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${FETCH_CULIST}${FULFILLED}`:
      return {
        ...state, culist: action.payload,
      };
    case 'TOGGLELIST':
      return {
        ...state, toggleOpen: action.payload,
      };
    case `${SELECTED_CU}`:
      return {
        ...state, selectedCU: action.payload,
      };
    case `${SELECTEDSTATE}`:
      return {
        ...state, selectedState: action.payload,
      };
    case `${SELECTEDASSETBAND}`:
      return {
        ...state, selectedAssetBand: action.payload,
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
    case OTHERCU:
      return {
        ...state, OtherSelectedCU: action.payload,
      };
    case CUFILTERSTATE:
      return {
        ...state,
        cuFilterState: action.payload,
        CUFilter: state.culist.filter(item => item.STATE === action.payload),
      };
    case 'MINRANGE':
      return {
        ...state,
        minAssetBandRange: action.payload,
      };
    case 'MAXRANGE':
      return {
        ...state,
        maxAssetBandRange: action.payload,
      };
    case `${FETCH_OTHERCUBENCHMARK}${FULFILLED}`:
      return {
        ...state,
        otherCUBenchMarkData: action.payload.OtherCuData,
      };
    case `${FETCH_STATEDATA}${FULFILLED}`:
      return {
        ...state,
        stateBMData: action.payload.CUData,
      };
    case `${FETCH_ASSETBANDDATA}${FULFILLED}`:
      return {
        ...state,
        assetBandBMData: action.payload.CUData,
      };
    case `${FETCH_STATEASSETBANDBM}${FULFILLED}`:
      return {
        ...state,
        stateAssetBandBMData: action.payload.CUData,
      };
    default:
      return {
        ...state,
      };
  }
}
