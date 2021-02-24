import { TYPE_OF_WORK } from '../Const'

export const TYPE_OF_WORK_LIST = [
  { label: 'Telepítés', value: 'INSTALLATION' },
  { label: 'Javítás', value: 'REPAIR' },
  { label: 'Karbantartás', value: 'MAINTENANCE' },
  { label: 'Egyéb', value: TYPE_OF_WORK.OTHER },
]

export const ASSET_SETTLEMENT_LIST = [
  { label: 'Térítéses', value: 'REPAYMENT' },
  { label: 'Garanciális', value: 'WARRANTY' },
]

export const WORKING_TIME_ACCOUNT_LIST = [
  { label: 'Térítéses', value: 'REPAYMENT' },
  { label: 'Garanciális', value: 'WARRANTY' },
]

export const TYPE_OF_PAYMENT_LIST = [
  { label: 'Készpénz', value: 'CASH' },
  { label: 'Átutalás', value: 'BANKTRANSFER' },
]
